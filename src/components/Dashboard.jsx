import {useAuth} from '../AuthContext';

export default function Dashboard() {
    const {token, logout} = useAuth();

    return (
        <div className="container">
            <h1>Личный кабинет</h1>
            <p>Токен доступа: {token ? 'получен' : 'отсутствует'}</p>
            <button onClick={logout} className="logout-button">
                Выйти
            </button>
        </div>
    );
}