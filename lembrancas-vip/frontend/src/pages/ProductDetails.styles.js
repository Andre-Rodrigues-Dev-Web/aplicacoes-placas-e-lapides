import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
`;

export const DetailsContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 20px 5rem;
    animation: ${fadeIn} 0.6s ease-out;
`;

export const Breadcrumb = styled.div`
    margin-bottom: 2rem;
    font-size: 0.9rem;
    color: #64748B;
    
    a {
        color: #3B82F6;
        text-decoration: none;
        &:hover { text-decoration: underline; }
    }
`;

export const ProductHero = styled.div`
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 4rem;
    margin-bottom: 5rem;
    
    @media (max-width: 968px) {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
`;

export const ImageSection = styled.div`
    border-radius: 32px;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(0,0,0,0.1);
    min-height: 400px;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F8FAFC;
    position: relative;
    cursor: zoom-in;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
        height: 400px;
        min-height: auto;
        border-radius: 20px;
    }
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }

    &:hover img {
        @media (min-width: ${props => props.theme.breakpoints.md}) {
            transform: scale(1.5);
        }
    }
`;

export const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Badge = styled.span`
    display: inline-block;
    padding: 6px 16px;
    background: #DBEAFE;
    color: #1E40AF;
    border-radius: 50px;
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    width: fit-content;
`;

export const ProductName = styled.h1`
    font-size: 3rem;
    color: #1A365D;
    margin-bottom: 1rem;
    line-height: 1.1;
    font-weight: 800;

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        font-size: 2rem;
    }
`;

export const PriceTag = styled.div`
    font-size: 2.5rem;
    color: ${props => props.theme.colors.primary};
    font-weight: 800;
    margin-bottom: 1rem;

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        font-size: 2rem;
    }
    
    span {
        font-size: 1.2rem;
        color: #64748B;
        font-weight: 600;
        margin-right: 8px;
    }
`;

export const Installments = styled.div`
    font-size: 1rem;
    color: #475569;
    margin-bottom: 2rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    
    strong { color: #059669; }
`;

export const Description = styled.p`
    font-size: 1.15rem;
    color: #475569;
    line-height: 1.8;
    margin-bottom: 2.5rem;
`;

export const TrustBadgeGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 3rem;
    padding: 1.5rem;
    background: #F1F5F9;
    border-radius: 20px;

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
`;

export const TrustBadgeItem = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    font-weight: 700;
    color: #1E293B;
    
    svg {
        color: #3B82F6;
        font-size: 1.5rem;
    }
`;

export const PurchaseSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const MainCTA = styled.button`
    width: 100%;
    padding: 1.2rem 2.5rem;
    background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
    color: white;
    border: none;
    border-radius: 18px;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    box-shadow: 0 10px 20px rgba(37, 211, 102, 0.2);

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 30px rgba(37, 211, 102, 0.3);
    }
`;

export const SpecsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 4rem;

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        grid-template-columns: 1fr;
    }
`;

export const SpecItem = styled.div`
    padding: 1.2rem;
    background: white;
    border: 1px solid #E2E8F0;
    border-radius: 16px;
    
    span {
        display: block;
        font-size: 0.8rem;
        color: #64748B;
        text-transform: uppercase;
        font-weight: 700;
        margin-bottom: 4px;
    }
    
    p {
        font-weight: 600;
        color: #1A365D;
        margin: 0;
    }
`;

export const SectionTitle = styled.h2`
    font-size: 2rem;
    color: #1A365D;
    margin-bottom: 3rem;
    text-align: center;
    font-weight: 800;
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 4px;
        background: #3B82F6;
        border-radius: 10px;
    }
`;

export const TestimonialsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 6rem;
`;

export const TestimonialCard = styled.div`
    background: #F8FAFC;
    padding: 2.5rem;
    border-radius: 24px;
    border: 1px solid #F1F5F9;
    
    .rating {
        color: #FBBF24;
        margin-bottom: 1rem;
        display: flex;
        gap: 4px;
    }
    
    p {
        font-style: italic;
        color: #475569;
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }
    
    .author {
        display: flex;
        align-items: center;
        gap: 12px;
        
        .avatar {
            width: 40px;
            height: 40px;
            background: #E2E8F0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            color: #64748B;
        }
        
        .info {
            h4 { color: #1E293B; margin: 0; font-size: 1rem; }
            span { color: #94A3B8; font-size: 0.8rem; }
        }
    }
`;

export const RelatedSection = styled.div`
    margin-top: 5rem;
`;

export const RelatedGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
`;
