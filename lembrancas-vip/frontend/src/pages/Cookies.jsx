import React from 'react';
import { SectionTitle, SectionSubtitle } from './Home.styles';

import { ContentWrapper } from './LegalPages.styles';

const Cookies = () => {
  return (
    <div>
      <SectionTitle>Preferências de Cookies</SectionTitle>
      <SectionSubtitle>Entenda como usamos tecnologias de rastreamento</SectionSubtitle>
      <ContentWrapper>
        <p>Cookies são pequenos arquivos de texto enviados pelo site ao seu navegador para melhorar sua experiência de navegação e fornecer funcionalidades básicas.</p>
        
        <h3>Cookies Necessários</h3>
        <p>Essenciais para o funcionamento do site, como autenticação de usuário e carrinho de compras. Não podem ser desativados.</p>

        <h3>Cookies de Desempenho</h3>
        <p>Nos ajudam a entender como os visitantes interagem com o site, coletando informações anônimas para melhorias técnicas.</p>

        <h3>Como Gerenciar</h3>
        <p>Você pode configurar seu navegador para bloquear ou alertá-lo sobre esses cookies, mas algumas partes do site podem não funcionar corretamente.</p>
      </ContentWrapper>
    </div>
  );
};

export default Cookies;
