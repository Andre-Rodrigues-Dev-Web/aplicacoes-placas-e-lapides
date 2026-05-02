import styled from 'styled-components';

export const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.02);
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-5px);
  }
`;

export const IconWrapper = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: ${props => props.$bgColor || '#f7fafc'};
  color: ${props => props.$color || '#00AEEF'};
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Value = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #1A365D;
`;

export const Label = styled.div`
  font-size: 0.85rem;
  color: #718096;
  font-weight: 500;
`;
