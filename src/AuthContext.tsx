import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    id: string;
    username: string;
    // Add any other user data you need
}

interface AuthContextProps {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: () => Promise.resolve(),
    logout: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (username: string, password: string) => {
        // Simulating login API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const user: User = {
            id: '1',
            username: username,
        };

        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        navigate('/dashboard'); // Redirect to dashboard after login
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/'); // Redirect to login after logout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children} {/* Render the children */}
        </AuthContext.Provider>
    );
};
