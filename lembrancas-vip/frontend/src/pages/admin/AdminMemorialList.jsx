import React, { useState, useEffect } from 'react';
import { PageHeader, Title } from '../Dashboard.styles';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaBookOpen, FaUser, FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const AdminMemorialList = () => {
    const navigate = useNavigate();
    const [memorials, setMemorials] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Form state
    const [formData, setFormData] = useState({
        user_id: '',
        full_name: '',
        birth_date: '',
        death_date: '',
        city: '',
        state: '',
        cemetery: '',
        generation: 'outros',
        visibility: 'public',
        status: 'active'
    });

    useEffect(() => {
        fetchMemorials();
        fetchCustomers();
    }, []);

    const fetchMemorials = async () => {
        try {
            setLoading(true);
            const res = await api.get('/admin/memorials');
            setMemorials(res.data);
        } catch (err) {
            console.error("Erro ao buscar memoriais", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCustomers = async () => {
        try {
            const res = await api.get('/admin/customers');
            setCustomers(res.data);
        } catch (err) {
            console.error("Erro ao buscar clientes", err);
        }
    };

    const handleOpenModal = () => {
        setFormData({
            user_id: '',
            full_name: '',
            birth_date: '',
            death_date: '',
            city: '',
            state: '',
            cemetery: '',
            generation: 'outros',
            visibility: 'public',
            status: 'active'
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/admin/memorials', formData);
            fetchMemorials();
            setIsModalOpen(false);
        } catch (err) {
            alert(err.response?.data?.message || "Erro ao criar memorial.");
        }
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Deseja realmente desativar o memorial de ${name}?`)) {
            try {
                await api.delete(`/admin/memorials/${id}`);
                fetchMemorials();
            } catch (err) {
                alert("Erro ao excluir.");
            }
        }
    };

    const filteredMemorials = memorials.filter(m =>
        m.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (m.owner_name && m.owner_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredMemorials.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentMemorials = filteredMemorials.slice(startIndex, startIndex + itemsPerPage);

    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        return new Date(dateStr + 'T00:00:00').toLocaleDateString('pt-BR');
    };

    return (
        <>
            <PageHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Title><FaBookOpen style={{ color: '#00AEEF', marginRight: '10px' }} /> Gestão de Memoriais</Title>
                    <p style={{ color: '#718096', marginTop: '5px' }}>Gerencie todos os memoriais da plataforma e crie novos para seus clientes.</p>
                </div>
                <button
                    onClick={handleOpenModal}
                    style={{ padding: '12px 20px', background: '#00AEEF', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(212, 175, 55, 0.2)' }}>
                    <FaPlus /> Novo Memorial
                </button>
            </PageHeader>

            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <FaSearch style={{ position: 'absolute', top: '12px', left: '15px', color: '#A0AEC0' }} />
                    <input
                        type="text"
                        placeholder="Buscar por nome do falecido ou nome do cliente..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                    />
                </div>
            </div>

            <div style={{ background: 'white', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', overflowX: 'auto', marginBottom: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #E2E8F0', color: '#4A5568', backgroundColor: '#F7FAFC' }}>
                            <th style={{ padding: '1rem' }}>Memorial (Falecido)</th>
                            <th style={{ padding: '1rem' }}>Cliente Responsável</th>
                            <th style={{ padding: '1rem' }}>Datas</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center' }}>Carregando memoriais...</td></tr>
                        ) : currentMemorials.length === 0 ? (
                            <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center' }}>Nenhum memorial encontrado.</td></tr>
                        ) : (
                            currentMemorials.map(m => (
                                <tr key={m.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundImage: `url(${m.main_photo ? m.main_photo : 'https://via.placeholder.com/40'})`, backgroundSize: 'cover' }}></div>
                                            <div>
                                                <div style={{ fontWeight: 'bold', color: '#2D3748' }}>{m.full_name}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#A0AEC0' }}>/{m.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ color: '#4A5568', fontWeight: '500' }}>{m.owner_name}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#718096' }}>{m.owner_email}</div>
                                    </td>
                                    <td style={{ padding: '1rem', color: '#4A5568' }}>
                                        {formatDate(m.birth_date)} — {formatDate(m.death_date)}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold',
                                            background: m.status === 'active' ? '#EBF8FF' : '#F7FAFC',
                                            color: m.status === 'active' ? '#2B6CB0' : '#A0AEC0'
                                        }}>
                                            {m.status === 'active' ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', display: 'flex', gap: '8px' }}>
                                        <button onClick={() => navigate(`/memorial/${m.slug}`)} style={{ padding: '6px', background: '#E2E8F0', border: 'none', borderRadius: '4px', cursor: 'pointer' }} title="Visualizar">
                                            <FaEye />
                                        </button>
                                        <button onClick={() => navigate(`/memorial/${m.slug}/edit`)} style={{ padding: '6px', background: '#E2E8F0', border: 'none', borderRadius: '4px', cursor: 'pointer' }} title="Editar">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(m.id, m.full_name)} style={{ padding: '6px', background: '#FED7D7', border: 'none', borderRadius: '4px', cursor: 'pointer', color: '#C53030' }} title="Excluir">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            style={{
                                padding: '8px 15px',
                                borderRadius: '8px',
                                border: '1px solid #E2E8F0',
                                background: currentPage === page ? '#00AEEF' : 'white',
                                color: currentPage === page ? 'white' : '#4A5568',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}

            {/* Modal de Criação */}
            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2 style={{ marginBottom: '1.5rem', color: '#2D3748' }}>Novo Memorial para Cliente</h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Cliente Responsável *</label>
                                    <select
                                        required
                                        value={formData.user_id}
                                        onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    >
                                        <option value="">Selecione um cliente...</option>
                                        {customers.map(c => (
                                            <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
                                        ))}
                                    </select>
                                </div>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nome Completo do Falecido *</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.full_name}
                                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Data de Nascimento</label>
                                    <input
                                        type="date"
                                        value={formData.birth_date}
                                        onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Data de Falecimento</label>
                                    <input
                                        type="date"
                                        value={formData.death_date}
                                        onChange={(e) => setFormData({ ...formData, death_date: e.target.value })}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Cidade</label>
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Estado</label>
                                    <input
                                        type="text"
                                        value={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                </div>
                            </div>
                            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '12px 25px', background: '#EDF2F7', color: '#4A5568', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>Cancelar</button>
                                <button type="submit" style={{ padding: '12px 25px', background: '#00AEEF', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>Criar Memorial</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminMemorialList;
