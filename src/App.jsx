import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './authContext';
import Login from '.component/Login';
import Callback from '.component/Callback';
import Home from '.component/Home';

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