import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import {
    HeaderContainer,
    LogoContainer,
    LogoImage,
    Nav,
    NavLink,
    ActionButton,
    UserProfile,
    UserAvatar,
    ActionsContainer,
    MenuButton,
    DrawerOverlay,
    DrawerContainer
} from './Header.styles';

const Header = () => {
    const { user, signed, logout } = useAuth();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getInitial = (name) => name ? name.charAt(0) : 'U';

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <HeaderContainer>
            <LogoContainer to="/" onClick={closeMenu}>
                <LogoImage src="/logo.png" alt="LembrançasVIP Logo" />
            </LogoContainer>

            {/* Navegação Desktop */}
            <Nav>
                <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>Início</NavLink>
                <NavLink to="/explorar">Homenagens Digitais</NavLink>
                <NavLink to="/loja">Nossos Produtos</NavLink>
                <NavLink to="/contato">Contato</NavLink>
            </Nav>

            <ActionsContainer>
                {signed ? (
                    <UserProfile onClick={logout} title="Clique para sair">
                        <div className="user-info">
                            <span className="user-name">{user?.name?.split(' ')[0]}</span>
                            <span className="user-role">Minha Conta / Sair</span>
                        </div>
                        <UserAvatar>{getInitial(user?.name)}</UserAvatar>
                    </UserProfile>
                ) : (
                    <>
                        <NavLink to="/entrar" className="desktop-only" style={{ marginRight: '1rem' }}>Entrar</NavLink>
                        <ActionButton to="/cadastrar" className="desktop-only">Criar Memorial</ActionButton>
                    </>
                )}

                {/* Botão Hambúrguer Mobile */}
                <MenuButton onClick={toggleMenu}>
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </MenuButton>
            </ActionsContainer>

            {/* Drawer Overlay e Menu */}
            <DrawerOverlay $isOpen={isMenuOpen} onClick={closeMenu} />
            <DrawerContainer $isOpen={isMenuOpen}>
                <nav>
                    <NavLink to="/" onClick={closeMenu}>Início</NavLink>
                    <NavLink to="/explorar" onClick={closeMenu}>Homenagens Digitais</NavLink>
                    <NavLink to="/loja" onClick={closeMenu}>Nossos Produtos</NavLink>
                    <NavLink to="/contato" onClick={closeMenu}>Contato</NavLink>
                </nav>

                <div className="drawer-actions">
                    {!signed && (
                        <>
                            <NavLink to="/entrar" onClick={closeMenu}>Entrar na Conta</NavLink>
                            <ActionButton to="/cadastrar" onClick={closeMenu} style={{ textAlign: 'center' }}>
                                Criar Memorial
                            </ActionButton>
                        </>
                    )}
                </div>
            </DrawerContainer>
        </HeaderContainer>
    );
};

export default Header;
