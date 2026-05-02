import React from 'react';
import { SectionTitle, SectionSubtitle } from './Home.styles';

import { ContentWrapper } from './LegalPages.styles';

const Privacy = () => {
  return (
    <div>
      <SectionTitle>Política de Privacidade</SectionTitle>
      <SectionSubtitle>Sua privacidade é nossa prioridade</SectionSubtitle>
      <ContentWrapper>
        <p>A LembrançasVIP está comprometida em proteger sua privacidade e seus dados pessoais, em conformidade com a LGPD (Lei Geral de Proteção de Dados).</p>
        
        <h3>1. Coleta de Dados</h3>
        <p>Coletamos dados necessários para a criação da conta e processamento de pedidos (nome, e-mail, telefone, endereço) e dados para a composição do memorial digital (biografia e fotos do falecido).</p>

        <h3>2. Uso das Informações</h3>
        <p>As informações são utilizadas exclusivamente para a prestação do serviço contratado, processamento de pagamentos, envio de produtos e suporte técnico.</p>

        <h3>3. Compartilhamento</h3>
        <p>Não vendemos nem alugamos seus dados pessoais para terceiros. O compartilhamento ocorre apenas com parceiros essenciais para a operação (ex: transportadoras e processadores de pagamento).</p>

        <h3>4. Segurança</h3>
        <p>Utilizamos protocolos de segurança (SSL/HTTPS) e criptografia para garantir que seus dados permaneçam protegidos contra acessos não autorizados.</p>

        <h3>5. Seus Direitos</h3>
        <p>Você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento através de sua conta ou entrando em contato com nosso suporte.</p>
      </ContentWrapper>
    </div>
  );
};

export default Privacy;
