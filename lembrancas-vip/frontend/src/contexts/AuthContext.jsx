import React, { createContext, useState, useContext, useLayoutEffect, useCallback } from 'react';
import api from '../api/axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('@LembrancasVIP:user');
        if (storedUser) return JSON.parse(storedUser);
        return null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem('@LembrancasVIP:token');
    });

    const logout = useCallback(() => {
        localStorage.removeItem('@LembrancasVIP:user');
        localStorage.removeItem('@LembrancasVIP:token');
        setUser(null);
        setToken(null);
    }, []);

    useLayoutEffect(() => {
        const interceptor = api.interceptors.response.use(
            response => response,
            error => {
                const isAuthRoute = error.config?.url?.includes('/auth/');
                if (!isAuthRoute && error.response?.status === 401) {
                    logout();
                }
                return Promise.reject(error);
            }
        );

        return () => api.interceptors.response.eject(interceptor);
    }, [logout]);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { user, token } = response.data;
            
            localStorage.setItem('@LembrancasVIP:user', JSON.stringify(user));
            localStorage.setItem('@LembrancasVIP:token', token);
            
            setUser(user);
            setToken(token);
            return true;
        } catch (error) {
            console.error('Login error', error);
            return false;
        }
    };


    const updateUser = (updatedUser) => {
        const newUser = { ...user, ...updatedUser };
        localStorage.setItem('@LembrancasVIP:user', JSON.stringify(newUser));
        setUser(newUser);
    };

    return (
        <AuthContext.Provider value={{ signed: !!user, user, token, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
