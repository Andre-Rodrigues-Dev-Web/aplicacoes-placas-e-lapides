import React, { useState, useEffect } from 'react';
import { PageHeader, Title } from '../Dashboard.styles';
import { FaChartPie, FaFileDownload, FaArrowUp, FaArrowDown, FaCalendarAlt, FaBox, FaBookOpen, FaUserFriends } from 'react-icons/fa';
import api from '../../api/axios';
import { useAuth } from '../../contexts/AuthContext';
import { 
    LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

import StatCard from '../../components/admin/shared/StatCard';
import ChartContainer from '../../components/admin/shared/ChartContainer';
import Badge from '../../components/admin/shared/Badge';

const Reports = () => {
    const { user } = useAuth();
    const [financialData, setFinancialData] = useState([]);
    const [memorialData, setMemorialData] = useState([]);
    const [inventoryData, setInventoryData] = useState([]);
    const [visitationData, setVisitationData] = useState([]);
    const [loading, setLoading] = useState(true);

    const COLORS = ['#00AEEF', '#2D3748', '#718096', '#A0AEC0', '#CBD5E0'];

    useEffect(() => {
        const fetchReports = async () => {
            if (!user) return;
            try {
                setLoading(true);
                const [fin, mem, inv, vis] = await Promise.all([
                    api.get('/admin/reports/financial'),
                    api.get('/admin/reports/memorials'),
                    api.get('/admin/reports/inventory'),
                    api.get('/admin/reports/visitation')
                ]);
                setFinancialData(fin.data);
                setMemorialData(mem.data);
                setInventoryData(inv.data);
                setVisitationData(vis.data);
            } catch (err) {
                console.error("Erro ao buscar relatórios", err);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    const totalRevenue = financialData.reduce((acc, curr) => acc + parseFloat(curr.total || 0), 0);
    const totalMemorials = memorialData.reduce((acc, curr) => acc + parseInt(curr.count || 0), 0);
    const lowStockCount = inventoryData.filter(p => p.stock_quantity <= p.min_stock).length;

    return (
        <>
            <PageHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Title><FaChartPie style={{ color: '#00AEEF', marginRight: '10px' }} /> Inteligência de Negócio</Title>
                    <p style={{ color: '#718096', marginTop: '5px' }}>Métricas de crescimento, financeiro e saúde do estoque.</p>
                </div>
                <button 
                    onClick={() => window.print()}
                    style={{ padding: '12px 20px', background: '#2D3748', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                    <FaFileDownload /> Exportar Relatório
                </button>
            </PageHeader>

            {/* Top Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard 
                    icon={FaArrowUp} 
                    label="Receita Total (6 meses)" 
                    value={`R$ ${totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                    color="#48BB78"
                    bgColor="rgba(72, 187, 120, 0.1)"
                />
                <StatCard 
                    icon={FaBookOpen} 
                    label="Novos Memoriais" 
                    value={totalMemorials}
                    color="#00AEEF"
                    bgColor="rgba(0, 174, 239, 0.1)"
                />
                <StatCard 
                    icon={FaBox} 
                    label="Produtos Baixo Estoque" 
                    value={lowStockCount}
                    color="#E53E3E"
                    bgColor="rgba(229, 62, 62, 0.1)"
                />
            </div>

            {/* Charts Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <ChartContainer title="Performance Financeira" icon={FaCalendarAlt}>
                    <ResponsiveContainer width="99%" height={300} aspect={2}>
                        <AreaChart data={financialData}>
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00AEEF" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#00AEEF" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDF2F7" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#718096', fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#718096', fontSize: 12}} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                formatter={(value) => [`R$ ${value}`, 'Receita']}
                            />
                            <Area type="monotone" dataKey="total" stroke="#00AEEF" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartContainer>

                <ChartContainer title="Crescimento de Memoriais" icon={FaUserFriends}>
                    <ResponsiveContainer width="99%" height={300} aspect={2}>
                        <BarChart data={memorialData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDF2F7" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#718096', fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#718096', fontSize: 12}} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <Bar dataKey="count" fill="#2D3748" radius={[8, 8, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', marginBottom: '2rem' }}>
                {/* Low Stock Table */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                    <h3 style={{ marginBottom: '1.5rem', color: '#2D3748' }}>Status de Inventário</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #EDF2F7', textAlign: 'left', color: '#718096', fontSize: '0.9rem' }}>
                                <th style={{ padding: '1rem 0.5rem' }}>Produto</th>
                                <th style={{ padding: '1rem 0.5rem' }}>Estoque Atual</th>
                                <th style={{ padding: '1rem 0.5rem' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventoryData.slice(0, 5).map(p => (
                                <tr key={p.id} style={{ borderBottom: '1px solid #F7FAFC' }}>
                                    <td style={{ padding: '1rem 0.5rem', color: '#2D3748', fontWeight: '500' }}>{p.name}</td>
                                    <td style={{ padding: '1rem 0.5rem', color: '#4A5568' }}>{p.stock_quantity} un</td>
                                    <td style={{ padding: '1rem 0.5rem' }}>
                                        <Badge type={p.stock_quantity <= p.min_stock ? 'danger' : 'success'}>
                                            {p.stock_quantity <= p.min_stock ? 'Reposição Urgente' : 'Estável'}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Visitation Pie Chart */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                    <h3 style={{ marginBottom: '1.5rem', color: '#2D3748' }}>Origem dos Acessos</h3>
                    <div style={{ height: '300px', minHeight: '300px', minWidth: '0' }}>
                        <ResponsiveContainer width="99%" height={300} aspect={1}>
                            <PieChart>
                                <Pie
                                    data={visitationData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="count"
                                    nameKey="origin"
                                >
                                    {visitationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reports;
