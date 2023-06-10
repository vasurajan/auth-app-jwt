import React, { useState, useContext } from 'react';
import { useAuthContext } from '../hooks/AuthContext';
import './Login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { user, login, error } = useAuthContext();

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        login(username, password);
    };

    if (user) {
        return (
            <div>
                <h2>Welcome, {user.username}!</h2>
            </div>
        );
    }

    return (
        <div className="login-form-container">
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="login-input"
                />
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
