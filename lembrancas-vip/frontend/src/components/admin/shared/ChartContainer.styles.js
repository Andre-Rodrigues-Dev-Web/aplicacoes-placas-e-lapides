import styled from 'styled-components';

export const Container = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 28px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  border: 1px solid rgba(226, 232, 240, 0.8);
  margin-top: ${props => props.$marginTop || '0'};
`;

export const Title = styled.h3`
  color: #1A365D;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: ${props => props.$height || '300px'};
  min-height: ${props => props.$height || '300px'};
`;
