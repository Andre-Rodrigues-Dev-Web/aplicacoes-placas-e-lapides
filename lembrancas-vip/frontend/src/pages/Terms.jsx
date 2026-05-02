import React from 'react';
import { SectionTitle, SectionSubtitle } from './Home.styles';

import { ContentWrapper } from './LegalPages.styles';

const Terms = () => {
  return (
    <div>
      <SectionTitle>Termos de Uso</SectionTitle>
      <SectionSubtitle>Última atualização: Maio de 2024</SectionSubtitle>
      <ContentWrapper>
        <p>Bem-vindo ao LembrançasVIP. Ao acessar e utilizar nossa plataforma, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso.</p>
        
        <h3>1. Aceitação dos Termos</h3>
        <p>O acesso ao serviço LembrançasVIP implica na aceitação plena e sem reservas de todos os termos aqui descritos. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.</p>

        <h3>2. Descrição do Serviço</h3>
        <p>A LembrançasVIP oferece um sistema de memorial digital vinculado a produtos físicos (placas e fotos em porcelana) através de QR Codes, permitindo a preservação e compartilhamento de memórias de entes queridos.</p>

        <h3>3. Responsabilidade pelo Conteúdo</h3>
        <p>O usuário é o único responsável por todo o conteúdo (fotos, textos, datas) inserido nos memoriais digitais. É proibida a inserção de conteúdo ofensivo, ilegal ou que viole direitos de terceiros.</p>

        <h3>4. Propriedade Intelectual</h3>
        <p>A marca LembrançasVIP, o software, o design e toda a estrutura da plataforma são de propriedade exclusiva da empresa. O conteúdo do memorial pertence ao usuário, que concede à plataforma uma licença de hospedagem para a prestação do serviço.</p>

        <h3>5. Modificações</h3>
        <p>Reservamos o direito de modificar estes termos a qualquer momento, notificando os usuários através do site.</p>
      </ContentWrapper>
    </div>
  );
};

export default Terms;
