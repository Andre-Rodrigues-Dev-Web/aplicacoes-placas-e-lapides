import styled from 'styled-components';
import { NavLink as RouterNavLink } from 'react-router-dom';

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f7fafc;
`;

export const Sidebar = styled.aside`
  width: 260px;
  background: white;
  color: #2d3748;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: 100;
  border-right: 1px solid #edf2f7;
  box-shadow: 4px 0 10px rgba(0,0,0,0.02);

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SidebarLogo = styled(RouterNavLink)`
  padding: 2rem;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #edf2f7;
  img {
    max-width: 150px;
  }
`;

export const SidebarNav = styled.nav`
  flex: 1;
  padding: 1.5rem 0;
`;

export const NavLink = styled(RouterNavLink)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 2rem;
  color: #718096;
  text-decoration: none;
  transition: all 0.3s;
  font-weight: 500;
  margin: 0.2rem 1rem;
  border-radius: 12px;

  &:hover {
    background: #f7fafc;
    color: #00AEEF;
  }

  &.active {
    background: rgba(0, 174, 239, 0.1);
    color: #00AEEF;
    font-weight: bold;
  }

  svg {
    font-size: 1.2rem;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const Topbar = styled.header`
  height: 70px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 90;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const UserInfo = styled.div`
  text-align: right;
  .name {
    font-weight: 600;
    color: #2d3748;
  }
  .role {
    font-size: 0.8rem;
    color: #718096;
  }
`;

export const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: #00AEEF;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
`;

export const MobileLogo = styled(RouterNavLink)`
  display: none;
  @media (max-width: 768px) {
    display: block;
    img { max-height: 40px; }
  }
`;

export const ContentArea = styled.div`
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
