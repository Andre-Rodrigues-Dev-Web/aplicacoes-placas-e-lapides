import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
    FaWhatsapp, FaStar, FaCheckCircle, FaShieldAlt, 
    FaTruck, FaAward, FaRegStar, FaClock, FaGem, FaQrcode 
} from 'react-icons/fa';
import api from '../api/axios';
import { getImageUrl } from '../services/productService';
import {
    DetailsContainer,
    Breadcrumb,
    ProductHero,
    ImageSection,
    InfoSection,
    Badge,
    ProductName,
    PriceTag,
    Installments,
    Description,
    TrustBadgeGrid,
    TrustBadgeItem,
    PurchaseSection,
    MainCTA,
    SpecsGrid,
    SpecItem,
    SectionTitle,
    TestimonialsGrid,
    TestimonialCard,
    RelatedSection,
    RelatedGrid
} from './ProductDetails.styles';
import { ProductCard, ProductImageWrapper, ProductInfo, CategoryTag, ProductName as RelatedName, ProductPrice, ActionButtons, DetailsButton, WhatsAppButton, ProductBadge } from './Shop.styles';
import styled from 'styled-components';

const RatingSection = styled.div`
    margin-top: 3rem;
    padding: 2rem;
    background: #F8FAFC;
    border-radius: 24px;
    text-align: center;
    border: 1px solid #E2E8F0;

    h3 {
        color: #1A365D;
        margin-bottom: 1rem;
        font-weight: 700;
    }

    .stars {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-bottom: 1rem;
        
        svg {
            font-size: 2rem;
            cursor: pointer;
            transition: all 0.2s;
            color: #CBD5E1;

            &.active {
                color: #FBBF24;
            }

            &:hover {
                transform: scale(1.2);
            }
        }
    }

    p {
        color: #64748B;
        font-size: 0.9rem;
    }
`;

