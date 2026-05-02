import styled from 'styled-components';

export const ContactContainer = styled.div`
    background: #FFFFFF;
    min-height: 100vh;
`;

export const ContactHero = styled.section`
    background: radial-gradient(circle at top right, #1E40AF 0%, #111827 100%);
    color: white;
    padding: 8rem 2rem 10rem;
    text-align: center;
    position: relative;
    overflow: hidden;

    h1 {
        font-size: 4rem;
        font-weight: 900;
        margin-bottom: 1.5rem;
        letter-spacing: -2px;
        background: linear-gradient(to bottom, #FFFFFF, #E2E8F0);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        @media (max-width: ${props => props.theme.breakpoints.md}) {
            font-size: 2.8rem;
        }
    }

    p {
        font-size: 1.25rem;
        opacity: 0.8;
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.6;
    }
`;

export const ContactContentGrid = styled.div`
    max-width: 1200px;
    margin: -60px auto 8rem;
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 3rem;
    padding: 0 2rem;
    position: relative;
    z-index: 10;

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        margin-top: -40px;
        margin-bottom: 4rem;
    }

    @media (max-width: 968px) {
        grid-template-columns: 1fr;
    }
`;

export const InfoSidebar = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const InfoCard = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 30px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.05);
    border: 1px solid #F1F5F9;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    transition: all 0.3s;

    &:hover {
        transform: translateX(10px);
        border-color: #3B82F6;
        box-shadow: 0 20px 40px rgba(59, 130, 246, 0.1);
    }

    .icon-box {
        width: 60px;
        height: 60px;
        background: ${props => props.$whatsapp ? '#DCFCE7' : '#DBEAFE'};
        color: ${props => props.$whatsapp ? '#166534' : '#1E40AF'};
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
    }

    .details {
        h4 { color: #1E293B; margin-bottom: 4px; font-weight: 800; }
        p { color: #64748B; font-size: 0.95rem; }
        .value { color: #1E40AF; font-weight: 700; margin-top: 4px; display: block; text-decoration: none; }
    }
`;

export const FormWrapper = styled.div`
    background: white;
    padding: 4rem;
    border-radius: 40px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.08);
    border: 1px solid #F1F5F9;

    h3 { font-size: 2rem; color: #1A365D; margin-bottom: 2.5rem; font-weight: 900; }

    @media (max-width: 640px) {
        padding: 2.5rem;
    }
`;

export const StyledForm = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    .full-width { grid-column: 1 / -1; }

    label {
        display: block;
        margin-bottom: 8px;
        color: #475569;
        font-weight: 600;
        font-size: 0.9rem;
    }

    input, textarea {
        width: 100%;
        padding: 1.2rem;
        border-radius: 15px;
        border: 1px solid #E2E8F0;
        background: #F8FAFC;
        font-size: 1rem;
        transition: all 0.3s;
        outline: none;

        &:focus {
            background: white;
            border-color: #3B82F6;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
    }

    textarea {
        min-height: 150px;
        resize: vertical;
    }

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

export const LgpdCheckbox = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-top: 0.5rem;
    padding: 1rem;
    background: #F8FAFC;
    border-radius: 12px;
    border: 1px dashed #CBD5E1;

    input[type="checkbox"] {
        width: 18px;
        height: 18px;
        margin-top: 3px;
        accent-color: #086fae;
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
            color: #086fae;
            text-decoration: underline;
            font-weight: 600;
            margin-left: 4px;

            &:hover {
                color: #3a8cbe;
            }
        }
    }
`;

export const SubmitButton = styled.button`
    grid-column: 1 / -1;
    background: radial-gradient(circle at top right, #3a8cbe 0%, #086fae 100%);
    color: white;
    padding: 1.2rem;
    border-radius: 15px;
    border: none;
    font-weight: 800;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 30px rgba(37, 99, 235, 0.4);
    }
`;
