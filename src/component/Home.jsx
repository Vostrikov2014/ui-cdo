import React from 'react';
import { useAuth } from '../authContext';

const Home = () => {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <div>
            <h1>Welcome</h1>
            {isAuthenticated ? (
                <div>
                    <p>Hello, {user?.name || user?.email || 'User'}!</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <p>Please login to continue</p>
            )}
        </div>
    );
};

export default Home;