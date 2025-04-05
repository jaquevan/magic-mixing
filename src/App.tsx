import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';



function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}

function WrappedApp() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

export default WrappedApp;