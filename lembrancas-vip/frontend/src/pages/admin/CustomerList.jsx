import React, { useState, useEffect } from 'react';
import { PageHeader, Title } from '../Dashboard.styles';
import { FaUserPlus, FaSearch, FaEdit, FaTrash, FaBan, FaCheckCircle, FaFilePdf } from 'react-icons/fa';
import api from '../../api/axios';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const res = await api.get('/admin/customers');
            setCustomers(res.data);
        } catch (err) {
            console.error("Erro ao buscar clientes", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Tem certeza que deseja excluir o cliente ${name}? Seus memoriais não serão deletados automaticamente, mas o cliente perderá o acesso.`)) {
            try {
                await api.delete(`/admin/customers/${id}`);
                fetchCustomers();
            } catch (err) {
                alert("Erro ao excluir.");
            }
        }
    };

    const handleBlock = async (id, currentStatus) => {
        const action = currentStatus ? 'block' : 'unblock';
        try {
            await api.post(`/admin/customers/${id}/${action}`);
            fetchCustomers();
        } catch (err) {
            alert("Erro ao alterar status.");
        }
    };

    const filteredCustomers = customers.filter(c => {
        const matchName = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = statusFilter === '' || (statusFilter === 'active' && c.is_active) || (statusFilter === 'blocked' && !c.is_active);
        return matchName && matchStatus;
    });

    return (
        <>
            <PageHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Title>Gestão de Clientes</Title>
                    <p style={{ color: '#718096', marginTop: '5px' }}>Gerencie perfis, pagamentos e acessos dos usuários da plataforma.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={{ padding: '10px 15px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaFilePdf color="#E53E3E" /> Exportar PDF
                    </button>
                    <button style={{ padding: '10px 15px', background: '#00AEEF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                        <FaUserPlus /> Novo Cliente
                    </button>
                </div>
            </PageHeader>

            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <FaSearch style={{ position: 'absolute', top: '12px', left: '15px', color: '#A0AEC0' }} />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou e-mail..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', minWidth: '150px' }}>
                    <option value="">Todos Status</option>
                    <option value="active">Ativos</option>
                    <option value="blocked">Bloqueados</option>
                </select>
            </div>

            <div style={{ background: 'white', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #E2E8F0', color: '#4A5568', backgroundColor: '#F7FAFC' }}>
                            <th style={{ padding: '1rem' }}>Cliente</th>
                            <th style={{ padding: '1rem' }}>Contato</th>
                            <th style={{ padding: '1rem' }}>Memoriais</th>
                            <th style={{ padding: '1rem' }}>Status Fin.</th>
                            <th style={{ padding: '1rem' }}>Acesso</th>
                            <th style={{ padding: '1rem' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center' }}>Carregando clientes...</td></tr>
                        ) : filteredCustomers.length === 0 ? (
                            <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center' }}>Nenhum cliente encontrado.</td></tr>
                        ) : (
                            filteredCustomers.map(c => (
                                <tr key={c.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: 'bold', color: '#2D3748' }}>{c.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#A0AEC0' }}>CPF/CNPJ: {c.cpf_cnpj || 'Não info.'}</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div>{c.email}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#718096' }}>{c.phone || 'Sem fone'}</div>
                                    </td>
                                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>{c.total_memorials}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold',
                                            background: c.payment_status === 'paid' ? '#C6F6D5' : '#FED7D7',
                                            color: c.payment_status === 'paid' ? '#22543D' : '#822727'
                                        }}>
                                            {c.payment_status === 'paid' ? 'Em dia' : 'Pendente'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold',
                                            background: c.is_active ? '#EBF8FF' : '#EDF2F7',
                                            color: c.is_active ? '#2B6CB0' : '#4A5568'
                                        }}>
                                            {c.is_active ? 'Ativo' : 'Bloqueado'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', display: 'flex', gap: '10px' }}>
                                        <button style={{ padding: '6px', background: '#E2E8F0', border: 'none', borderRadius: '4px', cursor: 'pointer', color: '#4A5568' }} title="Editar">
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleBlock(c.id, c.is_active)}
                                            style={{ padding: '6px', background: c.is_active ? '#FED7D7' : '#C6F6D5', border: 'none', borderRadius: '4px', cursor: 'pointer', color: c.is_active ? '#C53030' : '#22543D' }}
                                            title={c.is_active ? "Bloquear Acesso" : "Desbloquear"}>
                                            {c.is_active ? <FaBan /> : <FaCheckCircle />}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(c.id, c.name)}
                                            style={{ padding: '6px', background: '#FED7D7', border: 'none', borderRadius: '4px', cursor: 'pointer', color: '#C53030' }} title="Excluir">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CustomerList;
