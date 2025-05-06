import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './authContext';
import Login from './components/Login';
import Callback from './components/Callback';
import Home from './components/Home';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/auth/callback" element={<Callback />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;