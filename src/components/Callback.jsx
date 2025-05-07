import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const exchangeCodeForToken = async () => {
            const code = new URLSearchParams(window.location.search).get('code');

            if (code) {
                try {
                    const response = await axios.post(
                        'http://localhost:9000/oauth2/token',
                        new URLSearchParams({
                            grant_type: 'authorization_code',
                            code: code,
                            redirect_uri: 'http://localhost:3000/auth/callback',
                            client_id: 'ui-cdo',
                            client_secret: 'secret'
                        }),
                        {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }
                    );

                    localStorage.setItem('access_token', response.data.access_token);
                    localStorage.setItem('refresh_token', response.data.refresh_token);
                    navigate('/protected');
                } catch (error) {
                    console.error('Token exchange failed:', error);
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
        };

        exchangeCodeForToken();
    }, [navigate]);

    return <div>Processing authentication...</div>;
};

export default Callback;