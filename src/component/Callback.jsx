import React, { useEffect } from 'react';
import { useAuth } from './authContext';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
    const { handleCallback } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const processCallback = async () => {
            try {
                await handleCallback();
                navigate('/');
            } catch (error) {
                console.error('Error processing callback:', error);
                navigate('/login');
            }
        };
        processCallback();
    }, [handleCallback, navigate]);

    return <div>Processing login...</div>;
};

export default Callback;