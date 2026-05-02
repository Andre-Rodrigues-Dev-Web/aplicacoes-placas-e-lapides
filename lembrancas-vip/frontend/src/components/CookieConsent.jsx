import React, { useState, useEffect } from 'react';
import { 
  ConsentContainer, 
  Content, 
  IconWrapper, 
  Text, 
  ButtonGroup, 
  AcceptButton, 
  SettingsButton 
} from './CookieConsent.styles';
import { FaShieldAlt, FaCheck } from 'react-icons/fa';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('lgpd-consent');
    if (!consent) {
      setTimeout(() => setVisible(true), 1500);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lgpd-consent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <ConsentContainer>
      <Content>
        <IconWrapper>
          <FaShieldAlt />
        </IconWrapper>
        <Text>
          <strong>Sua Privacidade Importa:</strong> Utilizamos cookies e tecnologias semelhantes para garantir que você tenha a melhor experiência possível, mantendo sua navegação segura e personalizada. 
          Ao continuar usando a LembrançasVIP, você concorda com o uso de dados conforme descrito em nossa <a href="/privacidade">Política de Privacidade</a>.
        </Text>
      </Content>
      <ButtonGroup>
        <SettingsButton onClick={() => setVisible(false)}>Preferências</SettingsButton>
        <AcceptButton onClick={handleAccept}>
          <FaCheck /> Aceitar e Continuar
        </AcceptButton>
      </ButtonGroup>
    </ConsentContainer>
  );
};

export default CookieConsent;
