import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/axios';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import {
    Title,
    Subtitle,
    MessagesGrid,
    MessageCard,
    EmptyState
} from './Messages.styles';

const Messages = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!user) return;
            try {
                const response = await api.get(`/messages?user_id=${user.id}`);
                setMessages(response.data);
            } catch (err) {
                console.error("Erro ao buscar mensagens:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [user]);

    const handleUpdateStatus = async (id, status) => {
        try {
            await api.put(`/messages/${id}/status`, { status });
            // Atualiza estado local
            setMessages(messages.map(msg => msg.id === id ? { ...msg, status } : msg));
        } catch (err) {
            console.error("Erro ao atualizar status:", err);
            alert("Erro ao moderar mensagem.");
        }
    };

    return (
        <>
                <Title>Central de Afeto</Title>
                <Subtitle>Modere e gerencie as homenagens deixadas nos memoriais da sua família.</Subtitle>

                {loading ? (
                    <p style={{ color: '#5D6B76' }}>Carregando mensagens...</p>
                ) : messages.length === 0 ? (
                    <EmptyState>
                        <FaEnvelopeOpenText />
                        <h2>Nenhuma mensagem ainda</h2>
                        <p>Quando visitantes deixarem uma homenagem, elas aparecerão aqui para sua moderação.</p>
                    </EmptyState>
                ) : (
                    <MessagesGrid>
                        {messages.map((msg) => (
                            <MessageCard key={msg.id}>
                                <div>
                                    <span className="memorial-badge">Para: {msg.memorial_name}</span>
                                    <h4>
                                        {msg.visitor_name}
                                        <span className={`status-badge ${msg.status}`}>
                                            {msg.status === 'pending' ? 'Pendente' : msg.status === 'approved' ? 'Aprovada' : 'Rejeitada'}
                                        </span>
                                    </h4>
                                    <p>"{msg.message}"</p>
                                </div>
                                
                                <div>
                                    <div className="footer">
                                        <span>{new Date(msg.created_at).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                    
                                    {msg.status === 'pending' && (
                                        <div className="actions">
                                            <button className="btn-approve" onClick={() => handleUpdateStatus(msg.id, 'approved')}>Aprovar</button>
                                            <button className="btn-reject" onClick={() => handleUpdateStatus(msg.id, 'rejected')}>Ocultar</button>
                                        </div>
                                    )}
                                    {msg.status !== 'pending' && (
                                        <div className="actions">
                                            <button style={{background: '#EDF2F7', color: '#4A5568'}} onClick={() => handleUpdateStatus(msg.id, msg.status === 'approved' ? 'rejected' : 'approved')}>
                                                {msg.status === 'approved' ? 'Mover para Rejeitadas' : 'Aprovar Novamente'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </MessageCard>
                        ))}
                    </MessagesGrid>
                )}
        </>
    );
};

export default Messages;
