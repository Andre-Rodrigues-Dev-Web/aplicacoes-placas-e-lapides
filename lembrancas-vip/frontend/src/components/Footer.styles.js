import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.footer`
  background: #FFFFFF;
  color: #2D3748;
  padding: 4rem 2rem 1.5rem;
  border-top: 1px solid #E2E8F0;
`;

export const FooterGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
`;

export const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const LogoContainer = styled(Link)`
  display: block;
  margin-bottom: 0.5rem;
`;

export const LogoImage = styled.img`
  width: 200px;
  height: auto;
`;

export const ColumnTitle = styled.h4`
  color: #062B3F;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const FooterLink = styled(Link)`
  color: #4A5568;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: #00AEEF;
    transform: translateX(5px);
  }
`;

export const ExternalLink = styled.a`
  color: #4A5568;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: #00AEEF;
    transform: translateX(5px);
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
`;

export const SocialIcon = styled.a`
  color: #062B3F;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  opacity: 0.8;

  &:hover {
    color: #00AEEF;
    opacity: 1;
    transform: translateY(-3px);
  }
`;

export const Copyright = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 1.5rem;
  border-top: 1px solid #E2E8F0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.85rem;
  color: #718096;
`;

export const AdminAccess = styled(Link)`
  color: #A0AEC0;
  text-decoration: none;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;

  &:hover {
    color: #062B3F;
  }
`;

export const PaymentMethods = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 0.5rem;
  flex-wrap: wrap;
`;

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;

  img {
    height: 45px;
    width: auto;
    filter: grayscale(1) opacity(0.7);
    transition: all 0.3s ease;
    background: #f8fafc;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    cursor: pointer;

    &:hover {
      filter: none;
      opacity: 1;
      border-color: #cbd5e1;
      transform: translateY(-2px);
    }
  }

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-5px);
    background: #062B3F;
    color: white;
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 0.75rem;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    pointer-events: none;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }

  &:hover::after {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(-10px);
  }
`;
