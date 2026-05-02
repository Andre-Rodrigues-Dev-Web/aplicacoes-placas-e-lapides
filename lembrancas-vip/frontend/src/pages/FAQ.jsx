import React, { useState } from 'react';
import { FaChevronDown, FaQuestionCircle, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
    HelpContainer,
    HelpHero,
    SearchWrapper,
    FaqSection,
    AccordionItem,
    ContactStrip,
    ActionButton
} from './HelpCenter.styles';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "O QR Code para de funcionar depois de algum tempo?",
            answer: "Não. Nosso serviço é vitalício. Uma vez que você adquire a placa e cria o memorial, o link permanecerá ativo permanentemente. Não cobramos mensalidades para manter o memorial online."
        },
        {
            question: "A placa resiste ao sol e chuva?",
            answer: "Sim! Nossas placas em porcelana italiana e aço inox 304 são fabricadas especificamente para ambientes externos. A gravação a laser e a queima da porcelana garantem que a imagem e o código não desbotem com o tempo."
        },
        {
            question: "Qualquer pessoa pode editar o memorial?",
            answer: "Não. Apenas o proprietário (quem criou a conta e vinculou o memorial) possui acesso ao painel de edição. Você pode proteger o memorial com senha ou deixá-lo público para leitura, mas a edição é restrita."
        },
        {
            question: "Preciso baixar algum aplicativo?",
            answer: "Não é necessário. O sistema funciona via web. Basta apontar a câmera do celular (que já possui leitor de QR Code nativo) e o navegador abrirá automaticamente a página do memorial."
        },
        {
            question: "Posso colocar vídeos no memorial?",
            answer: "Sim! Você pode fazer upload de vídeos diretamente ou vincular links do YouTube/Vimeo para que as homenagens fiquem ainda mais completas."
        },
        {
            question: "Como é feita a entrega da placa?",
            answer: "Enviamos para todo o Brasil via Correios ou Transportadora com seguro total. O prazo médio de produção é de 3 a 5 dias úteis mais o tempo de transporte."
        }
    ];

    return (
        <HelpContainer>
            <HelpHero>
                <h1>Perguntas Frequentes</h1>
                <p>Tudo o que você precisa saber sobre as placas de homenagem e memoriais digitais LembrançasVIP.</p>
                <SearchWrapper>
                    <FaSearch />
                    <input 
                        type="text" 
                        placeholder="Pesquisar dúvida..." 
                        className="search-input"
                    />
                </SearchWrapper>
            </HelpHero>

            <FaqSection style={{ marginTop: '8rem' }}>
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} $isOpen={openIndex === index}>
                        <div className="question" onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
                            {faq.question}
                            <div className="toggle-icon">
                                <FaChevronDown />
                            </div>
                        </div>
                        <div className="answer">
                            {faq.answer}
                        </div>
                    </AccordionItem>
                ))}
            </FaqSection>

            <ContactStrip>
                <h3>Ainda tem alguma dúvida?</h3>
                <p>Nossa equipe está pronta para ajudar você a escolher a melhor homenagem.</p>
                <div className="actions">
                    <ActionButton $whatsapp href="https://wa.me/5500000000000" target="_blank">
                        <FaWhatsapp size={24} /> Falar no WhatsApp
                    </ActionButton>
                    <ActionButton href="mailto:contato@lembrancasvip.com.br">
                        <FaEnvelope size={20} /> Enviar E-mail
                    </ActionButton>
                </div>
            </ContactStrip>
        </HelpContainer>
    );
};

export default FAQ;
