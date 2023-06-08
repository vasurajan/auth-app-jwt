import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import './Login.css';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { user, login, logout } = useContext(AuthContext);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await login(username, password);
    };

    if (user) {
        return (
            <div className="logout-container">
                <h2>Welcome, {user.username}!</h2>
                <button onClick={logout} className="logout-button">Logout</button>
            </div>
        );
    }

    return (
        <div className="login-form-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="login-input"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="login-input"
                    required
                />
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
