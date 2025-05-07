import React, { useState } from 'react';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username.trim() || !password.trim()) {
            setError('Please enter both username and password');
            return;
        }

        setIsLoading(true);

        // Сначала выполняем запрос к /login для получения сессии и CSRF
        fetch('http://localhost:9000/login', {
            method: 'POST',
            credentials: 'include', // Важно для cookies
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: 'vd', // Замените на реальные данные
                password: '111'
            })
        })
            .then(() => {
                // После успешного входа перенаправляем на авторизацию
                window.location.href = `http://localhost:9000/oauth2/authorize?response_type=code&client_id=ui-cdo&scope=read write&redirect_uri=http://localhost:3000/auth/callback`;
            })
            .catch(error => {
                console.error('Login failed:', error);
            });
    };

    return (
        <div className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '100vh' }}>
            <div className="card shadow-lg rounded-4 border-0" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="card-header bg-primary text-white text-center rounded-top-4">
                    <h3 className="mb-0">
                        <FaSignInAlt className="me-2" /> System Login
                    </h3>
                </div>
                <div className="card-body p-4">
                    {error && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            {error}
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setError('')}
                            ></button>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                <FaUser className="me-2" /> Username
                            </label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaUser />
                                </span>
                                <input
                                    type="text"
                                    id="username"
                                    className="form-control"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">
                                <FaLock className="me-2" /> Password
                            </label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FaLock />
                                </span>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="d-grid mb-3">
                            <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        <FaSignInAlt className="me-2" /> Sign In
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="text-center small text-muted">
                            <p className="mb-1">Don't have an account? <a href="/register">Register</a></p>
                            <p><a href="/forgot-password">Forgot password?</a></p>
                        </div>
                    </form>
                </div>
                <div className="card-footer text-center bg-light rounded-bottom-4">
                    <small className="text-muted">© 2023 Your Company. All rights reserved.</small>
                </div>
            </div>
        </div>
    );
};

export default Login;
