import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../contexts/AuthContext';
import { FaTruck, FaBarcode, FaCheckCircle, FaClock, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import Badge from '../../components/admin/shared/Badge';
import StatCard from '../../components/admin/shared/StatCard';
import { LogisticsGrid, LogisticsCard } from './Logistics.styles';

const Logistics = () => {
    const { user } = useAuth();
    const [memorials, setMemorials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ pending: 0, production: 0, shipped: 0 });

    const fetchMemorials = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const response = await api.get('/admin/memorials');
            setMemorials(response.data);
            
            // Calcular stats
            const pCount = response.data.filter(m => !m.production_status || m.production_status === 'pending').length;
            const prCount = response.data.filter(m => m.production_status === 'printing').length;
            const sCount = response.data.filter(m => m.production_status === 'shipped').length;
            setStats({ pending: pCount, production: prCount, shipped: sCount });
        } catch (err) {
            console.error("Erro ao carregar logística:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMemorials();
    }, []);

    const handleUpdate = async (id, data) => {
        try {
            await api.put(`/admin/memorials/${id}/logistics`, data);
            alert("Logística atualizada!");
            fetchMemorials();
        } catch (err) {
            alert("Erro ao atualizar logística.");
        }
    };

    return (
        <div style={{ paddingBottom: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#2D3748', fontSize: '1.8rem' }}>Gestão de Produção e Expedição</h2>
                <p style={{ color: '#718096' }}>Acompanhe o ciclo de vida físico das placas e gerencie envios.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard 
                    label="Aguardando Produção" 
                    value={stats.pending} 
                    icon={FaClock} 
                    color="#E53E3E" 
                />
                <StatCard 
                    label="Em Produção" 
                    value={stats.production} 
                    icon={FaBarcode} 
                    color="#D4AF37" 
                />
                <StatCard 
                    label="Placas Enviadas" 
                    value={stats.shipped} 
                    icon={FaTruck} 
                    color="#38A169" 
                />
            </div>

            <div style={{ background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <FaSearch style={{ position: 'absolute', top: '12px', left: '15px', color: '#A0AEC0' }} />
                    <input 
                        type="text" 
                        placeholder="Buscar memorial ou cliente..." 
                        style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                    />
                </div>
            </div>

            {loading ? (
                <p>Carregando registros...</p>
            ) : (
                <LogisticsGrid>
                    {memorials.map(m => (
                        <LogisticsItem 
                            key={m.id} 
                            memorial={m} 
                            onUpdate={(data) => handleUpdate(m.id, data)} 
                        />
                    ))}
                </LogisticsGrid>
            )}
        </div>
    );
};

const LogisticsItem = ({ memorial, onUpdate }) => {
    const [status, setStatus] = useState(memorial.production_status || 'pending');
    const [tracking, setTracking] = useState(memorial.tracking_code || '');
    const [isDirty, setIsDirty] = useState(false);

    const handleSave = () => {
        onUpdate({
            production_status: status,
            tracking_code: tracking,
            shipping_date: status === 'shipped' ? new Date().toISOString().split('T')[0] : memorial.shipping_date
        });
        setIsDirty(false);
    };

    return (
        <LogisticsCard>
            <div className="info">
                <h4>{memorial.full_name}</h4>
                <p>Responsável: {memorial.owner_name}</p>
                <div style={{ marginTop: '8px', display: 'flex', gap: '5px' }}>
                    <Badge status={memorial.status} text={memorial.status === 'active' ? 'Ativo' : 'Inativo'} />
                    {memorial.shipping_date && <Badge status="info" text={`Enviado em: ${new Date(memorial.shipping_date).toLocaleDateString()}`} />}
                </div>
            </div>

            <div className="status-select">
                <label style={{ fontSize: '0.75rem', color: '#A0AEC0', display: 'block', marginBottom: '4px' }}>Status de Produção</label>
                <select 
                    value={status} 
                    onChange={(e) => { setStatus(e.target.value); setIsDirty(true); }}
                >
                    <option value="pending">Aguardando Produção</option>
                    <option value="printing">Em Impressão/Resina</option>
                    <option value="shipped">Enviado ao Cliente</option>
                    <option value="delivered">Entregue</option>
                </select>
            </div>

            <div className="tracking-input">
                <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.75rem', color: '#A0AEC0', display: 'block', marginBottom: '4px' }}>Código de Rastreio</label>
                    <input 
                        type="text" 
                        placeholder="Ex: BR123456789"
                        value={tracking}
                        onChange={(e) => { setTracking(e.target.value); setIsDirty(true); }}
                    />
                </div>
            </div>

            <button 
                className="btn-save" 
                disabled={!isDirty}
                onClick={handleSave}
            >
                <FaCheckCircle /> Salvar
            </button>
        </LogisticsCard>
    );
};

export default Logistics;
