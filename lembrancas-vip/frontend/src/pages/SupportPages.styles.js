import styled from 'styled-components';

export const SupportContainer = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 4rem 20px 8rem;
`;

export const SupportHeader = styled.header`
    text-align: center;
    margin-bottom: 5rem;

    h1 {
        font-size: 3.5rem;
        color: #1A365D;
        margin-bottom: 1.5rem;
        font-weight: 800;

        @media (max-width: ${props => props.theme.breakpoints.md}) {
            font-size: 2.2rem;
        }
    }

    p {
        font-size: 1.25rem;
        color: #64748B;
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.6;

        @media (max-width: ${props => props.theme.breakpoints.md}) {
            font-size: 1rem;
        }
    }
`;

export const SupportGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2.5rem;
    margin-bottom: 6rem;
`;

export const SupportCard = styled.div`
    background: white;
    padding: 2.5rem;
    border-radius: 24px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    border: 1px solid #F1F5F9;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        border-color: #DBEAFE;
    }

    svg {
        font-size: 2.5rem;
        color: #3B82F6;
        margin-bottom: 1.5rem;
    }

    h3 {
        font-size: 1.5rem;
        color: #1E293B;
        margin-bottom: 1rem;
        font-weight: 700;
    }

    p {
        color: #64748B;
        line-height: 1.6;
    }
`;

export const ContentSection = styled.section`
    background: #F8FAFC;
    padding: 4rem;
    border-radius: 40px;
    margin-top: 4rem;

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        padding: 2rem;
        border-radius: 24px;
        margin-top: 2rem;
    }

    h2 {
        font-size: 2.25rem;
        color: #1A365D;
        margin-bottom: 2rem;
        text-align: center;
        font-weight: 800;
    }

    .content-text {
        max-width: 800px;
        margin: 0 auto;
        color: #475569;
        line-height: 1.8;
        font-size: 1.1rem;

        h4 {
            color: #1E293B;
            margin: 2.5rem 0 1rem;
            font-size: 1.25rem;
            font-weight: 700;
        }

        ul {
            padding-left: 1.5rem;
            margin-bottom: 1.5rem;
            
            li {
                margin-bottom: 0.75rem;
            }
        }
    }
`;

export const FAQItem = styled.div`
    margin-bottom: 1.5rem;
    background: white;
    border-radius: 16px;
    border: 1px solid #E2E8F0;
    overflow: hidden;

    .question {
        padding: 1.5rem;
        font-weight: 700;
        color: #1E293B;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: background 0.2s;

        &:hover {
            background: #F1F5F9;
        }
    }

    .answer {
        padding: 0 1.5rem 1.5rem;
        color: #64748B;
        line-height: 1.6;
        display: ${props => props.$isOpen ? 'block' : 'none'};
        border-top: 1px solid #F1F5F9;
        padding-top: 1.5rem;
    }
`;
