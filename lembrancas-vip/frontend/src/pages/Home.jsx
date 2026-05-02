import React from 'react';
// Force Vite rebuild after style restoration
import { Link } from 'react-router-dom';
import { 
    FaPlay, FaCheck, FaStar, FaShieldAlt, FaClock, FaHeart, FaVideo, FaHandshake, FaWhatsapp, FaChevronLeft, FaChevronRight, FaQuoteLeft 
} from 'react-icons/fa';
import {
    HomeContainer,
    HeroWrapper,
    HeroContent,
    HeroText,
    HeroFeatures,
    WhatsAppButton,
    HeroCard,
    CardCarousel,
    CardSearch,
    TrustBar,
    TrustItem,
    SectionTitle,
    SectionSubtitle,
    GridContainer,
    ProductCard,
    CTAButton,
    VideoSection,
    VideoPlaceholder,
    StepGrid,
    StepItem,
    TestimonialCard,
    SupportBanner,
    RepresentativeBanner,
    CarouselWrapper,
    CarouselTrack,
    CarouselSlide,
    CarouselControls,
    CarouselDot,
    CarouselNavButton,
    MiniCarouselWrapper,
    MiniCarouselTrack,
    MiniCarouselSlide
} from './Home.styles';
import { getImageUrl } from '../services/productService';
import { useProducts, useFeaturedProducts } from '../hooks/useProducts';
import { useTestimonials } from '../hooks/useTestimonials';

const contactSlides = [
    '/slide-contato/produtos-memoriais.png',
    '/slide-contato/produtos-memoriais2.png',
    '/slide-contato/produtos-memoriais3.png'
];

