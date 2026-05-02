import React, { useState, useEffect } from 'react';
import { PageHeader, Title } from '../Dashboard.styles';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaTruck, FaIdCard, FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt, FaBan, FaCheckCircle } from 'react-icons/fa';
import api from '../../api/axios';

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSupplier, setEditingSupplier] = useState(null);
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Form states
    const [formData, setFormData] = useState({
        company_name: '',
        trade_name: '',
        cnpj: '',
        email: '',
        phone: '',
        whatsapp: '',
        contact_person: '',
        product_service_type: '',
        address: '',
        city: '',
        state: '',
        status: 'active',
        internal_notes: ''
    });

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            setLoading(true);
            const res = await api.get('/admin/suppliers');
            setSuppliers(res.data);
        } catch (err) {
            console.error("Erro ao buscar fornecedores", err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (supplier = null) => {
        if (supplier) {
            setEditingSupplier(supplier);
            setFormData({
                company_name: supplier.company_name,
                trade_name: supplier.trade_name,
                cnpj: supplier.cnpj,
                email: supplier.email,
                phone: supplier.phone,
                whatsapp: supplier.whatsapp,
                contact_person: supplier.contact_person,
                product_service_type: supplier.product_service_type,
                address: supplier.address,
                city: supplier.city,
                state: supplier.state,
                status: supplier.status,
                internal_notes: supplier.internal_notes
            });
        } else {
            setEditingSupplier(null);
            setFormData({
                company_name: '',
                trade_name: '',
                cnpj: '',
                email: '',
                phone: '',
                whatsapp: '',
                contact_person: '',
                product_service_type: '',
                address: '',
                city: '',
                state: '',
                status: 'active',
                internal_notes: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingSupplier) {
                await api.put(`/admin/suppliers/${editingSupplier.id}`, formData);
            } else {
                await api.post('/admin/suppliers', formData);
            }
            fetchSuppliers();
            setIsModalOpen(false);
        } catch (err) {
            alert("Erro ao salvar fornecedor.");
        }
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Deseja realmente remover o fornecedor ${name}?`)) {
            try {
                await api.delete(`/admin/suppliers/${id}`);
                fetchSuppliers();
            } catch (err) {
                alert("Erro ao remover.");
            }
        }
    };

    const filteredSuppliers = suppliers.filter(s => 
        s.company_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.cnpj.includes(searchTerm) ||
        (s.trade_name && s.trade_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentSuppliers = filteredSuppliers.slice(startIndex, startIndex + itemsPerPage);

    return (
        <>
            <PageHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Title><FaTruck style={{ color: '#00AEEF', marginRight: '10px' }} /> Gestão de Fornecedores</Title>
                    <p style={{ color: '#718096', marginTop: '5px' }}>Gerencie sua rede de fornecedores de placas, flores e serviços funerários.</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    style={{ padding: '12px 20px', background: '#00AEEF', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(212, 175, 55, 0.2)' }}>
                    <FaPlus /> Novo Fornecedor
                </button>
            </PageHeader>

            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <FaSearch style={{ position: 'absolute', top: '12px', left: '15px', color: '#A0AEC0' }} />
                    <input 
                        type="text" 
                        placeholder="Buscar por razão social, nome fantasia ou CNPJ..." 
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
                            <th style={{ padding: '1rem' }}>Fornecedor</th>
                            <th style={{ padding: '1rem' }}>Documento / Contato</th>
                            <th style={{ padding: '1rem' }}>Serviço / Produto</th>
                            <th style={{ padding: '1rem' }}>Localidade</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center' }}>Carregando fornecedores...</td></tr>
                        ) : currentSuppliers.length === 0 ? (
                            <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center' }}>Nenhum fornecedor encontrado.</td></tr>
                        ) : (
                            currentSuppliers.map(s => (
                                <tr key={s.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: 'bold', color: '#2D3748' }}>{s.company_name}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#718096' }}>{s.trade_name || '—'}</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontSize: '0.85rem' }}><FaIdCard style={{ marginRight: '5px' }} /> {s.cnpj}</div>
                                        <div style={{ fontSize: '0.85rem' }}><FaPhoneAlt style={{ marginRight: '5px' }} /> {s.phone || 'N/A'}</div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', background: '#F7FAFC', color: '#4A5568', border: '1px solid #E2E8F0' }}>
                                            {s.product_service_type || 'Geral'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#4A5568' }}>
                                        <FaMapMarkerAlt style={{ marginRight: '5px' }} /> {s.city || '—'} / {s.state || '—'}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ 
                                            padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold',
                                            background: s.status === 'active' ? '#C6F6D5' : '#FED7D7',
                                            color: s.status === 'active' ? '#22543D' : '#C53030'
                                        }}>
                                            {s.status === 'active' ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', display: 'flex', gap: '8px' }}>
                                        <button onClick={() => handleOpenModal(s)} style={{ padding: '6px', background: '#E2E8F0', border: 'none', borderRadius: '4px', cursor: 'pointer' }} title="Editar">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(s.id, s.company_name)} style={{ padding: '6px', background: '#FED7D7', border: 'none', borderRadius: '4px', cursor: 'pointer', color: '#C53030' }} title="Excluir">
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

            {/* Modal de Cadastro/Edição */}
            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2 style={{ marginBottom: '1.5rem', color: '#2D3748' }}>{editingSupplier ? 'Editar Fornecedor' : 'Novo Fornecedor'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Razão Social *</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={formData.company_name}
                                        onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nome Fantasia</label>
                                    <input 
                                        type="text" 
                                        value={formData.trade_name}
                                        onChange={(e) => setFormData({...formData, trade_name: e.target.value})}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>CNPJ *</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={formData.cnpj}
                                        onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>E-mail</label>
                                    <input 
                                        type="email" 
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>WhatsApp</label>
                                    <input 
                                        type="text" 
                                        value={formData.whatsapp}
                                        onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Pessoa de Contato</label>
                                    <input 
                                        type="text" 
                                        value={formData.contact_person}
                                        onChange={(e) => setFormData({...formData, contact_person: e.target.value})}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Tipo de Produto/Serviço</label>
                                    <input 
                                        type="text" 
                                        value={formData.product_service_type}
                                        onChange={(e) => setFormData({...formData, product_service_type: e.target.value})}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                        placeholder="Ex: Placas, Flores, Lápides"
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Cidade</label>
                                    <input 
                                        type="text" 
                                        value={formData.city}
                                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Estado (UF)</label>
                                    <input 
                                        type="text" 
                                        value={formData.state}
                                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                </div>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Observações Internas</label>
                                    <textarea 
                                        rows="3"
                                        value={formData.internal_notes}
                                        onChange={(e) => setFormData({...formData, internal_notes: e.target.value})}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                </div>
                            </div>
                            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '12px 25px', background: '#EDF2F7', color: '#4A5568', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>Cancelar</button>
                                <button type="submit" style={{ padding: '12px 25px', background: '#00AEEF', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>Salvar Fornecedor</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default SupplierList;
