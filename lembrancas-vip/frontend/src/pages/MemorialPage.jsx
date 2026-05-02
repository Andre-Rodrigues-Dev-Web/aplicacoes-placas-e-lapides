import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { getImageUrl } from '../services/productService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaBookOpen, FaHeart, FaCameraRetro, FaRegCommentDots } from 'react-icons/fa';
import VirtualCandle from '../components/VirtualCandle';
import Timeline from '../components/Timeline';
import BackgroundMusic from '../components/BackgroundMusic';
import {
    PublicContainer,
    HeroSection,
    ProfileImage,
    Name,
    Dates,
    DateItem,
    ContentWrapper,
    Section,
    SectionTitle,
    TextContent,
    GalleryGrid,
    GalleryImageWrapper,
    GalleryImage,
    Form,
    Input,
    TextArea,
    SubmitButton,
    MessagesList,
    MessageCard
} from './MemorialPage.styles';

const MemoryRoomVR = lazy(() => import('../components/MemoryRoomVR'));

const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('pt-BR');
};

const MemorialPage = () => {
    const { slug } = useParams();
    const [memorial, setMemorial] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showRoom, setShowRoom] = useState(false);
    
    const [msgForm, setMsgForm] = useState({ visitor_name: '', visitor_email: '', message: '' });
    const [msgStatus, setMsgStatus] = useState('');

    useEffect(() => {
        const fetchMemorial = async () => {
            try {
                const response = await api.get(`/memorials/${slug}`);
                setMemorial(response.data);
            } catch (err) {
                console.error("Erro ao buscar memorial", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMemorial();
    }, [slug]);

    const handleMsgSubmit = async (e) => {
        e.preventDefault();
        setMsgStatus('Enviando...');
        try {
            await api.post(`/memorials/${slug}/messages`, msgForm);
            setMsgStatus('Mensagem enviada com sucesso! Obrigado pelo carinho.');
            setMsgForm({ visitor_name: '', visitor_email: '', message: '' });
            
            // Recarrega os dados do memorial para puxar a nova mensagem
            const response = await api.get(`/memorials/${slug}`);
            setMemorial(response.data);
        } catch (err) {
            setMsgStatus('Ocorreu um erro ao enviar a mensagem.');
        }
    };

    if (loading) {
        return <PublicContainer><p style={{textAlign: 'center', padding: '5rem'}}>Carregando memórias...</p></PublicContainer>;
    }

    if (!memorial) {
        return <PublicContainer><p style={{textAlign: 'center', padding: '5rem'}}>Memorial não encontrado.</p></PublicContainer>;
    }


    return (
        <PublicContainer>
            {/* 3D Memory Room — lazy loaded */}
            {showRoom && (
                <Suspense fallback={null}>
                    <MemoryRoomVR memorial={memorial} onClose={() => setShowRoom(false)} />
                </Suspense>
            )}

            <Header />
            <HeroSection>
                <ProfileImage src={getImageUrl(memorial.main_photo)} />
                <Name>{memorial.full_name}</Name>
                <Dates>
                    <DateItem>★ {formatDate(memorial.birth_date)}</DateItem>
                    <DateItem>✝ {formatDate(memorial.death_date)}</DateItem>
                </Dates>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <BackgroundMusic audioUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
                    <button
                        onClick={() => setShowRoom(true)}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '10px',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.35)',
                            color: 'white',
                            padding: '0.9rem 2rem',
                            borderRadius: '50px',
                            fontWeight: 800,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            letterSpacing: '0.5px',
                            transition: 'all 0.3s',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                            position: 'relative',
                            zIndex: 10
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        ✦ Entrar na Sala de Memórias 3D
                    </button>
                </div>
            </HeroSection>

            <ContentWrapper>
                {memorial.biography && (
                    <Section>
                        <SectionTitle><FaBookOpen /> História da Vida e Família</SectionTitle>
                        <TextContent>{memorial.biography}</TextContent>
                    </Section>
                )}

                {memorial.short_description && (
                    <Section>
                        <SectionTitle><FaHeart /> Gostos, Hobbies e Lembranças</SectionTitle>
                        <TextContent>{memorial.short_description}</TextContent>
                    </Section>
                )}

                <Timeline events={memorial.timeline} />

                {memorial.gallery && memorial.gallery.length > 0 && (
                    <Section>
                        <SectionTitle><FaCameraRetro /> Galeria de Fotos</SectionTitle>
                        <GalleryGrid>
                            {memorial.gallery.map((img, idx) => (
                                <GalleryImageWrapper key={idx}>
                                    <GalleryImage src={getImageUrl(img.file_path)} alt="Memorial Gallery" loading="lazy" />
                                </GalleryImageWrapper>
                            ))}
                        </GalleryGrid>
                    </Section>
                )}

                <Section>
                    <SectionTitle><FaRegCommentDots /> Deixe sua Homenagem</SectionTitle>
                    <p style={{ color: '#5D6B76', marginBottom: '1.5rem' }}>
                        Compartilhe uma lembrança ou uma mensagem de carinho para a família.
                    </p>
                    
                    {msgStatus && <p style={{ color: '#276749', background: '#F0FFF4', padding: '1rem', borderRadius: '8px', marginBottom: '1rem'}}>{msgStatus}</p>}
                    
                    <Form onSubmit={handleMsgSubmit}>
                        <Input 
                            placeholder="Seu nome completo" 
                            required 
                            value={msgForm.visitor_name}
                            onChange={(e) => setMsgForm({...msgForm, visitor_name: e.target.value})}
                        />
                        <Input 
                            type="email" 
                            placeholder="Seu e-mail ou telefone (Opcional)" 
                            value={msgForm.visitor_email}
                            onChange={(e) => setMsgForm({...msgForm, visitor_email: e.target.value})}
                        />
                        <TextArea 
                            placeholder="Escreva sua mensagem aqui..." 
                            required
                            value={msgForm.message}
                            onChange={(e) => setMsgForm({...msgForm, message: e.target.value})}
                        />
                        <SubmitButton type="submit">Enviar Mensagem</SubmitButton>
                    </Form>

                    <div style={{ marginTop: '2rem' }}>
                        <VirtualCandle memorialSlug={memorial.slug} initialCount={memorial.candle_count || 0} />
                    </div>

                    {memorial.messages && memorial.messages.length > 0 && (
                        <MessagesList>
                            <h3 style={{ marginTop: '1rem', color: '#1A365D' }}>Mensagens Recebidas</h3>
                            {memorial.messages.map((msg, idx) => (
                                <MessageCard key={idx}>
                                    <h4>{msg.visitor_name}</h4>
                                    <p>{msg.message}</p>
                                    <small>{new Date(msg.created_at).toLocaleString('pt-BR')}</small>
                                </MessageCard>
                            ))}
                        </MessagesList>
                    )}
                </Section>
            </ContentWrapper>
            <Footer />
        </PublicContainer>
    );
};

export default MemorialPage;
