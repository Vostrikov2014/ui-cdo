import { useAuth } from '../AuthContext';

export default function Home() {
    const { login } = useAuth();

    return (
        <div className="container">
            <h1>Добро пожаловать!</h1>
            <p>Это демонстрационное приложение для OAuth2 авторизации</p>
            <button onClick={login} className="login-button">
                Войти через OAuth2 Server
            </button>
        </div>
    );
}