const Home = () => {
    const { testimonials, loading: loadingTestimonials } = useTestimonials();
    const { bestSellers, loading: loadingProducts } = useFeaturedProducts(3);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [contactIndex, setContactIndex] = React.useState(0);
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    const slidesCount = testimonials.length;

    React.useEffect(() => {
        // Auto-play para o mini carousel de contato
        const contactTimer = setInterval(() => {
            setContactIndex((prev) => (prev + 1) % contactSlides.length);
        }, 4000);

        return () => clearInterval(contactTimer);
    }, []);

    React.useEffect(() => {
        if (slidesCount === 0) return;

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slidesCount);
        }, 5000);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(timer);
        };
    }, [slidesCount]);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % slidesCount);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + slidesCount) % slidesCount);
    };

    const getOffset = () => {
        const itemsVisible = windowWidth > 968 ? 3 : windowWidth > 640 ? 2 : 1;
        const itemWidth = 100 / itemsVisible;
        
        // Evita que o carousel mostre espaços em branco no final se não houver slides suficientes
        // Mas com 5 slides e 3 visíveis, temos 0, 1, 2 como índices válidos para o "início" do conjunto
        const maxIndex = slidesCount - itemsVisible;
        const boundedIndex = Math.min(activeIndex, maxIndex);
        
        return -(boundedIndex * itemWidth);
    };

    const [showVideo, setShowVideo] = React.useState(false);

    const [heroSlide, setHeroSlide] = React.useState(0);
    const heroImages = [
        'porcelain_plaque.png',
        'stainless_steel.png',
        'bronze_plaque.png'
    ];

    const nextHeroSlide = () => setHeroSlide((prev) => (prev + 1) % heroImages.length);
    const prevHeroSlide = () => setHeroSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

    const [memorialId, setMemorialId] = React.useState('');

    return (
        <HomeContainer>
            {/* HERO SECTION */}
            <HeroWrapper>
                <HeroContent>
                    <HeroText>
                        <h1>Eternize a História de Quem Você Ama com Homenagens Exclusivas</h1>
                        <p>Especialistas em Placas para Túmulos, Fotos em Porcelana de Alta Definição e Memoriais Digitais com QR Code. Tecnologia e carinho para preservar memórias que o tempo não apaga.</p>
                        
                        <WhatsAppButton href="https://wa.me/5511999999999" target="_blank">
                            Solicitar Orçamento Personalizado
                        </WhatsAppButton>

                        <HeroFeatures>
                            <div className="feature-item">
                                📦 <span>Enviamos para todo Brasil</span>
                            </div>
                            <div className="feature-item">
                                $ <span>Faça um Orçamento rápido e sem compromisso</span>
                            </div>
                            <div className="feature-item">
                                🚚 <span>Produção rápida • Arte personalizada grátis</span>
                            </div>
                            <div className="feature-item">
                                <div className="stars">
                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                </div>
                                <span>4.9/5 e centenas de famílias atendidas</span>
                            </div>
                        </HeroFeatures>
                    </HeroText>

                    <HeroCard>
                        <CardCarousel>
                            <button className="nav-btn left" onClick={prevHeroSlide}><FaChevronLeft /></button>
                            <img src={getImageUrl(heroImages[heroSlide])} alt="Produto LembrançasVIP" />
                            <button className="nav-btn right" onClick={nextHeroSlide}><FaChevronRight /></button>
                            <div className="dots">
                                {heroImages.map((_, i) => (
                                    <span key={i} className={i === heroSlide ? 'active' : ''} />
                                ))}
                            </div>
                        </CardCarousel>

                        <CardSearch>
                            <input 
                                type="text" 
                                placeholder="Digite o número memorial" 
                                value={memorialId}
                                onChange={(e) => setMemorialId(e.target.value)}
                            />
                            <button onClick={() => memorialId && (window.location.href = `/memorial/${memorialId}`)}>
                                Acessar meu Memorial
                            </button>
                        </CardSearch>
                    </HeroCard>
                </HeroContent>
            </HeroWrapper>

            {/* TRUST BAR */}
            <TrustBar>
                <TrustItem>
                    <span className="count">1.500+</span>
                    <span className="label">Famílias Atendidas</span>
                </TrustItem>
                <TrustItem>
                    <span className="count">100%</span>
                    <span className="label">Satisfação Garantida</span>
                </TrustItem>
                <TrustItem>
                    <span className="count">24h</span>
                    <span className="label">Suporte Dedicado</span>
                </TrustItem>
                <TrustItem>
                    <span className="count">Brasil</span>
                    <span className="label">Envio para Todo País</span>
                </TrustItem>
            </TrustBar>

            {/* MAIS VENDIDOS */}
            <SectionTitle>Homenagens que Mantêm a Memória Viva</SectionTitle>
            <SectionSubtitle>Nossos produtos mais escolhidos por famílias que buscam qualidade, durabilidade e respeito.</SectionSubtitle>
            <GridContainer>
                {loadingProducts ? (
                    <p style={{ textAlign: 'center', gridColumn: '1/-1', color: '#718096' }}>Carregando produtos...</p>
                ) : bestSellers.length > 0 ? (
                    bestSellers.map((product) => (
                        <ProductCard key={product.id}>
                            <img 
                                src={getImageUrl(product.image_url)} 
                                alt={product.name} 
                            />
                            <h3>{product.name}</h3>
                            <CTAButton to={`/loja/item/${product.slug || product.id}`}>Ver Detalhes</CTAButton>
                        </ProductCard>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', gridColumn: '1/-1', color: '#718096' }}>Nenhum produto em destaque no momento.</p>
                )}
            </GridContainer>

            {/* CATEGORIAS */}
            <SectionTitle>Encontre a Homenagem Perfeita</SectionTitle>
            <GridContainer style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                {[
                    { name: 'Placas de Porcelana', img: '/porcelain_plaque_memorial_1777705081872.png' },
                    { name: 'Aço e Bronze', img: '/stainless_steel_plaque_1777705355896.png' },
                    { name: 'Kits Completos', img: '/memorial_products_hero_1777705109571.png' },
                    { name: 'Lembranças', img: '/bronze_memorial_plaque_1777705383440.png' }
                ].map((cat, i) => (
                    <ProductCard key={i} style={{ padding: '1rem' }}>
                        <img src={cat.img} alt={cat.name} style={{ height: '120px', objectFit: 'cover', marginBottom: '10px' }} />
                        <h4 style={{ fontSize: '0.9rem' }}>{cat.name}</h4>
                    </ProductCard>
                ))}
            </GridContainer>

            {/* VIDEO SECTION */}
            <VideoSection>
                <SectionTitle>Porque Toda Vida Merece Ser Lembrada</SectionTitle>
                <VideoPlaceholder onClick={() => setShowVideo(true)}>
                    {showVideo ? (
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src="https://www.youtube.com/embed/OYVhd5Z-WA4?autoplay=1" 
                            title="LembrançasVIP Video" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            style={{ position: 'absolute', top: 0, left: 0 }}
                        ></iframe>
                    ) : (
                        <>
                            <img src="/memorial_video_cover_1777705417064.png" alt="Video Thumbnail" />
                            <div className="play-btn"><FaPlay /></div>
                        </>
                    )}
                </VideoPlaceholder>
            </VideoSection>

            {/* HOW IT WORKS */}
            <SectionTitle>Como Eternizar uma Memória em 3 Passos</SectionTitle>
            <StepGrid>
                <StepItem>
                    <div className="icon-box">1</div>
                    <h4>Escolha sua Homenagem</h4>
                    <p>Selecione o modelo de placa que mais combina com seu ente querido em nossa loja.</p>
                </StepItem>
                <StepItem>
                    <div className="icon-box">2</div>
                    <h4>Personalize com Fotos</h4>
                    <p>Envie as fotos e informações. Nossa equipe prepara o design e o memorial digital.</p>
                </StepItem>
                <StepItem>
                    <div className="icon-box">3</div>
                    <h4>Receba em Casa</h4>
                    <p>Sua placa chega pronta para instalação, com o QR Code configurado e ativo.</p>
                </StepItem>
            </StepGrid>
            <div style={{ textAlign: 'center' }}>
                <CTAButton to="/cadastrar" style={{ padding: '1.2rem 4rem' }}>Quero começar agora</CTAButton>
            </div>

            {/* VANTAGENS */}
            <SectionTitle>Vantagens Exclusivas</SectionTitle>
            <GridContainer>
                <StepItem>
                    <FaShieldAlt size={40} color="#00AEEF" />
                    <h4 style={{ marginTop: '1rem' }}>Segurança Total</h4>
                    <p>Seus dados e memórias protegidos em servidores de alta confiabilidade.</p>
                </StepItem>
                <StepItem>
                    <FaClock size={40} color="#00AEEF" />
                    <h4 style={{ marginTop: '1rem' }}>Acesso 24h</h4>
                    <p>O memorial digital pode ser acessado a qualquer momento, de qualquer lugar.</p>
                </StepItem>
                <StepItem>
                    <FaHeart size={40} color="#00AEEF" />
                    <h4 style={{ marginTop: '1rem' }}>Eternidade</h4>
                    <p>Diferente de fotos físicas, o digital não desbota e não se perde no tempo.</p>
                </StepItem>
            </GridContainer>

            {/* TESTIMONIALS CAROUSEL */}
            <SectionTitle>Depoimentos</SectionTitle>
            <SectionSubtitle>O que dizem as famílias que confiaram em nós</SectionSubtitle>
            
            {loadingTestimonials ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#718096' }}>Carregando depoimentos...</div>
            ) : slidesCount > 0 ? (
                <div style={{ position: 'relative' }}>
                    <CarouselWrapper>
                        <CarouselTrack offset={getOffset()}>
                            {testimonials.map((t) => (
                                <CarouselSlide key={t.id}>
                                    <TestimonialCard>
                                        <div className="quote-icon"><FaQuoteLeft /></div>
                                        <div className="stars">
                                            {[...Array(t.rating || 5)].map((_, i) => <FaStar key={i} />)}
                                        </div>
                                        <p>"{t.text}"</p>
                                        <div className="user">
                                            <div className="avatar">
                                                {t.initials || t.name?.charAt(0)}
                                            </div>
                                            <div className="info">
                                                <span className="name">{t.name}</span>
                                                <span className="location">{t.location || 'Brasil'}</span>
                                            </div>
                                        </div>
                                    </TestimonialCard>
                                </CarouselSlide>
                            ))}
                        </CarouselTrack>
                    </CarouselWrapper>

                    <CarouselControls>
                        <CarouselNavButton direction="left" onClick={prevSlide} aria-label="Anterior">
                            <FaChevronLeft />
                        </CarouselNavButton>
                        
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {testimonials.map((_, i) => (
                                <CarouselDot 
                                    key={i} 
                                    $active={i === activeIndex} 
                                    onClick={() => setActiveIndex(i)}
                                />
                            ))}
                        </div>

                        <CarouselNavButton direction="right" onClick={nextSlide} aria-label="Próximo">
                            <FaChevronRight />
                        </CarouselNavButton>
                    </CarouselControls>
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#718096' }}>Nenhum depoimento encontrado.</div>
            )}

            {/* SUPPORT BANNER */}
            <SupportBanner>
                <div className="content">
                    <h3>Precisa de ajuda para criar sua homenagem?</h3>
                    <p style={{ marginBottom: '2rem' }}>Nossa equipe está pronta para te guiar em cada passo desta importante decisão.</p>
                    <ul>
                        <li><FaCheck color="#28A745" /> Atendimento via WhatsApp</li>
                        <li><FaCheck color="#28A745" /> Suporte na escolha das fotos</li>
                        <li><FaCheck color="#28A745" /> Auxílio na montagem do memorial</li>
                    </ul>
                    <CTAButton to="#" color="#25D366" style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                        <FaWhatsapp size={20} /> Falar com um atendente agora
                    </CTAButton>
                </div>
                <div className="image">
                    <MiniCarouselWrapper>
                        <MiniCarouselTrack>
                            {contactSlides.map((src, idx) => (
                                <MiniCarouselSlide 
                                    key={idx} 
                                    $active={idx === contactIndex}
                                >
                                    <img 
                                        src={src} 
                                        alt={`Slide ${idx + 1}`} 
                                        loading="lazy" 
                                    />
                                </MiniCarouselSlide>
                            ))}
                        </MiniCarouselTrack>
                    </MiniCarouselWrapper>
                </div>
            </SupportBanner>

            {/* REPRESENTATIVE BANNER */}
            <RepresentativeBanner>
                <h3>Seja Nosso Representante</h3>
                <p style={{ marginBottom: '2rem' }}>Leve essa inovação para sua cidade e ajude famílias a eternizarem histórias.</p>
                <Link to="/contato" className="btn-white">Saiba Mais</Link>
            </RepresentativeBanner>
        </HomeContainer>
    );
};

export default Home;
