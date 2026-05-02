import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.lightGray};
`;

export const Main = styled.main`
    flex: 1;
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
    padding: 3rem 2rem;
`;

export const PageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.5rem;
    flex-wrap: wrap;
    gap: 1rem;
`;

export const Title = styled.h1`
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.deepBlue};
`;

export const Greeting = styled.p`
    color: ${({ theme }) => theme.colors.textGray};
    margin-top: 0.25rem;
`;

export const CreateButton = styled(Link)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: ${({ theme }) => theme.gradients.primary};
    color: ${({ theme }) => theme.colors.white};
    padding: 0.75rem 1.5rem;
    border-radius: ${({ theme }) => theme.radius.large};
    font-weight: 600;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: ${({ theme }) => theme.shadows.medium};
    }
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
`;

export const StatsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;
`;

export const StatCard = styled.div`
    background: ${({ theme }) => theme.colors.white};
    padding: 2rem;
    border-radius: 28px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
    border: 1px solid rgba(226, 232, 240, 0.8);
    display: flex;
    align-items: center;
    gap: 1.5rem;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(255, 255, 255, 0) 100%);
        opacity: 0;
        transition: opacity 0.4s ease;
    }

    &:hover {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 20px 40px rgba(212, 175, 55, 0.12);
        border-color: rgba(212, 175, 55, 0.3);

        &::before {
            opacity: 1;
        }
    }
`;

export const StatIconWrapper = styled.div`
    width: 65px;
    height: 65px;
    border-radius: 20px;
    background: linear-gradient(135deg, #fff 0%, #E2E8F0 100%);
    box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.8), 0 4px 10px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.primary};
    position: relative;
    z-index: 1;
`;

export const StatInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

export const StatNumber = styled.span`
    font-size: 1.8rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.deepBlue};
    line-height: 1.2;
`;

export const StatLabel = styled.span`
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.textGray};
    font-weight: 500;
`;

export const MemorialCard = styled(Link)`
    background: ${({ theme }) => theme.colors.white};
    border-radius: 28px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(226, 232, 240, 0.6);
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    flex-direction: column;
    text-decoration: none;
    position: relative;

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
        border-color: rgba(212, 175, 55, 0.4);

        .card-image-overlay {
            transform: scale(1.05);
        }

        .view-btn {
            background: linear-gradient(135deg, rgba(212, 175, 55, 1) 0%, rgba(200, 160, 40, 1) 100%) !important;
            color: white !important;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }
    }
`;

export const CardImage = styled.div`
    width: 100%;
    height: 200px;
    background: ${({ theme }) => theme.gradients.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,0.4);
    font-size: 4rem;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    transition: transform 0.5s ease;
    
    /* Imagem de fundo com zoom ao dar hover (necessário passar a classe no componente) */
    &.card-image-overlay {
        transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
`;

export const CardBody = styled.div`
    padding: 1.5rem;
    background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 20%);
    position: relative;
    z-index: 2;
    margin-top: -20px; /* Efeito Bento overlap */
    border-radius: 24px 24px 0 0;
`;

export const CardName = styled.h3`
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.deepBlue};
    margin-bottom: 0.5rem;
`;

export const CardDates = styled.p`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textGray};
`;

export const EmptyState = styled.div`
    text-align: center;
    padding: 5rem 2rem;
    color: ${({ theme }) => theme.colors.textGray};

    svg {
        font-size: 4rem;
        color: ${({ theme }) => theme.colors.lightBlue};
        margin-bottom: 1.5rem;
    }

    h2 {
        font-size: 1.5rem;
        color: ${({ theme }) => theme.colors.deepBlue};
        margin-bottom: 0.75rem;
    }
`;
