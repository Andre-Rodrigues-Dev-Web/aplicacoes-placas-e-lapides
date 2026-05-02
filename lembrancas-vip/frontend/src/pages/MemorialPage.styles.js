import styled from 'styled-components';

export const PublicContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.lightGray};
    font-family: 'Nunito', sans-serif;
`;

export const HeroSection = styled.section`
    background: ${({ theme }) => theme.gradients.primary};
    color: white;
    padding: 4rem 2rem;
    text-align: center;
    position: relative;
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        background: ${({ theme }) => theme.colors.lightGray};
        border-radius: 50% 50% 0 0;
        transform: scaleX(1.5);
    }
`;

export const ProfileImage = styled.div`
    width: 204px;
    height: 204px;
    border-radius: 50%;
    margin: 0 auto 2.5rem;
    position: relative;
    z-index: 10;
    box-sizing: border-box;
    
    padding: 8px;
    background: linear-gradient(135deg, 
        #F9D976 0%, 
        #E9B646 25%, 
        #FFF8CD 50%, 
        #C48D2A 75%, 
        #F9D976 100%
    );
    box-shadow: 
        0 12px 25px rgba(196, 141, 42, 0.4), /* Sombra da moldura projetada */
        inset 0 2px 4px rgba(255,255,255,0.6), /* Luz interna da moldura */
        inset 0 -2px 6px rgba(0,0,0,0.2); /* Sombra interna da moldura */

    /* A foto da pessoa e o anel branco vão por cima (dentro do padding) */
    &::before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        box-sizing: border-box;
        
        /* Anel interno branco suave */
        border: 4px solid #FFFFFF; 
        
        /* A foto do falecido */
        background-color: #CBD5E0;
        background-image: url(${props => props.src});
        background-size: cover;
        background-position: center;
    }
`;

export const Name = styled.h1`
    font-family: 'Nunito', sans-serif;
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    position: relative;
    z-index: 10;
    letter-spacing: 0.5px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;

export const Dates = styled.div`
    font-size: 1.15rem;
    opacity: 0.95;
    position: relative;
    z-index: 10;
    margin-bottom: 2rem;
    font-weight: 300;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 0.5rem;
    }
`;

export const DateItem = styled.span`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const ContentWrapper = styled.main`
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
    transform: translateY(-20px);
`;

export const Section = styled.section`
    background: white;
    padding: 3rem;
    border-radius: ${({ theme }) => theme.radius.large};
    box-shadow: 0 10px 30px rgba(0,0,0,0.03);

    @media (max-width: 768px) {
        padding: 2rem 1.5rem;
    }
`;

export const SectionTitle = styled.h2`
    font-family: 'Nunito', sans-serif;
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.deepBlue};
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    text-align: center;

    svg {
        color: #D4AF37;
        font-size: 1.4rem;
        margin-bottom: 0.25rem;
    }

    &::after {
        content: '';
        width: 60px;
        height: 2px;
        background: #D4AF37;
        margin-top: 0.5rem;
        border-radius: 2px;
    }
`;

export const TextContent = styled.div`
    color: ${({ theme }) => theme.colors.textGray};
    line-height: 1.8;
    font-size: 1.1rem;
    white-space: pre-wrap;
    text-align: justify;
`;

export const GalleryGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 1rem;
    }
`;

export const GalleryImageWrapper = styled.div`
    width: 100%;
    height: 220px;
    border-radius: ${({ theme }) => theme.radius.medium};
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.shadows.soft};
`;

export const GalleryImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;

    &:hover {
        transform: scale(1.08);
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`;

export const Input = styled.input`
    padding: 1.2rem;
    border: 1px solid #E2E8F0;
    border-radius: ${({ theme }) => theme.radius.small};
    font-size: 1rem;
    background: #fff;
    transition: all 0.3s;

    &:focus {
        border-color: #D4AF37;
        background: #FFFFFF;
        box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
        outline: none;
    }
`;

export const TextArea = styled.textarea`
    padding: 1.2rem;
    border: 1px solid #E2E8F0;
    border-radius: ${({ theme }) => theme.radius.small};
    font-size: 1rem;
    min-height: 140px;
    resize: vertical;
    background: #fff;
    transition: all 0.3s;

    &:focus {
        border-color: #D4AF37;
        background: #FFFFFF;
        box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
        outline: none;
    }
`;

export const SubmitButton = styled.button`
    background: linear-gradient(135deg, #2D3748 0%, #1A202C 100%);
    color: white;
    padding: 1.2rem;
    border-radius: ${({ theme }) => theme.radius.small};
    font-weight: bold;
    font-size: 1.1rem;
    transition: transform 0.2s, box-shadow 0.2s;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0,0,0,0.15);
    }
`;

export const MessagesList = styled.div`
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const MessageCard = styled.div`
    background: #FFFFFF;
    padding: 2.5rem 2rem;
    border-radius: ${({ theme }) => theme.radius.large};
    border: 1px solid #EDF2F7;
    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
    position: relative;
    text-align: center;

    &::before {
        content: '"';
        position: absolute;
        top: 15px;
        left: 50%;
        transform: translateX(-50%);
        font-family: 'Nunito', sans-serif;
        font-size: 5rem;
        color: #F1F5F9;
        line-height: 1;
        z-index: 0;
    }

    h4 {
        color: ${({ theme }) => theme.colors.deepBlue};
        margin-bottom: 1rem;
        position: relative;
        z-index: 1;
        font-weight: 700;
        font-size: 1.1rem;
    }

    p {
        color: ${({ theme }) => theme.colors.textGray};
        font-size: 1.05rem;
        line-height: 1.8;
        position: relative;
        z-index: 1;
        font-style: italic;
    }

    small {
        color: #A0AEC0;
        font-size: 0.85rem;
        display: block;
        margin-top: 1.5rem;
        position: relative;
        z-index: 1;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
`;
