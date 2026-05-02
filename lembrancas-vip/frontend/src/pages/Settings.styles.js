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
`;

export const Title = styled.h1`
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.deepBlue};
    margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
    color: ${({ theme }) => theme.colors.textGray};
    margin-bottom: 2.5rem;
`;

export const SettingsCard = styled.div`
    background: white;
    padding: 2.5rem;
    border-radius: ${({ theme }) => theme.radius.large};
    box-shadow: 0 4px 15px rgba(0,0,0,0.02);
    margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.deepBlue};
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #E2E8F0;

    svg {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
        font-weight: 600;
        color: ${({ theme }) => theme.colors.deepBlue};
        font-size: 0.95rem;
    }
`;

export const Input = styled.input`
    padding: 1rem;
    border: 1px solid #CBD5E0;
    border-radius: ${({ theme }) => theme.radius.small};
    font-size: 1rem;
    background: #fff;
    transition: all 0.3s;

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary};
        background: white;
        outline: none;
        box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
    }
`;

export const SubmitButton = styled.button`
    ${({ theme }) => theme.mixins.glassButton}
    align-self: flex-start;
    margin-top: 0.5rem;
`;

export const StatusMessage = styled.div`
    padding: 1rem;
    border-radius: ${({ theme }) => theme.radius.small};
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
    background: ${props => props.success ? '#F0FFF4' : '#FFF5F5'};
    color: ${props => props.success ? '#276749' : '#C53030'};
    border: 1px solid ${props => props.success ? '#C6F6D5' : '#FED7D7'};
`;
