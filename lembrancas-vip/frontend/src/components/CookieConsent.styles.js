import styled, { keyframes } from 'styled-components';

export const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

export const ConsentContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  border: 1px solid #E2E8F0;
  animation: ${slideUp} 0.5s ease-out;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 20px 20px 0 0;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(212, 175, 55, 0.1);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #D4AF37;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

export const Text = styled.div`
  color: #2D3748;
  font-size: 0.95rem;
  line-height: 1.5;

  strong {
    color: #1A365D;
  }

  a {
    color: #00AEEF;
    text-decoration: underline;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
`;

export const AcceptButton = styled.button`
  background: #062B3F;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #0A3A54;
    transform: translateY(-2px);
  }
`;

export const SettingsButton = styled.button`
  background: transparent;
  color: #718096;
  border: 1px solid #CBD5E0;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #F7FAFC;
    color: #2D3748;
  }
`;
