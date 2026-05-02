import styled from 'styled-components';

export const HelpContainer = styled.div`
    background: #FFFFFF;
    min-height: 100vh;
`;

export const HelpHero = styled.section`
    background: radial-gradient(circle at top right, #1E40AF 0%, #111827 100%);
    color: white;
    padding: 8rem 2rem 12rem;
    text-align: center;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: url('/pattern.png');
        opacity: 0.05;
        pointer-events: none;
    }

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
        margin: 0 auto 3rem;
        line-height: 1.6;
    }
`;

export const SearchWrapper = styled.div`
    max-width: 700px;
    margin: 0 auto;
    position: relative;
    z-index: 2;

    .search-input {
        width: 100%;
        padding: 1.5rem 2rem 1.5rem 4rem;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        color: white;
        font-size: 1.1rem;
        outline: none;
        transition: all 0.3s;

        &::placeholder { color: rgba(255, 255, 255, 0.5); }
        &:focus { 
            background: rgba(255, 255, 255, 0.15);
            border-color: #3B82F6;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
        }
    }

    svg {
        position: absolute;
        left: 1.5rem;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(255, 255, 255, 0.5);
        font-size: 1.4rem;
    }
`;

export const CategoryGrid = styled.div`
    max-width: 1200px;
    margin: -80px auto 6rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    padding: 0 2rem;
    position: relative;
    z-index: 10;

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        margin-top: -40px;
    }
`;

export const CategoryCard = styled.div`
    background: white;
    padding: 3rem 2rem;
    border-radius: 35px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
    border: 1px solid #F1F5F9;
    text-align: center;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;

    &:hover {
        transform: translateY(-12px);
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.1);
        border-color: #3B82F6;

        .icon-box {
            background: radial-gradient(circle at top right, #3a8cbe 0%, #086fae 100%);
            color: white;
            transform: scale(1.1) rotate(5deg);
        }
    }

    .icon-box {
        width: 80px;
        height: 80px;
        background: #EFF6FF;
        color: #3B82F6;
        border-radius: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 2rem;
        font-size: 2.2rem;
        transition: all 0.4s;
    }

    h3 {
        font-size: 1.5rem;
        color: #1E293B;
        margin-bottom: 1rem;
        font-weight: 800;
    }

    p {
        color: #64748B;
        line-height: 1.7;
        font-size: 1rem;
    }
`;

export const FaqSection = styled.section`
    max-width: 900px;
    margin: 0 auto 8rem;
    padding: 0 2rem;

    h2 {
        text-align: center;
        font-size: 2.5rem;
        color: #1A365D;
        margin-bottom: 4rem;
        font-weight: 900;

        @media (max-width: ${props => props.theme.breakpoints.md}) {
            font-size: 1.8rem;
            margin-bottom: 2rem;
        }
    }
`;

export const AccordionItem = styled.div`
    margin-bottom: 1.2rem;
    background: ${props => props.$isOpen ? '#F8FAFC' : 'white'};
    border-radius: 24px;
    border: 1px solid ${props => props.$isOpen ? '#DBEAFE' : '#F1F5F9'};
    overflow: hidden;
    transition: all 0.3s;

    .question {
        padding: 2rem;
        font-weight: 700;
        color: #1E293B;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.1rem;

        &:hover {
            color: radial-gradient(circle at top right, #3a8cbe 0%, #086fae 100%);
        }

        .toggle-icon {
            width: 32px;
            height: 32px;
            background: ${props => props.$isOpen ? 'radial-gradient(circle at top right, #3a8cbe 0%, #086fae 100%)' : '#F1F5F9'};
            color: ${props => props.$isOpen ? 'white' : '#64748B'};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
            transform: rotate(${props => props.$isOpen ? '180deg' : '0deg'});
        }
    }

    .answer {
        padding: 0 2rem 2.5rem;
        color: #475569;
        line-height: 1.8;
        font-size: 1.05rem;
        display: ${props => props.$isOpen ? 'block' : 'none'};
        animation: slideDown 0.3s ease-out;
    }

    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

export const ContactStrip = styled.div`
    background: #1A365D;
    padding: 6rem 2rem;
    color: white;
    text-align: center;
    border-radius: 50px;
    max-width: 1200px;
    margin: 0 auto 8rem;
    position: relative;
    overflow: hidden;

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        padding: 4rem 1.5rem;
        margin-bottom: 4rem;
        border-radius: 30px;
    }

    &::after {
        content: '';
        position: absolute;
        top: -50%; right: -20%;
        width: 600px; height: 600px;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
        pointer-events: none;
    }

    h3 { font-size: 2.5rem; margin-bottom: 1.5rem; font-weight: 800; }
    p { font-size: 1.2rem; opacity: 0.8; margin-bottom: 3rem; max-width: 600px; margin-left: auto; margin-right: auto; }

    .actions {
        display: flex;
        gap: 1.5rem;
        justify-content: center;
        flex-wrap: wrap;
    }
`;

export const ActionButton = styled.a`
    background: ${props => props.$whatsapp ? 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' : 'white'};
    color: ${props => props.$whatsapp ? 'white' : '#1E40AF'};
    padding: 1.2rem 2.5rem;
    border-radius: 20px;
    font-weight: 800;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.3s;
    box-shadow: 0 10px 25px ${props => props.$whatsapp ? 'rgba(37, 211, 102, 0.3)' : 'rgba(0,0,0,0.2)'};

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px ${props => props.$whatsapp ? 'rgba(37, 211, 102, 0.4)' : 'rgba(0,0,0,0.3)'};
    }
`;
