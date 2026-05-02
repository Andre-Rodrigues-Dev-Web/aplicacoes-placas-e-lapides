import React, { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
    ContactContainer,
    ContactHero,
    ContactContentGrid,
    InfoSidebar,
    InfoCard,
    FormWrapper,
    StyledForm,
    SubmitButton,
    LgpdCheckbox
} from './Contact.styles';

const Contact = () => {
    const [lgpdConsent, setLgpdConsent] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!lgpdConsent) {
            alert('Para prosseguir, você precisa concordar com nossa Política de Privacidade.');
            return;
        }
        // Lógica de envio aqui
        alert('Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.');
    };

    return (
        <ContactContainer>
            <ContactHero>
                <h1>Fale Conosco</h1>
                <p>Estamos aqui para ouvir você, tirar suas dúvidas e ajudar a eternizar histórias inesquecíveis.</p>
            </ContactHero>

            <ContactContentGrid>
                <InfoSidebar>
                    <InfoCard $whatsapp href="https://wa.me/5500000000000" target="_blank" as="a" style={{textDecoration: 'none'}}>
                        <div className="icon-box">
                            <FaWhatsapp />
                        </div>
                        <div className="details">
                            <h4>WhatsApp</h4>
                            <p>Atendimento rápido e humano</p>
                            <span className="value">(11) 99999-9999</span>
                        </div>
                    </InfoCard>

                    <InfoCard href="mailto:contato@lembrancasvip.com.br" as="a" style={{textDecoration: 'none'}}>
                        <div className="icon-box">
                            <FaEnvelope />
                        </div>
                        <div className="details">
                            <h4>E-mail</h4>
                            <p>Suporte e assuntos comerciais</p>
                            <span className="value">contato@lembrancasvip.com.br</span>
                        </div>
                    </InfoCard>

                    <InfoCard>
                        <div className="icon-box">
                            <FaClock />
                        </div>
                        <div className="details">
                            <h4>Horário de Atendimento</h4>
                            <p>Segunda a Sexta: 08h às 18h</p>
                            <span className="value">Sábados: 09h às 13h</span>
                        </div>
                    </InfoCard>
                </InfoSidebar>

                <FormWrapper>
                    <h3>Envie uma mensagem</h3>
                    <StyledForm onSubmit={handleSubmit}>
                        <div>
                            <label>Seu Nome</label>
                            <input type="text" placeholder="Nome completo" required />
                        </div>
                        <div>
                            <label>Seu E-mail</label>
                            <input type="email" placeholder="email@exemplo.com" required />
                        </div>
                        <div className="full-width">
                            <label>Assunto</label>
                            <input type="text" placeholder="Como podemos ajudar?" required />
                        </div>
                        <div className="full-width">
                            <label>Sua Mensagem</label>
                            <textarea placeholder="Escreva aqui os detalhes do seu contato..." required></textarea>
                        </div>
                        
                        <div className="full-width">
                            <LgpdCheckbox>
                                <input 
                                    type="checkbox" 
                                    id="lgpd" 
                                    required 
                                    checked={lgpdConsent}
                                    onChange={(e) => setLgpdConsent(e.target.checked)}
                                />
                                <label htmlFor="lgpd">
                                    <FaShieldAlt style={{color: '#086fae', marginRight: '5px'}}/>
                                    Concordo com a coleta e uso dos meus dados pessoais informados acima para fins de atendimento e resposta, de acordo com a <Link to="/privacidade">Política de Privacidade</Link> da LembrançasVIP.
                                </label>
                            </LgpdCheckbox>
                        </div>

                        <SubmitButton type="submit" disabled={!lgpdConsent} style={{ opacity: lgpdConsent ? 1 : 0.6 }}>
                            Enviar Mensagem Agora
                        </SubmitButton>
                    </StyledForm>
                </FormWrapper>
            </ContactContentGrid>
        </ContactContainer>
    );
};

export default Contact;
