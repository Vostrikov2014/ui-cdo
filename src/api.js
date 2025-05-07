// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9000' // Сервер на порту 9000
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Добавляем интерцептор для обновления токена
api.interceptors.response.use(response => response, async error => {
    if (error.response.status === 401 && !error.config._retry) {
        error.config._retry = true;

        try {
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await axios.post(
                'http://localhost:9000/oauth2/token',
                new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken,
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

            error.config.headers.Authorization = `Bearer ${response.data.access_token}`;
            return api(error.config);
        } catch (err) {
            window.location.href = '/login';
            return Promise.reject(err);
        }
    }

    return Promise.reject(error);
});

export default api;