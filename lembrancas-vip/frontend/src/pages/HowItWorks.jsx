import React from 'react';
import { FaEdit, FaQrcode, FaCamera, FaHeart, FaChevronRight, FaPlay, FaCheck } from 'react-icons/fa';
import {
    HelpContainer,
    HelpHero,
    CategoryGrid,
    CategoryCard,
    ContactStrip,
    ActionButton
} from './HelpCenter.styles';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import styled from 'styled-components';

const StepBadge = styled.div`
    width: 40px;
    height: 40px;
    background: radial-gradient(circle at top right, #3a8cbe 0%, #086fae 100%);
    color: white;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
`;

const HowItWorks = () => {
    const steps = [
        {
            icon: <FaEdit />,
            title: 'Crie o Memorial',
            desc: 'Cadastre-se e preencha as informações da pessoa homenageada com biografia, fotos e vídeos de forma simples e intuitiva.'
        },
        {
            icon: <FaQrcode />,
            title: 'Adquira a Placa',
            desc: 'Escolha o modelo de placa em nossa loja (Porcelana Italiana ou Aço Inox 316L) que já vem com o QR Code exclusivo.'
        },
        {
            icon: <FaCamera />,
            title: 'Instale e Ative',
            desc: 'Fixe a placa no local da homenagem. O QR Code já vem 100% vinculado e ativo para o seu memorial digital.'
        }
    ];

    return (
        <HelpContainer>
            <HelpHero>
                <h1>Como Funciona</h1>
                <p>Quatro passos simples para transformar um túmulo em uma porta aberta para memórias inesquecíveis e legados eternos.</p>
            </HelpHero>

            <CategoryGrid style={{ marginTop: '-60px' }}>
                {steps.map((step, index) => (
                    <CategoryCard key={index} style={{ textAlign: 'left', padding: '3rem 2.5rem' }}>
                        <StepBadge>{index + 1}</StepBadge>
                        <div className="icon-box" style={{ margin: '0 0 1.5rem 0', width: '60px', height: '60px', fontSize: '1.5rem' }}>
                            {step.icon}
                        </div>
                        <h3>{step.title}</h3>
                        <p>{step.desc}</p>
                    </CategoryCard>
                ))}
            </CategoryGrid>

            <div style={{ maxWidth: '1000px', margin: '4rem auto 8rem', padding: '0 2rem' }}>
                <div style={{ background: '#F8FAFC', padding: '5rem', borderRadius: '50px', border: '1px solid #F1F5F9' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#1A365D', marginBottom: '2.5rem', fontWeight: 900, textAlign: 'center' }}>
                        A Experiência do Visitante
                    </h2>
                    <div style={{ fontSize: '1.2rem', color: '#475569', lineHeight: '1.8' }}>
                        <p style={{ marginBottom: '2rem', textAlign: 'center' }}>
                            Quando um familiar ou amigo visita o túmulo, ele pode apontar a câmera do celular para o QR Code. Instantaneamente, uma jornada de afeto se inicia:
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
                            {[
                                'Galeria de fotos históricas da família.',
                                'Vídeos de momentos especiais e vozes.',
                                'Biografia detalhada e árvore genealógica.',
                                'Homenagens e velas virtuais ativas.'
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'white', padding: '1.5rem', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.02)' }}>
                                    <FaCheck color="#25D366" />
                                    <span style={{ fontSize: '1rem', fontWeight: 600 }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <ContactStrip>
                <h3>Pronto para eternizar uma história?</h3>
                <p>Nossa equipe está à disposição para tirar todas as suas dúvidas sobre o processo.</p>
                <div className="actions">
                    <ActionButton $whatsapp href="https://wa.me/5500000000000" target="_blank">
                        <FaWhatsapp size={24} /> Suporte via WhatsApp
                    </ActionButton>
                    <ActionButton href="mailto:contato@lembrancasvip.com.br">
                        <FaEnvelope size={20} /> Enviar E-mail
                    </ActionButton>
                </div>
            </ContactStrip>
        </HelpContainer>
    );
};

export default HowItWorks;
