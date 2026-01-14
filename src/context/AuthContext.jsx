import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check localStorage on mount
        const storedUser = localStorage.getItem('nebula_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock login - in a real app, this would hit an API
        // For now, accept any email/password if not empty
        return new Promise((resolve, reject) => {
            if (!email || !password) {
                reject('Email and password are required');
                return;
            }

            // Simulate API delay
            setTimeout(() => {
                const mockUser = {
                    id: '1',
                    name: 'Admin User',
                    email: email,
                    role: 'admin',
                    avatar: 'user'
                };

                localStorage.setItem('nebula_user', JSON.stringify(mockUser));
                setUser(mockUser);
                setIsAuthenticated(true);
                resolve(mockUser);
            }, 800);
        });
    };

    const logout = () => {
        localStorage.removeItem('nebula_user');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
