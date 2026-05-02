import React from 'react';
import { useLocation, Outlet, NavLink as RouterNavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
    FaHome, 
    FaUsers, 
    FaEnvelopeOpenText, 
    FaCog, 
    FaBookOpen, 
    FaStore, 
    FaChartPie, 
    FaTruck,
    FaShieldAlt 
} from 'react-icons/fa';
import { 
  LayoutContainer, 
  Sidebar, 
  SidebarLogo, 
  SidebarNav, 
  NavLink, 
  MainContent, 
  Topbar, 
  UserSection, 
  UserInfo, 
  UserAvatar, 
  MobileLogo, 
  ContentArea 
} from './AdminLayout.styles';

const AdminLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const isAdmin = user?.role === 'admin';

    const getInitial = (name) => name ? name.charAt(0).toUpperCase() : 'U';

    return (
        <LayoutContainer>
            <Sidebar>
                <SidebarLogo to="/painel">
                    <img src="/logo.png" alt="LembrançasVIP" />
                </SidebarLogo>
                <SidebarNav>
                    <NavLink to="/painel" end>
                        <FaHome /> <span>Dashboard</span>
                    </NavLink>
                    
                    {isAdmin && (
                        <NavLink to="/painel/clientes">
                            <FaUsers /> <span>Clientes</span>
                        </NavLink>
                    )}

                    {isAdmin && (
                        <NavLink to="/painel/fornecedores">
                            <FaTruck /> <span>Fornecedores</span>
                        </NavLink>
                    )}

                    <NavLink to="/painel/meus-memoriais">
                        <FaBookOpen /> <span>{isAdmin ? 'Todos Memoriais' : 'Meus Memoriais'}</span>
                    </NavLink>
                    
                    <NavLink to="/painel/mensagens">
                        <FaEnvelopeOpenText /> <span>Mensagens</span>
                    </NavLink>

                    {isAdmin && (
                        <NavLink to="/painel/loja">
                            <FaStore /> <span>Loja e Produtos</span>
                        </NavLink>
                    )}

                    {isAdmin && (
                        <NavLink to="/painel/relatorios">
                            <FaChartPie /> <span>Relatórios</span>
                        </NavLink>
                    )}

                    {isAdmin && (
                        <NavLink to="/painel/moderacao">
                            <FaShieldAlt /> <span>Moderação</span>
                        </NavLink>
                    )}

                    {isAdmin && (
                        <NavLink to="/painel/logistica">
                            <FaTruck /> <span>Logística</span>
                        </NavLink>
                    )}

                    <NavLink to="/painel/configuracoes">
                        <FaCog /> <span>Configurações</span>
                    </NavLink>
                </SidebarNav>
            </Sidebar>

            <MainContent>
                <Topbar>
                    <MobileLogo to="/painel">
                        <img src="/logo.png" alt="LembrançasVIP" />
                    </MobileLogo>
                    <UserSection>
                        <UserInfo>
                            <div className="name">{user?.name}</div>
                            <div className="role">{isAdmin ? 'Administrador' : 'Cliente'}</div>
                        </UserInfo>
                        <UserAvatar onClick={logout} title="Sair do painel">
                            {getInitial(user?.name)}
                        </UserAvatar>
                    </UserSection>
                </Topbar>
                <ContentArea>
                    {children || <Outlet />}
                </ContentArea>
            </MainContent>
        </LayoutContainer>
    );
};

export default AdminLayout;
