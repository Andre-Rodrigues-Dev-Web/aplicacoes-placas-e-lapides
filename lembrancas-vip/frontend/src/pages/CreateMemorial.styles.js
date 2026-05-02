import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.lightGray};
`;

export const Main = styled.main`
    flex: 1;
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
    padding: 3rem 2rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        padding: 2rem 1rem;
    }
`;

export const FormCard = styled.div`
    background: ${({ theme }) => theme.colors.white};
    padding: 2.5rem;
    border-radius: ${({ theme }) => theme.radius.medium};
    box-shadow: ${({ theme }) => theme.shadows.medium};

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        padding: 1.5rem;
    }
`;

export const Title = styled.h1`
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.deepBlue};
    margin-bottom: 1.5rem;
    text-align: center;
`;

export const SectionTitle = styled.h2`
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 2rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid ${({ theme }) => theme.colors.lightGray};
    padding-bottom: 0.5rem;
`;

export const FormGroup = styled.div`
    margin-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.deepBlue};
`;

export const Input = styled.input`
    padding: 0.9rem;
    border: 1px solid #E2E8F0;
    border-radius: ${({ theme }) => theme.radius.small};
    font-size: 1rem;
    background: ${({ theme }) => theme.colors.lightGray};

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        outline: none;
        background: ${({ theme }) => theme.colors.white};
    }
`;

export const TextArea = styled.textarea`
    padding: 0.9rem;
    border: 1px solid #E2E8F0;
    border-radius: ${({ theme }) => theme.radius.small};
    font-size: 1rem;
    min-height: 120px;
    resize: vertical;
    background: ${({ theme }) => theme.colors.lightGray};

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        outline: none;
        background: ${({ theme }) => theme.colors.white};
    }
`;

export const FileInputWrapper = styled.div`
    padding: 1rem;
    border: 2px dashed #CBD5E0;
    border-radius: ${({ theme }) => theme.radius.medium};
    text-align: center;
    cursor: pointer;
    background: #fff;
    transition: background 0.3s;

    &:hover {
        background: #EDF2F7;
    }

    input {
        display: none;
    }
`;

export const SubmitButton = styled.button`
    width: 100%;
    background: ${({ theme }) => theme.gradients.primary};
    color: ${({ theme }) => theme.colors.white};
    padding: 1.2rem;
    border-radius: ${({ theme }) => theme.radius.small};
    font-weight: bold;
    font-size: 1.1rem;
    margin-top: 2rem;
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-2px);
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
    }
`;

export const ErrorMsg = styled.div`
    color: #E53E3E;
    background: #FFF5F5;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    border: 1px solid #FEB2B2;
`;

export const QRCodeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    padding: 2rem;
    background: #F0FFF4;
    border: 1px solid #9AE6B4;
    border-radius: 8px;

    h3 {
        color: #276749;
        margin-bottom: 1rem;
    }

    p {
        margin-top: 1rem;
        color: #2F855A;
        text-align: center;
    }

    a {
        margin-top: 1rem;
        color: ${({ theme }) => theme.colors.primary};
        font-weight: bold;
    }
`;