const ProductDetails = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const whatsappNumber = "5511999999999";

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [productRes, allProductsRes] = await Promise.all([
                    api.get(`/products/${slug}`),
                    api.get('/products')
                ]);
                
                setProduct(productRes.data);
                const other = allProductsRes.data.filter(p => p.slug !== slug).slice(0, 3);
                setRelatedProducts(other);
            } catch (error) {
                console.error("Erro ao carregar detalhes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        window.scrollTo(0, 0);
    }, [slug]);

    const handleWhatsApp = () => {
        const text = `Olá! Vi o produto *${product.name}* no site e gostaria de saber mais detalhes sobre como adquirir.`;
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    };


    if (loading) return <div style={{ padding: '10rem', textAlign: 'center' }}>Carregando detalhes...</div>;
    if (!product) return <div style={{ padding: '10rem', textAlign: 'center' }}>Produto não encontrado.</div>;

    const price = parseFloat(product.price);
    const installmentValue = (price / 12).toFixed(2);

    const testimonials = [
        { id: 1, name: "Maria Oliveira", role: "Cliente Satisfeita", text: "A placa ficou simplesmente maravilhosa. O QR Code funciona perfeitamente e a qualidade da porcelana é impecável. Recomendo muito!", rating: 5 },
        { id: 2, name: "João Pedro", role: "Homenagem Familiar", text: "Fiquei emocionado com a qualidade do material. O atendimento via WhatsApp foi muito rápido e atencioso. Entrega antes do prazo.", rating: 5 },
        { id: 3, name: "Ana Beatriz", role: "Memorial Digital", text: "Excelente solução para manter a memória viva. A durabilidade do material é visível e o acabamento é de alto luxo.", rating: 5 }
    ];

    return (
        <DetailsContainer>
            <Breadcrumb>
                <Link to="/">Início</Link> / <Link to="/loja">Loja</Link> / {product.name}
            </Breadcrumb>

            <ProductHero>
                <ImageSection>
                    <img src={getImageUrl(product.image_url)} alt={product.name} />
                </ImageSection>

                <InfoSection>
                    <Badge>{product.badge || 'Exclusivo'}</Badge>
                    <ProductName>{product.name}</ProductName>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', color: '#FBBF24' }}>
                            {[...Array(5)].map((_, i) => <FaStar key={i} size={14} />)}
                        </div>
                        <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>(48 avaliações de clientes)</span>
                    </div>

                    <PriceTag>
                        <span>A partir de</span> R$ {product.price}
                    </PriceTag>
                    
                    <Installments>
                        Ou 12x de <strong>R$ {installmentValue}</strong> no cartão
                    </Installments>
                    
                    <Description>{product.description}</Description>

                    <TrustBadgeGrid>
                        <TrustBadgeItem>
                            <FaShieldAlt />
                            100% SEGURO
                        </TrustBadgeItem>
                        <TrustBadgeItem>
                            <FaTruck />
                            FRETE GRÁTIS*
                        </TrustBadgeItem>
                        <TrustBadgeItem>
                            <FaAward />
                            GARANTIA TOTAL
                        </TrustBadgeItem>
                    </TrustBadgeGrid>

                    <PurchaseSection>
                        <MainCTA onClick={handleWhatsApp}>
                            <FaWhatsapp size={24} /> Solicitar Orçamento Personalizado
                        </MainCTA>
                        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94A3B8' }}>
                            <FaClock /> Produção estimada: 3 a 5 dias úteis
                        </p>
                    </PurchaseSection>

                    <div style={{ marginTop: '3rem', borderTop: '1px solid #E2E8F0', paddingTop: '2rem' }}>
                        <h4 style={{ color: '#1A365D', marginBottom: '1rem' }}>Especificações Técnicas</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ fontSize: '0.9rem' }}>
                                <strong style={{ color: '#64748B' }}>Material:</strong> <span style={{ color: '#1E293B' }}>{product.badge === 'Porcelana' ? 'Porcelana Italiana' : 'Aço Inox 304'}</span>
                            </div>
                            <div style={{ fontSize: '0.9rem' }}>
                                <strong style={{ color: '#64748B' }}>Tecnologia:</strong> <span style={{ color: '#1E293B' }}>QR Code Gravação Laser</span>
                            </div>
                            <div style={{ fontSize: '0.9rem' }}>
                                <strong style={{ color: '#64748B' }}>Durabilidade:</strong> <span style={{ color: '#1E293B' }}>Eterna (Intempéries)</span>
                            </div>
                            <div style={{ fontSize: '0.9rem' }}>
                                <strong style={{ color: '#64748B' }}>Acabamento:</strong> <span style={{ color: '#1E293B' }}>Polimento Premium</span>
                            </div>
                        </div>
                    </div>
                </InfoSection>
            </ProductHero>

            <RatingSection>
                <h3>Avalie este produto</h3>
                <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span 
                            key={star}
                            onClick={() => setUserRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                        >
                            {(hoverRating || userRating) >= star ? (
                                <FaStar className="active" />
                            ) : (
                                <FaRegStar />
                            )}
                        </span>
                    ))}
                </div>
                <p>{userRating > 0 ? `Sua nota: ${userRating} estrelas. Obrigado pelo feedback!` : 'Conte-nos sua experiência com este item.'}</p>
            </RatingSection>

            <section style={{ marginTop: '8rem' }}>
                <SectionTitle>Histórias de Amor e Saudade Eternizadas</SectionTitle>
                <TestimonialsGrid>
                    {testimonials.map(t => (
                        <TestimonialCard key={t.id}>
                            <div className="rating">
                                {[...Array(t.rating)].map((_, i) => <FaStar key={i} />)}
                            </div>
                            <p>"{t.text}"</p>
                            <div className="author">
                                <div className="avatar">{t.name.charAt(0)}</div>
                                <div className="info">
                                    <h4>{t.name}</h4>
                                    <span>{t.role}</span>
                                </div>
                            </div>
                        </TestimonialCard>
                    ))}
                </TestimonialsGrid>
            </section>

            <RelatedSection>
                <SectionTitle>Outras Formas de Honrar a Memória</SectionTitle>
                <RelatedGrid>
                    {relatedProducts.map(item => (
                        <ProductCard key={item.id}>
                            <ProductImageWrapper>
                                {item.badge && <ProductBadge>{item.badge}</ProductBadge>}
                                <img src={getImageUrl(item.image_url)} alt={item.name} />
                            </ProductImageWrapper>
                            <ProductInfo>
                                <CategoryTag>{item.badge || 'Homenagem'}</CategoryTag>
                                <RelatedName>{item.name}</RelatedName>
                                <ProductPrice>
                                    <span className="label">A partir de</span>
                                    <span className="price">R$ {item.price}</span>
                                </ProductPrice>
                                <ActionButtons>
                                    <DetailsButton as={Link} to={`/loja/item/${item.slug}`}>
                                        <FaEye /> Detalhes
                                    </DetailsButton>
                                    <WhatsAppButton onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=Interesse no item ${item.name}`, '_blank')}>
                                        <FaWhatsapp />
                                    </WhatsAppButton>
                                </ActionButtons>
                            </ProductInfo>
                        </ProductCard>
                    ))}
                </RelatedGrid>
            </RelatedSection>
        </DetailsContainer>
    );
};

const FaEye = () => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.71 135.59 3.48 241.4a48.35 48.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.59 284.52-177.41a48.35 48.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.84 143.84 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path>
    </svg>
);

export default ProductDetails;
