import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthJS from '@okta/okta-auth-js';

const authClient = new AuthJS({
    issuer: 'http://localhost:9000',
    clientId: 'ui-cdo',
    redirectUri: 'http://localhost:3000/auth/callback',
    scopes: ['openid', 'profile'],
});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
        accessToken: null,
        idToken: null,
    });
    const navigate = useNavigate();

    const login = async () => {
        authClient.token.getWithRedirect({
            responseType: ['code'],
        });
    };

    const logout = async () => {
        await authClient.signOut();
        setAuthState({
            isAuthenticated: false,
            user: null,
            accessToken: null,
            idToken: null,
        });
        navigate('/');
    };

    const handleCallback = async () => {
        const tokens = await authClient.token.parseFromUrl();
        if (tokens.accessToken && tokens.idToken) {
            authClient.tokenManager.setTokens(tokens);
            const user = await authClient.token.getUserInfo(tokens.accessToken);

            setAuthState({
                isAuthenticated: true,
                user,
                accessToken: tokens.accessToken,
                idToken: tokens.idToken,
            });
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = await authClient.tokenManager.get('accessToken');
            if (accessToken) {
                const user = await authClient.token.getUserInfo(accessToken);
                setAuthState({
                    isAuthenticated: true,
                    user,
                    accessToken: accessToken.value,
                    idToken: (await authClient.tokenManager.get('idToken'))?.value,
                });
            }
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ ...authState, login, logout, handleCallback }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);