import React from 'react';
import { useAuth } from '../authContext';

const Login = () => {
    const { login } = useAuth();

    return (
        <div className="login-container">
            <h2>Login</h2>
            <button onClick={login} className="login-button">
                Login with OAuth2 Server
            </button>

            {/* Basic form fallback */}
            <form className="basic-login-form">
                <h3>Or use basic authentication</h3>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" defaultValue="vd" />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" defaultValue="111" />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;