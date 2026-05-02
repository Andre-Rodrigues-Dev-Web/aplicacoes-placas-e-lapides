import styled from 'styled-components';

export const StyledBadge = styled.span`
  font-size: ${props => props.$size || '0.6rem'};
  padding: ${props => props.$padding || '2px 8px'};
  border-radius: ${props => props.$round ? '50%' : '6px'};
  text-transform: ${props => props.$round ? 'none' : 'uppercase'};
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  background: ${props => {
    switch(props.$type) {
      case 'primary': return 'rgba(0, 174, 239, 0.1)';
      case 'success': return '#F0FFF4';
      case 'warning': return '#FFFBEB';
      case 'danger': return '#FFF5F5';
      case 'info': return '#EBF8FF';
      case 'dark': return '#EDF2F7';
      default: return '#F7FAFC';
    }
  }};
  
  color: ${props => {
    switch(props.$type) {
      case 'primary': return '#00AEEF';
      case 'success': return '#38A169';
      case 'warning': return '#D97706';
      case 'danger': return '#E53E3E';
      case 'info': return '#3182CE';
      case 'dark': return '#718096';
      default: return '#A0AEC0';
    }
  }};
`;
