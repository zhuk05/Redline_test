import './bootstrap';
import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import LoginForm from './components/LoginForm.jsx';
import SearchPage from "./components/SearchPage";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const handleLoginSuccess = (email) => {
        setIsLoggedIn(true);
        setUserEmail(email);
    };

    return (
        <React.StrictMode>
            {isLoggedIn ? (
                <SearchPage email={userEmail}/>
            ) : (
                <LoginForm onLoginSuccess={handleLoginSuccess}/>
            )}
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById('app')).render(<App/>);

