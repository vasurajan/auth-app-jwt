import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    username: string;
}

interface AuthContextProps {
    user: User | null;
    error: string | null;
    login: (username: string, password: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    error: "",
    login: () => { },
    logout: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const login = (username: string, password: string) => {
        // Perform authentication logic here
        const validUsername = 'admin';
        const validPassword = '12345';

        if (username === validUsername && password === validPassword) {
            const user = { username };
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            setError('');
            navigate('/dashboard');
        } else {
            setError('Invalid credentials');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/');
    };

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
