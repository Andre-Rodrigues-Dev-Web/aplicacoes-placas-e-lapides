import React, { useState } from 'react';
import { 
    FaSearch, FaBook, FaHeadset, FaUserShield, FaCreditCard, 
    FaTruck, FaChevronDown, FaWhatsapp, FaEnvelope, FaQuestionCircle 
} from 'react-icons/fa';
import {
    HelpContainer,
    HelpHero,
    SearchWrapper,
    CategoryGrid,
    CategoryCard,
    FaqSection,
    AccordionItem,
    ContactStrip,
    ActionButton
} from './HelpCenter.styles';

const HelpCenter = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const categories = [
        { 
            icon: <FaBook />, 
            title: 'Primeiros Passos', 
            desc: 'Tudo sobre como criar memoriais e configurar seu QR Code pela primeira vez.' 
        },
        { 
            icon: <FaUserShield />, 
            title: 'Segurança e Privacidade', 
            desc: 'Como protegemos os dados e as memórias da sua família com criptografia.' 
        },
        { 
            icon: <FaCreditCard />, 
            title: 'Pagamentos e Pedidos', 
            desc: 'Dúvidas sobre faturamento, nota fiscal e status de pedidos na loja.' 
        },
        { 
            icon: <FaTruck />, 
            title: 'Entrega e Instalação', 
            desc: 'Prazos de entrega e dicas para instalar sua placa no local definitivo.' 
        },
        { 
            icon: <FaHeadset />, 
            title: 'Suporte Técnico', 
            desc: 'Ajustes no memorial digital, upload de vídeos e resolução de problemas.' 
        },
        { 
            icon: <FaQuestionCircle />, 
            title: 'Dúvidas Gerais', 
            desc: 'Outras informações sobre nossos serviços e parcerias.' 
        }
    ];

    const faqs = [
        {
            q: "Como funciona o QR Code vitalício?",
            a: "Nossa tecnologia garante que o link do memorial permaneça ativo por tempo indeterminado. As placas são fabricadas com materiais de alta durabilidade (porcelana ou aço inox 316L) para resistir a décadas de exposição ao tempo sem perder a leitura do código."
        },
        {
            q: "Posso editar o memorial depois de pronto?",
            a: "Sim! Este é um dos nossos maiores diferenciais. O proprietário pode acessar o painel de controle a qualquer momento para atualizar fotos, textos, árvores genealógicas e vídeos, sem necessidade de alterar a placa física no local."
        },
        {
            q: "O que acontece se eu perder o acesso à minha conta?",
            a: "Não se preocupe. Temos um processo de recuperação rigoroso porém simples, validando a identidade do proprietário ou sucessores legais para garantir que as memórias familiares permaneçam em mãos seguras."
        },
        {
            q: "Qual o prazo médio de produção e entrega?",
            a: "Nossa produção é artesanal e cuidadosa. Geralmente levamos de 3 a 5 dias úteis para preparar a arte e fabricar a placa. O prazo de entrega varia conforme sua região, mas enviamos para todo o Brasil com rastreamento total."
        }
    ];

    return (
        <HelpContainer>
            <HelpHero>
                <h1>Central de Ajuda</h1>
                <p>Encontre respostas rápidas e suporte especializado para eternizar as memórias de quem você ama.</p>
                <SearchWrapper>
                    <FaSearch />
                    <input 
                        type="text" 
                        placeholder="Como podemos ajudar você hoje?" 
                        className="search-input"
                    />
                </SearchWrapper>
            </HelpHero>

            <CategoryGrid>
                {categories.map((cat, index) => (
                    <CategoryCard key={index}>
                        <div className="icon-box">{cat.icon}</div>
                        <h3>{cat.title}</h3>
                        <p>{cat.desc}</p>
                    </CategoryCard>
                ))}
            </CategoryGrid>

            <FaqSection>
                <h2>Dúvidas Frequentes</h2>
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} $isOpen={openFaq === index}>
                        <div className="question" onClick={() => toggleFaq(index)}>
                            {faq.q}
                            <div className="toggle-icon">
                                <FaChevronDown />
                            </div>
                        </div>
                        <div className="answer">
                            {faq.a}
                        </div>
                    </AccordionItem>
                ))}
            </FaqSection>

            <ContactStrip>
                <h3>Não encontrou o que procurava?</h3>
                <p>Nossa equipe de suporte está disponível para atender você de forma humanizada e rápida.</p>
                <div className="actions">
                    <ActionButton $whatsapp href="https://wa.me/5500000000000" target="_blank">
                        <FaWhatsapp size={24} /> Atendimento via WhatsApp
                    </ActionButton>
                    <ActionButton href="mailto:suporte@lembrancasvip.com.br">
                        <FaEnvelope size={20} /> suporte@lembrancasvip.com.br
                    </ActionButton>
                </div>
            </ContactStrip>
        </HelpContainer>
    );
};

export default HelpCenter;
