import React from 'react';
import { SectionTitle, SectionSubtitle } from './Home.styles';

import { ContentWrapper } from './LegalPages.styles';

const Rights = () => {
  return (
    <div>
      <SectionTitle>Seus Direitos (LGPD)</SectionTitle>
      <SectionSubtitle>Controle total sobre seus dados pessoais</SectionSubtitle>
      <ContentWrapper>
        <p>A Lei Geral de Proteção de Dados (Lei nº 13.709/2018) garante a você diversos direitos em relação às suas informações pessoais.</p>
        
        <h3>Direito de Acesso</h3>
        <p>Você pode solicitar uma cópia de todos os dados pessoais que possuímos sobre você em nossos sistemas.</p>

        <h3>Direito de Retificação</h3>
        <p>Você tem o direito de solicitar a correção de dados incompletos, inexatos ou desatualizados.</p>

        <h3>Direito de Eliminação</h3>
        <p>Você pode solicitar a exclusão de seus dados pessoais quando eles não forem mais necessários para as finalidades coletadas.</p>

        <h3>Como Exercer seus Direitos</h3>
        <p>Basta enviar um e-mail para dpo@lembrancasvip.com.br com o assunto "Solicitação LGPD" e nossa equipe atenderá seu pedido dentro do prazo legal.</p>
      </ContentWrapper>
    </div>
  );
};

export default Rights;
