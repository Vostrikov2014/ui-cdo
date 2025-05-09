import {Routes, Route} from 'react-router-dom';
import {AuthProvider} from './components/AuthContext.jsx';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import './styles.css';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </AuthProvider>
    );
}

export default App;