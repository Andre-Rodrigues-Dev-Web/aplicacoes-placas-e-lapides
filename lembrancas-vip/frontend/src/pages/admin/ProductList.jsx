import React, { useState, useEffect } from 'react';
import { PageHeader, Title } from '../Dashboard.styles';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaTag, FaBoxOpen, FaWarehouse, FaCheckCircle, FaBan, FaTruckLoading } from 'react-icons/fa';
import api from '../../api/axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Form states
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        cost_price: '',
        stock_quantity: '',
        min_stock: '',
        image_url: '',
        badge: '',
        icon_type: 'none',
        status: 'active',
        internal_notes: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await api.get('/admin/products');
            setProducts(res.data);
        } catch (err) {
            console.error("Erro ao buscar produtos", err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                cost_price: product.cost_price,
                stock_quantity: product.stock_quantity,
                min_stock: product.min_stock,
                image_url: product.image_url,
                badge: product.badge,
                icon_type: product.icon_type,
                status: product.status,
                internal_notes: product.internal_notes
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                description: '',
                price: '',
                cost_price: '',
                stock_quantity: '0',
                min_stock: '0',
                image_url: '',
                badge: '',
                icon_type: 'none',
                status: 'active',
                internal_notes: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await api.put(`/admin/products/${editingProduct.id}`, formData);
            } else {
                await api.post('/admin/products', formData);
            }
            fetchProducts();
            handleCloseModal();
        } catch (err) {
            alert("Erro ao salvar produto.");
        }
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Deseja excluir permanentemente o produto ${name}?`)) {
            try {
                await api.delete(`/admin/products/${id}`);
                fetchProducts();
            } catch (err) {
                alert("Erro ao excluir.");
            }
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        try {
            await api.post(`/admin/products/${id}/toggle-status`, { status: newStatus });
            fetchProducts();
        } catch (err) {
            alert("Erro ao alterar status.");
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Lógica de Paginação
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <PageHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Title><FaBoxOpen style={{ color: '#00AEEF', marginRight: '10px' }} /> Gestão de Estoque & Produtos</Title>
                    <p style={{ color: '#718096', marginTop: '5px' }}>Gerencie o catálogo de produtos físicos, preços e níveis de estoque.</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    style={{ padding: '12px 20px', background: '#00AEEF', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(212, 175, 55, 0.2)' }}>
                    <FaPlus /> Novo Produto
                </button>
            </PageHeader>

            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <FaSearch style={{ position: 'absolute', top: '12px', left: '15px', color: '#A0AEC0' }} />
                    <input 
                        type="text" 
                        placeholder="Buscar por nome ou descrição..." 
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Volta para primeira página ao buscar
                        }}
                        style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                    />
                </div>
            </div>

            <div style={{ background: 'white', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', overflowX: 'auto', marginBottom: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #E2E8F0', color: '#4A5568', backgroundColor: '#F7FAFC' }}>
                            <th style={{ padding: '1rem' }}>Produto</th>
                            <th style={{ padding: '1rem' }}>Preço Venda</th>
                            <th style={{ padding: '1rem' }}>Custo</th>
                            <th style={{ padding: '1rem' }}>Estoque</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center' }}>Carregando catálogo...</td></tr>
                        ) : currentProducts.length === 0 ? (
                            <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center' }}>Nenhum produto encontrado.</td></tr>
                        ) : (
                            currentProducts.map(p => (
                                <tr key={p.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '50px', height: '50px', borderRadius: '8px', backgroundImage: `url(${p.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#EDF2F7' }}></div>
                                            <div>
                                                <div style={{ fontWeight: 'bold', color: '#2D3748' }}>{p.name}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#A0AEC0' }}>ID: #{p.id} | Badge: {p.badge || 'N/A'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', fontWeight: 'bold', color: '#2D3748' }}>R$ {p.price}</td>
                                    <td style={{ padding: '1rem', color: '#718096' }}>R$ {p.cost_price || '0.00'}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ 
                                                fontWeight: 'bold', 
                                                color: p.stock_quantity <= p.min_stock ? '#E53E3E' : '#2D3748' 
                                            }}>
                                                {p.stock_quantity}
                                            </span>
                                            {p.stock_quantity <= p.min_stock && <FaTruckLoading color="#E53E3E" title="Estoque Baixo" />}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ 
                                            padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold',
                                            background: p.status === 'active' ? '#C6F6D5' : '#EDF2F7',
                                            color: p.status === 'active' ? '#22543D' : '#4A5568'
                                        }}>
                                            {p.status === 'active' ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', display: 'flex', gap: '8px' }}>
                                        <button onClick={() => handleOpenModal(p)} style={{ padding: '6px', background: '#E2E8F0', border: 'none', borderRadius: '4px', cursor: 'pointer', color: '#4A5568' }} title="Editar">
                                            <FaEdit />
                                        </button>
                                        <button 
                                            onClick={() => handleToggleStatus(p.id, p.status)}
                                            style={{ padding: '6px', background: p.status === 'active' ? '#FED7D7' : '#C6F6D5', border: 'none', borderRadius: '4px', cursor: 'pointer', color: p.status === 'active' ? '#C53030' : '#22543D' }} 
                                            title={p.status === 'active' ? "Desativar" : "Ativar"}>
                                            {p.status === 'active' ? <FaBan /> : <FaCheckCircle />}
                                        </button>
                                        <button onClick={() => handleDelete(p.id, p.name)} style={{ padding: '6px', background: '#FED7D7', border: 'none', borderRadius: '4px', cursor: 'pointer', color: '#C53030' }} title="Excluir">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            style={{
                                padding: '8px 15px',
                                borderRadius: '8px',
                                border: '1px solid #E2E8F0',
                                background: currentPage === page ? '#00AEEF' : 'white',
                                color: currentPage === page ? 'white' : '#4A5568',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                transition: 'all 0.2s'
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
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '20px', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                        <h2 style={{ marginBottom: '1.5rem', color: '#2D3748' }}>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nome do Produto *</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                </div>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Descrição</label>
                                    <textarea 
                                        rows="3"
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', resize: 'vertical' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Preço de Venda (R$) *</label>
                                    <input 
                                        required
                                        type="number" 
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Preço de Custo (R$)</label>
                                    <input 
                                        type="number" 
                                        step="0.01"
                                        value={formData.cost_price}
                                        onChange={(e) => setFormData({...formData, cost_price: e.target.value})}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Estoque Atual</label>
                                    <input 
                                        type="number" 
                                        value={formData.stock_quantity}
                                        onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Estoque Mínimo</label>
                                    <input 
                                        type="number" 
                                        value={formData.min_stock}
                                        onChange={(e) => setFormData({...formData, min_stock: e.target.value})}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                </div>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>URL da Imagem</label>
                                    <input 
                                        type="text" 
                                        value={formData.image_url}
                                        onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                        placeholder="https://exemplo.com/imagem.jpg"
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Badge (Ex: Mais Vendido)</label>
                                    <input 
                                        type="text" 
                                        value={formData.badge}
                                        onChange={(e) => setFormData({...formData, badge: e.target.value})}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Status</label>
                                    <select 
                                        value={formData.status}
                                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                                        <option value="active">Ativo</option>
                                        <option value="inactive">Inativo</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <button type="button" onClick={handleCloseModal} style={{ padding: '12px 25px', background: '#EDF2F7', color: '#4A5568', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>Cancelar</button>
                                <button type="submit" style={{ padding: '12px 25px', background: '#00AEEF', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(212, 175, 55, 0.2)' }}>
                                    {editingProduct ? 'Salvar Alterações' : 'Cadastrar Produto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductList;
