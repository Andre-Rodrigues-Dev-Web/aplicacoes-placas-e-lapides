import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4rem;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(15px);
    border-bottom: 1px solid rgba(226, 232, 240, 0.5);
    transition: all 0.3s ease;

    @media (max-width: 768px) {
        padding: 0 1.5rem;
        flex-direction: row;
        height: 70px;
    }
`;

export const LogoContainer = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
`;

export const LogoImage = styled.img`
    height: 45px;
    width: auto;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
`;

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    gap: 3rem;

    @media (max-width: 1100px) {
        gap: 1.5rem;
    }

    @media (max-width: 968px) {
        display: none; // Melhor esconder em mobile e usar um menu hambúrguer no futuro
    }
`;

export const NavLink = styled(Link)`
    color: #1A365D;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0;
        height: 2px;
        background: #3B82F6;
        transition: width 0.3s ease;
    }

    &:hover {
        color: #3B82F6;
        &::after {
            width: 100%;
        }
    }

    &.active {
        color: #3B82F6;
        &::after {
            width: 100%;
        }
    }
`;

export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;

    .desktop-only {
        @media (max-width: 968px) {
            display: none;
        }
    }
`;

export const ActionButton = styled(Link)`
    background: ${props => props.$secondary ? 'transparent' : 'radial-gradient(circle at top right, #3a8cbe 0%, #086fae 100%)'};
    color: ${props => props.$secondary ? '#1E40AF' : 'white'};
    padding: 0.8rem 1.8rem;
    border-radius: 12px;
    font-weight: 700;
    text-decoration: none;
    font-size: 0.9rem;
    border: ${props => props.$secondary ? '2px solid radial-gradient(circle at top right, #3a8cbe 0%, #086fae 100%)' : 'none'};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
    box-shadow: ${props => props.$secondary ? 'none' : '0 10px 20px rgba(37, 99, 235, 0.2)'};

    &:hover {
        transform: translateY(-2px);
        box-shadow: ${props => props.$secondary ? '0 5px 15px rgba(37, 99, 235, 0.1)' : '0 15px 30px rgba(37, 99, 235, 0.3)'};
        background: ${props => props.$secondary ? 'rgba(37, 99, 235, 0.05)' : 'radial-gradient(circle at top right, #4ba3d5 0%, #0a7fc5 100%)'};
    }
`;

export const UserProfile = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    color: #1A365D;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 12px;
    transition: background 0.2s;

    &:hover {
        background: rgba(0,0,0,0.03);
    }

    .user-info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .user-name {
            font-weight: 700;
            font-size: 0.9rem;
        }

        .user-role {
            font-size: 0.75rem;
            color: #64748B;
        }
    }
`;

export const UserAvatar = styled.div`
    width: 42px;
    height: 42px;
    background: #DBEAFE;
    color: radial-gradient(circle at top right, #3a8cbe 0%, #086fae 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    border: 2px solid white;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
`;

export const MenuButton = styled.button`
    display: none;
    background: none;
    border: none;
    font-size: 1.8rem;
    color: #062B3F;
    cursor: pointer;
    z-index: 1001;

    @media (max-width: 968px) {
        display: block;
    }
`;

export const DrawerOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 999;
    opacity: ${props => props.$isOpen ? 1 : 0};
    visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
    transition: all 0.3s ease;

    @media (min-width: 969px) {
        display: none !important;
    }
`;

export const DrawerContainer = styled.div`
    position: fixed;
    top: 0;
    right: ${props => props.$isOpen ? '0' : '-100%'};
    width: 300px;
    height: 100vh;
    background: white;
    z-index: 1000;
    padding: 6rem 2rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    box-shadow: -5px 0 25px rgba(0,0,0,0.1);
    transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    @media (min-width: 969px) {
        display: none !important;
    }


    nav {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        a {
            font-size: 1.2rem;
            color: #1A365D;
            text-decoration: none;
            font-weight: 600;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #F1F5F9;

            &:hover {
                color: #086fae;
            }
        }
    }

    .drawer-actions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: auto;
    }
`;
