import React, { useState } from 'react';
import axios from 'axios';
import SearchPage from "./SearchPage";
import '../../css/LoginForm.css'

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { email, password });
            setMessage('Logged in successfully');
            console.log(response.data);
            localStorage.setItem('token', response.data.access_token);
            setIsLoggedIn(true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
        } catch (error) {
            setMessage('An error occurred');
            console.error(error);
        }
    };
    if (isLoggedIn) {
        return <SearchPage email={email} />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Авторизация</h1>
            <input
                className="input_wrap"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                className="input_wrap"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button className="log_in"
                    type="submit">Войти / Зарегистрироваться</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default LoginForm;
