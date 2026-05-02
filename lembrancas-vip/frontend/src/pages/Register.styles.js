import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

export const Main = styled.main`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.colors.lightGray};

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        padding: 1.5rem 1rem;
    }
`;

export const Card = styled.div`
    background: ${({ theme }) => theme.colors.white};
    padding: 3rem;
    border-radius: ${({ theme }) => theme.radius.medium};
    box-shadow: ${({ theme }) => theme.shadows.medium};
    width: 100%;
    max-width: 480px;
    text-align: center;

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        padding: 2rem 1.5rem;
    }
`;

export const Title = styled.h1`
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.deepBlue};
    margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
    color: ${({ theme }) => theme.colors.textGray};
    margin-bottom: 2rem;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.9rem 1rem;
    margin-bottom: 1rem;
    border: 1.5px solid #E2E8F0;
    border-radius: ${({ theme }) => theme.radius.small};
    font-size: 1rem;
    transition: border-color 0.2s;
    background: ${({ theme }) => theme.colors.lightGray};

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        outline: none;
        background: ${({ theme }) => theme.colors.white};
    }
`;

export const Button = styled.button`
    ${({ theme }) => theme.mixins.glassButton}
    width: 100%;
    margin-top: 0.5rem;
`;

export const ErrorMsg = styled.p`
    color: #E53E3E;
    background: #FFF5F5;
    border: 1px solid #FEB2B2;
    border-radius: 8px;
    padding: 0.75rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
`;

export const SuccessMsg = styled.p`
    color: #276749;
    background: #F0FFF4;
    border: 1px solid #9AE6B4;
    border-radius: 8px;
    padding: 0.75rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
`;

export const LoginLink = styled.p`
    margin-top: 1.5rem;
    color: ${({ theme }) => theme.colors.textGray};
    font-size: 0.95rem;

    a {
        color: ${({ theme }) => theme.colors.primary};
        font-weight: 600;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export const LgpdCheckbox = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: #F8FAFC;
    border-radius: 12px;
    border: 1px dashed #CBD5E1;
    text-align: left;

    input[type="checkbox"] {
        width: 18px;
        height: 18px;
        margin-top: 3px;
        accent-color: ${({ theme }) => theme.colors.primary};
        cursor: pointer;
    }

    label {
        font-size: 0.85rem;
        color: #475569;
        line-height: 1.5;
        cursor: pointer;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;

        a {
            color: ${({ theme }) => theme.colors.primary};
            text-decoration: underline;
            font-weight: 600;
            margin-left: 4px;

            &:hover {
                opacity: 0.8;
            }
        }
    }
`;
