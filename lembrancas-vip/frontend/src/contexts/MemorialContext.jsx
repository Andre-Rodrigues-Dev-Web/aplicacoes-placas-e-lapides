import React, { createContext, useState, useContext, useCallback } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const MemorialContext = createContext({});

export const MemorialProvider = ({ children }) => {
    const { signed } = useAuth();
    const [memorials, setMemorials] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadMemorials = useCallback(async () => {
        if (!signed) return;
        setLoading(true);
        try {
            const response = await api.get('/memorials');
            setMemorials(response.data);
        } catch (error) {
            console.error('Erro ao carregar memoriais:', error);
        } finally {
            setLoading(false);
        }
    }, [signed]);

    const addMemorial = useCallback(async (memorialData) => {
        try {
            const response = await api.post('/memorials', memorialData);
            if (response.status === 201) {
                await loadMemorials(); // recarrega a lista
                return { success: true };
            }
        } catch (error) {
            console.error('Erro ao criar memorial:', error);
            return { success: false, message: error.response?.data?.message || 'Erro ao criar' };
        }
    }, [loadMemorials]);

    return (
        <MemorialContext.Provider value={{ memorials, loading, loadMemorials, addMemorial }}>
            {children}
        </MemorialContext.Provider>
    );
};

export const useMemorials = () => {
    return useContext(MemorialContext);
};
