from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes to allow requests from your TypeScript frontend

@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify({
        "message": "Hello World",
        "status": "success"
    })

@app.route('/api/ping', methods=['GET'])
def ping():
    return jsonify({
        "message": "Pong!",
        "status": "success"
    })

if __name__ == '__main__':
    # Run the server on your friend's computer's local network
    # so it's accessible from other devices on the same network
    app.run(host='0.0.0.0', port=5000, debug=True)
