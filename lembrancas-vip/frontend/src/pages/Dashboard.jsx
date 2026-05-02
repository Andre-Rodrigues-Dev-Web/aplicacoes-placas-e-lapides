import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useMemorials } from '../contexts/MemorialContext';
import { FaPlus, FaDove, FaEnvelopeOpenText, FaBookOpen, FaStore, FaUsers, FaChartLine, FaQrcode } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ChatModule from '../components/admin/chat/ChatModule';
import api from '../api/axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
    PageHeader,
    Title,
    Greeting,
    CreateButton,
    StatsContainer,
    StatIconWrapper,
    StatInfo,
    StatNumber,
    StatLabel
} from './Dashboard.styles';

import StatCard from '../components/admin/shared/StatCard';
import ChartContainer from '../components/admin/shared/ChartContainer';

const Dashboard = () => {
    const { user } = useAuth();
    const { memorials, loading, loadMemorials } = useMemorials();
    const [adminStats, setAdminStats] = useState({});
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (user?.role === 'user') {
            loadMemorials();
        } else if (user?.role === 'admin') {
            const fetchAdminData = async () => {
                try {
                    const statsRes = await api.get('/admin/dashboard/summary');
                    setAdminStats(statsRes.data);

                    const chartRes = await api.get('/admin/dashboard/customer-signups');
                    setChartData(chartRes.data);
                } catch (error) {
                    console.error("Erro ao buscar dados do master admin:", error);
                }
            };
            fetchAdminData();
        }
    }, [user, loadMemorials]);

    const totalMessages = memorials.reduce((acc, mem) => acc + (mem.messages_count || 0), 0);

    return (
        <>
            <PageHeader>
                <div>
                    <Title>Meu Painel Resumo</Title>
                    <Greeting>Olá, {user?.name}. Bem-vindo de volta ao painel da família.</Greeting>
                </div>
            </PageHeader>

            {!loading && user?.role === 'user' && (
                <StatsContainer>
                    <StatCard
                        icon={FaDove}
                        value={memorials.length}
                        label="Memoriais Gerenciados"
                    />
                    <StatCard
                        icon={FaEnvelopeOpenText}
                        value={totalMessages}
                        label="Mensagens Recebidas"
                    />
                </StatsContainer>
            )}

            {user?.role === 'admin' && (
                <>
                    <StatsContainer>
                        <StatCard
                            icon={FaUsers}
                            value={adminStats.total_customers || 0}
                            label="Clientes Cadastrados"
                        />
                        <StatCard
                            icon={FaBookOpen}
                            value={adminStats.total_memorials || 0}
                            label="Memoriais Ativos"
                        />
                        <StatCard
                            icon={FaChartLine}
                            value={`R$ ${adminStats.monthly_revenue || '0,00'}`}
                            label="Receita do Mês"
                            color="#28a745"
                            bgColor="rgba(40, 167, 69, 0.1)"
                        />
                        <StatCard
                            icon={FaQrcode}
                            value={adminStats.total_qr_access || 0}
                            label="Acessos QR Code"
                        />
                    </StatsContainer>

                    {chartData.length > 0 && (
                        <ChartContainer
                            title="Evolução de Novos Clientes (Últimos Meses)"
                            marginTop="2rem"
                        >
                            <ResponsiveContainer width="99%" height={300} aspect={2}>
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#718096' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#718096' }} dx={-10} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                                    <Line type="monotone" dataKey="count" name="Novos Clientes" stroke="#00AEEF" strokeWidth={3} dot={{ r: 6, fill: '#00AEEF', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    )}
                </>
            )}

            <h3 style={{ color: '#1A365D', marginBottom: '1.5rem', marginTop: '2rem' }}>Acesso Rápido</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {user?.role === 'admin' ? (
                    <>
                        <Link to="/dashboard/customers" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', padding: '2.5rem 2rem', borderRadius: '28px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(226, 232, 240, 0.8)', color: '#2D3748', textDecoration: 'none', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.12)'; e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)'; }}>
                            <div style={{ width: '70px', height: '70px', borderRadius: '22px', background: 'linear-gradient(135deg, #FDFBF7 0%, #F5F0E6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.8), 0 4px 10px rgba(212, 175, 55, 0.1)' }}>
                                <FaUsers size={30} color="#00AEEF" />
                            </div>
                            <h4 style={{ marginBottom: '0.5rem', fontSize: '1.2rem', fontWeight: '700' }}>Gestão de Clientes</h4>
                            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#718096', lineHeight: '1.5' }}>Gerenciar usuários, bloqueios e pagamentos.</p>
                        </Link>

                        <Link to="/dashboard/memorials" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', padding: '2.5rem 2rem', borderRadius: '28px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(226, 232, 240, 0.8)', color: '#2D3748', textDecoration: 'none', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.12)'; e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)'; }}>
                            <div style={{ width: '70px', height: '70px', borderRadius: '22px', background: 'linear-gradient(135deg, #FDFBF7 0%, #F5F0E6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.8), 0 4px 10px rgba(212, 175, 55, 0.1)' }}>
                                <FaBookOpen size={30} color="#00AEEF" />
                            </div>
                            <h4 style={{ marginBottom: '0.5rem', fontSize: '1.2rem', fontWeight: '700' }}>Todos Memoriais</h4>
                            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#718096', lineHeight: '1.5' }}>Gerenciar todos os memoriais da plataforma.</p>
                        </Link>

                        <Link to="/dashboard/messages" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', padding: '2.5rem 2rem', borderRadius: '28px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(226, 232, 240, 0.8)', color: '#2D3748', textDecoration: 'none', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.12)'; e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)'; }}>
                            <div style={{ width: '70px', height: '70px', borderRadius: '22px', background: 'linear-gradient(135deg, #FDFBF7 0%, #F5F0E6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.8), 0 4px 10px rgba(212, 175, 55, 0.1)' }}>
                                <FaEnvelopeOpenText size={30} color="#00AEEF" />
                            </div>
                            <h4 style={{ marginBottom: '0.5rem', fontSize: '1.2rem', fontWeight: '700' }}>Moderar Interações</h4>
                            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#718096', lineHeight: '1.5' }}>Aprovar ou rejeitar mensagens e fotos.</p>
                        </Link>

                        <Link to="/dashboard/shop" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', padding: '2.5rem 2rem', borderRadius: '28px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(226, 232, 240, 0.8)', color: '#2D3748', textDecoration: 'none', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.12)'; e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)'; }}>
                            <div style={{ width: '70px', height: '70px', borderRadius: '22px', background: 'linear-gradient(135deg, #FDFBF7 0%, #F5F0E6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.8), 0 4px 10px rgba(212, 175, 55, 0.1)' }}>
                                <FaStore size={30} color="#00AEEF" />
                            </div>
                            <h4 style={{ marginBottom: '0.5rem', fontSize: '1.2rem', fontWeight: '700' }}>Gerenciar Loja</h4>
                            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#718096', lineHeight: '1.5' }}>Adicionar e editar os produtos físicos e preços.</p>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/memorial/create" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', padding: '2.5rem 2rem', borderRadius: '28px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(226, 232, 240, 0.8)', color: '#2D3748', textDecoration: 'none', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.12)'; e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)'; }}>
                            <div style={{ width: '70px', height: '70px', borderRadius: '22px', background: 'linear-gradient(135deg, #FDFBF7 0%, #F5F0E6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.8), 0 4px 10px rgba(212, 175, 55, 0.1)' }}>
                                <FaPlus size={30} color="#00AEEF" />
                            </div>
                            <h4 style={{ marginBottom: '0.5rem', fontSize: '1.2rem', fontWeight: '700' }}>Criar Memorial</h4>
                            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#718096', lineHeight: '1.5' }}>Gerar um novo QR Code e iniciar uma história.</p>
                        </Link>

                        <Link to="/dashboard/memorials" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', padding: '2.5rem 2rem', borderRadius: '28px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(226, 232, 240, 0.8)', color: '#2D3748', textDecoration: 'none', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.12)'; e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)'; }}>
                            <div style={{ width: '70px', height: '70px', borderRadius: '22px', background: 'linear-gradient(135deg, #FDFBF7 0%, #F5F0E6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.8), 0 4px 10px rgba(212, 175, 55, 0.1)' }}>
                                <FaBookOpen size={30} color="#00AEEF" />
                            </div>
                            <h4 style={{ marginBottom: '0.5rem', fontSize: '1.2rem', fontWeight: '700' }}>Meus Memoriais</h4>
                            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#718096', lineHeight: '1.5' }}>Acessar meu acervo e visualizar QR Codes.</p>
                        </Link>

                        <Link to="/dashboard/shop" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', padding: '2.5rem 2rem', borderRadius: '28px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(226, 232, 240, 0.8)', color: '#2D3748', textDecoration: 'none', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.12)'; e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)'; }}>
                            <div style={{ width: '70px', height: '70px', borderRadius: '22px', background: 'linear-gradient(135deg, #FDFBF7 0%, #F5F0E6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.8), 0 4px 10px rgba(212, 175, 55, 0.1)' }}>
                                <FaStore size={30} color="#00AEEF" />
                            </div>
                            <h4 style={{ marginBottom: '0.5rem', fontSize: '1.2rem', fontWeight: '700' }}>Loja & Serviços</h4>
                            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#718096', lineHeight: '1.5' }}>Adquirir placas, lápides e flores reais.</p>
                        </Link>
                    </>
                )}
            </div>

            {user?.role === 'admin' && <ChatModule />}
        </>
    );
};

export default Dashboard;
