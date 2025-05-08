import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
            getToken(code);
        }
    }, []);

    const getToken = async (code) => {
        try {
            const response = await fetch('http://localhost:9000/oauth2/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa('client:secret')
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: 'http://localhost:3000'
                })
            });

           if (!response.ok) {
                console.error('Token request failed');
                navigate('/');
                return; // Прерываем выполнение
            }

            const data = await response.json();
            setToken(data.access_token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error getting token:', error);
            navigate('/');
        }
    };

    const login = () => {
        window.location.href = `http://localhost:9000/oauth2/authorize?response_type=code&client_id=client&redirect_uri=http://localhost:3000&scope=openid`;
    };

    const logout = () => {
        setToken(null);
        setUserInfo(null);
        window.location.href = `http://localhost:9000/logout?post_logout_redirect_uri=http://localhost:3000`;
    };

    return (
        <AuthContext.Provider value={{ token, userInfo, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}