import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.lightGray};
`;

export const Main = styled.main`
    flex: 1;
    max-width: 1000px;
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
    margin-bottom: 2rem;
`;

export const MessagesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
`;

export const MessageCard = styled.div`
    background: #FFFFFF;
    padding: 2rem;
    border-radius: ${({ theme }) => theme.radius.medium};
    border: 1px solid #E2E8F0;
    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h4 {
        color: ${({ theme }) => theme.colors.deepBlue};
        margin-bottom: 0.5rem;
        font-weight: 600;
        font-size: 1.1rem;
    }

    .memorial-badge {
        display: inline-block;
        background: #F1F5F9;
        color: ${({ theme }) => theme.colors.primary};
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: bold;
        margin-bottom: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    p {
        color: ${({ theme }) => theme.colors.textGray};
        font-size: 0.95rem;
        line-height: 1.6;
        font-style: italic;
        margin-bottom: 1.5rem;
        flex: 1;
    }

    .status-badge {
        display: inline-block;
        padding: 0.2rem 0.6rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: bold;
        text-transform: uppercase;
        margin-left: 0.5rem;

        &.pending { background: #FEFCBF; color: #B7791F; }
        &.approved { background: #C6F6D5; color: #22543D; }
        &.rejected { background: #FED7D7; color: #822727; }
    }

    .actions {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #F1F5F9;

        button {
            flex: 1;
            padding: 0.5rem;
            border-radius: 4px;
            font-weight: bold;
            font-size: 0.85rem;
            transition: opacity 0.2s;
            
            &.btn-approve {
                background: #48BB78;
                color: white;
            }
            
            &.btn-reject {
                background: #F56565;
                color: white;
            }

            &:hover { opacity: 0.8; }
        }
    }

    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #A0AEC0;
        font-size: 0.8rem;
        border-top: 1px solid #F1F5F9;
        padding-top: 0.75rem;
        margin-top: 1rem;
    }
`;

export const EmptyState = styled.div`
    background: white;
    padding: 4rem 2rem;
    text-align: center;
    border-radius: ${({ theme }) => theme.radius.large};
    box-shadow: ${({ theme }) => theme.shadows.soft};

    svg {
        font-size: 3rem;
        color: #CBD5E0;
        margin-bottom: 1rem;
    }

    h2 {
        color: ${({ theme }) => theme.colors.deepBlue};
        margin-bottom: 0.5rem;
    }

    p {
        color: ${({ theme }) => theme.colors.textGray};
    }
`;
