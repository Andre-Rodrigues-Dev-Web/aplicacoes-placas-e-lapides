import React from 'react';
import {
  FooterContainer,
  FooterGrid,
  FooterColumn,
  LogoContainer,
  LogoImage,
  ColumnTitle,
  FooterLink,
  ExternalLink,
  SocialIcons,
  SocialIcon,
  Copyright,
  AdminAccess,
  PaymentMethods,
  TooltipWrapper
} from './Footer.styles';
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaLock } from 'react-icons/fa';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterGrid>
        <FooterColumn>
          <LogoContainer to="/">
            <LogoImage src="/logo.png" alt="LembrançasVIP" />
          </LogoContainer>
          <p style={{ lineHeight: '1.6', opacity: 0.8 }}>
            Um tributo eterno àqueles que amamos. Preservamos memórias, celebramos legados e conectamos gerações através do afeto.
          </p>
          <SocialIcons>
            <SocialIcon href="#" target="_blank"><FaFacebook /></SocialIcon>
            <SocialIcon href="#" target="_blank"><FaInstagram /></SocialIcon>
            <SocialIcon href="#" target="_blank"><FaWhatsapp /></SocialIcon>
            <SocialIcon href="mailto:contato@lembrancasvip.com.br"><FaEnvelope /></SocialIcon>
          </SocialIcons>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Navegação</ColumnTitle>
          <FooterLink to="/">Página Inicial</FooterLink>
          <FooterLink to="/explorar">Explorar Memoriais</FooterLink>
          <FooterLink to="/loja">Nossos Produtos</FooterLink>
          <FooterLink to="/cadastrar">Criar Homenagem</FooterLink>
          <FooterLink to="/entrar">Minha Conta</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Legal & LGPD</ColumnTitle>
          <FooterLink to="/termos">Termos de Uso</FooterLink>
          <FooterLink to="/privacidade">Política de Privacidade</FooterLink>
          <FooterLink to="/cookies">Preferências de Cookies</FooterLink>
          <FooterLink to="/direitos">Seus Direitos (LGPD)</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Suporte</ColumnTitle>
          <FooterLink to="/central-de-ajuda">Central de Ajuda</FooterLink>
          <FooterLink to="/como-funciona">Como Funciona</FooterLink>
          <FooterLink to="/faq">Dúvidas Frequentes</FooterLink>
          <FooterLink to="/contato">Fale Conosco</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle>Pagamento Seguro</ColumnTitle>
          <p style={{ fontSize: '0.85rem', color: '#718096', marginBottom: '0.5rem' }}>Aceitamos as principais formas:</p>
          <PaymentMethods>
            <TooltipWrapper data-tooltip="Pix (Aprovação Instantânea)">
              <img src="/icones/pix.svg" alt="Pix" />
            </TooltipWrapper>
            <TooltipWrapper data-tooltip="Cartão Visa">
              <img src="/icones/visa.svg" alt="Visa" />
            </TooltipWrapper>
            <TooltipWrapper data-tooltip="Cartão Mastercard">
              <img src="/icones/cartao-master.svg" alt="Mastercard" />
            </TooltipWrapper>
            <TooltipWrapper data-tooltip="Boleto Bancário">
              <img src="/icones/boleto.svg" alt="Boleto" />
            </TooltipWrapper>
          </PaymentMethods>
        </FooterColumn>
      </FooterGrid>

      <Copyright>
        <div>
          &copy; {new Date().getFullYear()} LembrançasVIP. Todos os direitos reservados.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span>Segurança 256-bit SSL</span>
          <AdminAccess to="/entrar">
            <FaLock /> Acesso Restrito
          </AdminAccess>
        </div>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
