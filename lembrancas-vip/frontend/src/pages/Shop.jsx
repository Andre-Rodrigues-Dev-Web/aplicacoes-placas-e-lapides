import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStore, FaWhatsapp, FaEye, FaSearch, FaFilter } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import ProductList from './admin/ProductList';
import { getImageUrl } from '../services/productService';
import { useProducts } from '../hooks/useProducts';
import { formatCurrency } from '../utils/format';
import {
    ShopContainer,
    ShopHeader,
    ShopContent,
    Sidebar,
    MainContent,
    FilterGroup,
    FilterList,
    FilterItem,
    PriceRange,
    SortSelect,
    ProductGrid,
    ProductCard,
    ProductImageWrapper,
    ProductBadge,
    ProductInfo,
    CategoryTag,
    ProductName,
    ProductPrice,
    ActionButtons,
    DetailsButton,
    WhatsAppButton,
    LoadingSpinner,
    EmptyState
} from './Shop.styles';

const Shop = () => {
    const { user } = useAuth();
    const { 
        products, 
        loading 
    } = useProducts();
    
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
    const [sortBy, setSortBy] = useState('featured');
    const whatsappNumber = "5511999999999"; 

    // Lógica de filtragem múltipla
    const filteredProducts = products.filter(product => {
        const categoryMatch = activeCategory === 'Todos' || 
                            product.badge === activeCategory || 
                            product.category_name === activeCategory;
        
        const price = parseFloat(product.price);
        const priceMatch = price >= priceRange.min && price <= priceRange.max;
        
        return categoryMatch && priceMatch;
    });

    // Lógica de ordenação
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price-low') return parseFloat(a.price) - parseFloat(b.price);
        if (sortBy === 'price-high') return parseFloat(b.price) - parseFloat(a.price);
        return 0; // featured/default
    });

    const handleWhatsApp = (productName) => {
        const text = `Olá, gostaria de saber mais ou solicitar o produto/serviço: *${productName}*.`;
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    };

    if (user?.role === 'admin') {
        return <ProductList />;
    }

    const categories = ['Todos', 'Placas', 'Porcelanas', 'Bronze', 'Promoção'];

    return (
        <ShopContainer>
            <ShopHeader>
                <h1>Homenagens Eternas: Catálogo de Placas e Porcelanas</h1>
                <p>Encontre a placa perfeita, fotos em porcelana de alta durabilidade e memoriais digitais. Qualidade premium para honrar quem você ama com dignidade.</p>
            </ShopHeader>

            <ShopContent>
                <Sidebar>
                    <FilterGroup>
                        <h4><FaFilter size={14} /> Categorias</h4>
                        <FilterList>
                            {categories.map(cat => (
                                <FilterItem 
                                    key={cat} 
                                    className={activeCategory === cat ? 'active' : ''}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    <input 
                                        type="radio" 
                                        name="category" 
                                        checked={activeCategory === cat} 
                                        onChange={() => {}} 
                                    />
                                    {cat}
                                </FilterItem>
                            ))}
                        </FilterList>
                    </FilterGroup>

                    <FilterGroup>
                        <h4><FaSearch size={14} /> Faixa de Preço</h4>
                        <PriceRange>
                            <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                                Filtrar até: <strong>{formatCurrency(priceRange.max)}</strong>
                            </p>
                            <input 
                                type="range" 
                                min="0" 
                                max="2000" 
                                step="50"
                                value={priceRange.max}
                                onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                                style={{ width: '100%', marginTop: '10px', accentColor: '#086fae' }}
                            />
                            <div className="range-inputs">
                                <input 
                                    type="number" 
                                    placeholder="Mín" 
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value) || 0})}
                                />
                                <span style={{ color: '#CBD5E1' }}>-</span>
                                <input 
                                    type="number" 
                                    placeholder="Máx" 
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value) || 0})}
                                />
                            </div>
                        </PriceRange>
                    </FilterGroup>

                    <FilterGroup>
                        <h4><FaStore size={14} /> Ordenar por</h4>
                        <SortSelect 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="featured">Destaques</option>
                            <option value="price-low">Menor Preço</option>
                            <option value="price-high">Maior Preço</option>
                        </SortSelect>
                    </FilterGroup>
                </Sidebar>

                <MainContent>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                            <LoadingSpinner />
                            <p style={{ color: '#64748B' }}>Carregando catálogo premium...</p>
                        </div>
                    ) : sortedProducts.length > 0 ? (
                        <ProductGrid>
                            {sortedProducts.map(product => (
                                <ProductCard key={product.id}>
                                    <ProductImageWrapper>
                                        {product.badge && <ProductBadge>{product.badge}</ProductBadge>}
                                        <img src={getImageUrl(product.image_url)} alt={product.name} />
                                    </ProductImageWrapper>
                                    
                                    <ProductInfo>
                                        <CategoryTag>{product.badge || 'Homenagem'}</CategoryTag>
                                        <ProductName>{product.name}</ProductName>
                                        
                                        <ProductPrice>
                                            <span className="label">A partir de</span>
                                            <span className="price">{formatCurrency(product.price)}</span>
                                        </ProductPrice>

                                        <ActionButtons>
                                            <DetailsButton as={Link} to={`/loja/item/${product.slug}`}>
                                                <FaEye /> Detalhes
                                            </DetailsButton>
                                            <WhatsAppButton onClick={() => handleWhatsApp(product.name)}>
                                                <FaWhatsapp /> Comprar
                                            </WhatsAppButton>
                                        </ActionButtons>
                                    </ProductInfo>
                                </ProductCard>
                            ))}
                        </ProductGrid>
                    ) : (
                        <EmptyState>
                            <FaStore size={60} />
                            <h3>Nenhum produto encontrado</h3>
                            <p>Tente ajustar seus filtros para encontrar o que procura.</p>
                            <button 
                                onClick={() => {
                                    setActiveCategory('Todos');
                                    setPriceRange({ min: 0, max: 2000 });
                                }}
                                style={{ 
                                    marginTop: '1.5rem',
                                    color: '#086fae',
                                    background: 'none',
                                    border: 'none',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }}
                            >
                                Limpar todos os filtros
                            </button>
                        </EmptyState>
                    )}
                </MainContent>
            </ShopContent>

        </ShopContainer>
    );
};

export default Shop;
