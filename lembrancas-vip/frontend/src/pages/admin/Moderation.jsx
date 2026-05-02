import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { FaCheck, FaTimes, FaCommentAlt, FaFire, FaFilter, FaHistory } from 'react-icons/fa';
import Badge from '../../components/admin/shared/Badge';
import StatCard from '../../components/admin/shared/StatCard';
import { useAuth } from '../../contexts/AuthContext';
import { ModerationGrid, ContentCard } from './Moderation.styles';

const Moderation = () => {
    const { user } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ messages: 0, tributes: 0 });

    const fetchPending = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const response = await api.get('/admin/moderation');
            setItems(response.data);
            
            // Calcular stats
            const mCount = response.data.filter(i => i.type === 'message').length;
            const tCount = response.data.filter(i => i.type === 'tribute').length;
            setStats({ messages: mCount, tributes: tCount });
        } catch (err) {
            console.error("Erro ao carregar moderação:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPending();
    }, []);

    const handleAction = async (id, type, action) => {
        try {
            await api.post(`/admin/moderation/${id}/${action}`, { type });
            // Atualiza lista local
            setItems(items.filter(item => !(item.id === id && item.type === type)));
            // Atualiza stats
            setStats(prev => ({
                ...prev,
                [type === 'message' ? 'messages' : 'tributes']: prev[type === 'message' ? 'messages' : 'tributes'] - 1
            }));
        } catch (err) {
            alert("Erro ao processar moderação.");
        }
    };

    return (
        <div style={{ paddingBottom: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#2D3748', fontSize: '1.8rem' }}>Centro de Segurança e Moderação</h2>
                <p style={{ color: '#718096' }}>Gerencie conteúdos públicos enviados por visitantes em toda a plataforma.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard 
                    label="Mensagens Pendentes" 
                    value={stats.messages} 
                    icon={FaCommentAlt} 
                    color="#00AEEF" 
                />
                <StatCard 
                    label="Velas Pendentes" 
                    value={stats.tributes} 
                    icon={FaFire} 
                    color="#ED8936" 
                />
                <StatCard 
                    label="Total em Espera" 
                    value={stats.messages + stats.tributes} 
                    icon={FaHistory} 
                    color="#718096" 
                />
            </div>

            <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <FaFilter color="#A0AEC0" />
                    <select style={{ padding: '8px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                        <option>Todos os tipos</option>
                        <option>Mensagens</option>
                        <option>Velas Virtuais</option>
                    </select>
                </div>
                <Badge status="pending" text={`${items.length} itens aguardando ação`} />
            </div>

            {loading ? (
                <p style={{ marginTop: '2rem', textAlign: 'center' }}>Carregando itens para moderação...</p>
            ) : items.length === 0 ? (
                <div style={{ marginTop: '4rem', textAlign: 'center', color: '#A0AEC0' }}>
                    <FaCheck size={50} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                    <h3>Tudo limpo por aqui!</h3>
                    <p>Não há conteúdos pendentes de moderação no momento.</p>
                </div>
            ) : (
                <ModerationGrid>
                    {items.map(item => (
                        <ContentCard key={`${item.type}-${item.id}`}>
                            <div className="header">
                                <div className="type-icon">
                                    {item.type === 'message' ? <FaCommentAlt /> : <FaFire />}
                                </div>
                                <Badge 
                                    status={item.type === 'message' ? 'active' : 'warning'} 
                                    text={item.type === 'message' ? 'Mensagem' : 'Vela Virtual'} 
                                />
                            </div>

                            <div className="content">
                                <h4>{item.visitor_name}</h4>
                                <p>"{item.content || (item.type === 'tribute' ? 'Acendeu uma vela em silêncio' : '')}"</p>
                                <div className="meta">
                                    Memorial: <strong>{item.memorial_name}</strong><br/>
                                    Enviado em: {new Date(item.created_at).toLocaleString('pt-BR')}
                                </div>
                            </div>

                            <div className="actions">
                                <button className="btn-reject" onClick={() => handleAction(item.id, item.type, 'reject')}>
                                    <FaTimes /> Reprovar
                                </button>
                                <button className="btn-approve" onClick={() => handleAction(item.id, item.type, 'approve')}>
                                    <FaCheck /> Aprovar
                                </button>
                            </div>
                        </ContentCard>
                    ))}
                </ModerationGrid>
            )}
        </div>
    );
};

export default Moderation;
