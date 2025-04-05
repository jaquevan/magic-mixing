from bottle import route, run, request, response, static_file
import os
import uuid
import zipfile
import shutil
import subprocess
import json

# Configure paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
OUTPUT_FOLDER = os.path.join(BASE_DIR, 'output')

# Create directories if they don't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# Define allowed file extensions
ALLOWED_EXTENSIONS = {'mp3', 'wav'}

def allowed_file(filename):
    """Check if the file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@route('/api/hello', method='GET')
def hello_world():
    """Simple hello world endpoint for testing connection"""
    response.content_type = 'application/json'
    return json.dumps({
        "message": "Hello World",
        "status": "success"
    })

@route('/api/separate', method='POST')
def separate_audio():
    """Endpoint to handle audio separation using Spleeter"""
    # Enable CORS
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    
    # Check if file is part of the request
    if 'file' not in request.files:
        response.status = 400
        return json.dumps({
            "message": "No file provided",
            "status": "error"
        })
    
    file = request.files.get('file')
    
    # Check if a file was selected
    if not file.filename:
        response.status = 400
        return json.dumps({
            "message": "No file selected",
            "status": "error"
        })
    
    # Check if the file is allowed
    if not allowed_file(file.filename):
        response.status = 400
        return json.dumps({
            "message": f"File type not allowed. Please upload an MP3 or WAV file.",
            "status": "error"
        })
    
    # Generate a unique identifier for this job
    job_id = str(uuid.uuid4())
    
    # Get stem type (2stems, 4stems, 5stems)
    stem_type = request.forms.get('stem_type', 'spleeter:2stems')
    if stem_type not in ['spleeter:2stems', 'spleeter:4stems', 'spleeter:5stems']:
        stem_type = 'spleeter:2stems'  # Default to 2stems if invalid
    
    # Create job directory
    job_upload_dir = os.path.join(UPLOAD_FOLDER, job_id)
    job_output_dir = os.path.join(OUTPUT_FOLDER, job_id)
    os.makedirs(job_upload_dir, exist_ok=True)
    os.makedirs(job_output_dir, exist_ok=True)
    
    # Save the uploaded file
    safe_filename = os.path.basename(file.filename)
    file_path = os.path.join(job_upload_dir, safe_filename)
    
    try:
        file.save(file_path)
        
        # Run Spleeter command
        cmd = f"spleeter separate -p {stem_type} -o {job_output_dir} {file_path}"
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        
        if result.returncode != 0:
            response.status = 500
            return json.dumps({
                "message": f"Spleeter processing failed: {result.stderr}",
                "status": "error"
            })
        
        # Create a zip file of all stems
        base_filename = os.path.splitext(safe_filename)[0]
        stems_dir = os.path.join(job_output_dir, base_filename)
        zip_filename = os.path.join(job_output_dir, f"{base_filename}_stems.zip")
        
        with zipfile.ZipFile(zip_filename, 'w') as zipf:
            for root, dirs, files in os.walk(stems_dir):
                for file in files:
                    file_path = os.path.join(root, file)
                    # Add file to zip with relative path
                    arcname = os.path.relpath(file_path, stems_dir)
                    zipf.write(file_path, arcname)
        
        # Return the zip file
        return static_file(f"{base_filename}_stems.zip", root=job_output_dir, download=True)
        
    except Exception as e:
        response.status = 500
        return json.dumps({
            "message": f"Error processing audio: {str(e)}",
            "status": "error"
        })

@route('/api/cleanup/<job_id>', method='DELETE')
def cleanup(job_id):
    """Clean up uploaded files and output files for a specific job"""
    # Enable CORS
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'DELETE, OPTIONS'
    
    try:
        job_upload_dir = os.path.join(UPLOAD_FOLDER, job_id)
        job_output_dir = os.path.join(OUTPUT_FOLDER, job_id)
        
        if os.path.exists(job_upload_dir):
            shutil.rmtree(job_upload_dir)
        
        if os.path.exists(job_output_dir):
            shutil.rmtree(job_output_dir)
            
        return json.dumps({
            "message": f"Successfully cleaned up job {job_id}",
            "status": "success"
        })
    except Exception as e:
        response.status = 500
        return json.dumps({
            "message": f"Error cleaning up job {job_id}: {str(e)}",
            "status": "error"
        })

@route('/api/options', method='OPTIONS')
def options_handler():
    """Handle CORS preflight requests"""
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With'
    return ''

if __name__ == '__main__':
    print(f"Starting Spleeter API server at http://0.0.0.0:8080")
    print(f"Test the connection at http://localhost:8080/api/hello")
    run(host='0.0.0.0', port=8080, debug=True)
