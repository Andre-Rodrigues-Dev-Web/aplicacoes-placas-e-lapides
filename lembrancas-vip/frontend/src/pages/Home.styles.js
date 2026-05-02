import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const float = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
`;

export const HomeContainer = styled.div`
    background: #FFFFFF;
`;

export const HeroWrapper = styled.section`
    background: radial-gradient(circle at top right, ${props => props.theme.colors.primaryLight} 0%, ${props => props.theme.colors.primary} 100%);
    color: white;
    padding: 6rem 2rem 12rem;
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

    &::after {
        content: '';
        position: absolute;
        bottom: -2px; left: 0; right: 0;
        height: 180px;
        background: white;
        clip-path: ellipse(80% 100% at 50% 100%);
    }
`;

export const HeroContent = styled.div`
    max-width: 1250px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
    position: relative;
    z-index: 2;

    @media (max-width: 968px) {
        flex-direction: column;
        text-align: center;
    }
`;

export const HeroText = styled.div`
    flex: 1.2;

    h1 {
        font-size: 4.5rem;
        font-weight: 900;
        line-height: 1.05;
        margin-bottom: 2rem;
        letter-spacing: -2px;
        background: linear-gradient(to bottom, #FFFFFF, #E2E8F0);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        @media (max-width: ${props => props.theme.breakpoints.md}) {
            font-size: 3rem;
        }
        @media (max-width: ${props => props.theme.breakpoints.sm}) {
            font-size: 2.5rem;
        }
    }

    p {
        font-size: 1.25rem;
        opacity: 0.9;
        margin-bottom: 3rem;
        max-width: 600px;
        line-height: 1.7;
    }
`;

export const HeroFeatures = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 3rem;

    .feature-item {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 1.05rem;
        color: rgba(255, 255, 255, 0.9);
        
        .stars { color: #FBBF24; display: flex; gap: 4px; }
    }
`;

export const WhatsAppButton = styled.a`
    background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
    color: white;
    padding: 1.4rem 3rem;
    border-radius: 100px;
    font-weight: 800;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 15px;
    box-shadow: 0 15px 35px rgba(37, 211, 102, 0.4);
    transition: all 0.4s ease;

    &:hover { transform: translateY(-5px); }
`;

export const HeroCard = styled.div`
    flex: 0.8;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    padding: 24px;
    border-radius: 40px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: ${float} 6s ease-in-out infinite;
`;

export const CardCarousel = styled.div`
    border-radius: 24px;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    position: relative;

    img { width: 100%; height: 100%; object-fit: cover; }
    .nav-btn {
        position: absolute; top: 50%; transform: translateY(-50%);
        width: 35px; height: 35px; background: white; border-radius: 50%;
        display: flex; align-items: center; justify-content: center; border: none; cursor: pointer;
        &.left { left: 10px; } &.right { right: 10px; }
    }
    .dots {
        position: absolute; bottom: 15px; left: 50%; transform: translateX(-50%);
        display: flex; gap: 8px;
        span { width: 8px; height: 8px; background: white; border-radius: 50%; opacity: 0.5; &.active { opacity: 1; } }
    }
`;

export const CardSearch = styled.div`
    display: flex; gap: 12px; margin-top: 20px;
    input { flex: 1; padding: 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.2); color: white; }
    button { background: white; color: #1E40AF; padding: 0 20px; border-radius: 12px; border: none; font-weight: 800; cursor: pointer; }
`;

export const TrustBar = styled.div`
    background: ${props => props.theme.colors.white};
    padding: 3rem;
    border-radius: ${props => props.theme.radius.lg};
    box-shadow: ${props => props.theme.shadows.lg};
    display: flex;
    justify-content: space-around;
    position: relative;
    z-index: 10;
    max-width: 1100px;
    margin: -80px auto 4rem;

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        flex-direction: column;
        gap: 2rem;
        margin-top: -60px;
        padding: 2rem;
    }
`;

export const TrustItem = styled.div`
    display: flex; flex-direction: column; align-items: center;
    .count { font-size: 1.8rem; font-weight: 800; color: #1E40AF; }
    .label { font-size: 0.85rem; color: #64748B; font-weight: 700; text-transform: uppercase; }
`;

export const SectionTitle = styled.h2`
    text-align: center;
    font-size: 3rem;
    color: #1A365D;
    margin: 8rem 0 1.5rem;
    font-weight: 800;

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        font-size: 2rem;
        padding: 0 1rem;
        margin-top: 5rem;
    }
`;

export const SectionSubtitle = styled.p`
    text-align: center; color: #64748B; margin-bottom: 5rem; font-size: 1.2rem; max-width: 700px; margin-left: auto; margin-right: auto;
`;

export const GridContainer = styled.div`
    max-width: 1250px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2.5rem; padding: 0 2rem;
`;

export const ProductCard = styled.div`
    background: white; border-radius: 30px; padding: 2rem; border: 1px solid #F1F5F9; text-align: center;
    img { width: 100%; height: 220px; object-fit: contain; margin-bottom: 2rem; }
    h3 { font-size: 1.4rem; color: #1E293B; margin-bottom: 1.5rem; }
`;

export const CTAButton = styled(Link)`
    background: radial-gradient(circle at top right, #3a8cbe 0%, #086fae 100%); color: white; padding: 1rem 2.5rem; border-radius: 15px; font-weight: 700; text-decoration: none; display: inline-block;
`;

export const VideoSection = styled.section`
    background: #F8FAFC; padding: 8rem 2rem; margin: 8rem 0;
`;

export const VideoPlaceholder = styled.div`
    max-width: 1000px; margin: 0 auto; aspect-ratio: 16 / 9; background: #000; border-radius: 30px; overflow: hidden; position: relative; cursor: pointer;
    img { width: 100%; height: 100%; object-fit: cover; opacity: 0.7; }
    .play-btn {
        position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
        width: 80px; height: 80px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: radial-gradient(circle at top right, #3a8cbe 0%, #086fae 100%); font-size: 2rem;
    }
`;

export const StepGrid = styled.div`
    max-width: 1100px; margin: 4rem auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; padding: 0 2rem;
    @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

export const StepItem = styled.div`
    text-align: center;
    .icon-box { width: 60px; height: 60px; background: #DBEAFE; color: radial-gradient(circle at top right, #3a8cbe 0%, #086fae 100%); border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-weight: 800; font-size: 1.5rem; }
    h4 { font-size: 1.25rem; color: #1E293B; margin-bottom: 1rem; }
    p { color: #64748B; line-height: 1.6; }
`;

export const TestimonialCard = styled.div`
    background: #F8FAFC; padding: 3rem; border-radius: 35px; border: 1px solid #F1F5F9;
    .stars { color: #FBBF24; display: flex; gap: 5px; margin-bottom: 1rem; }
    p { font-size: 1.1rem; color: #475569; line-height: 1.8; font-style: italic; }
    .user {
        display: flex; align-items: center; gap: 15px; margin-top: 2rem;
        .avatar { width: 50px; height: 50px; background: #DBEAFE; color: radial-gradient(circle at top right, #3a8cbe 0%, #086fae 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; }
        .info { display: flex; flex-direction: column; text-align: left; .name { font-weight: 700; color: #1E293B; } .location { font-size: 0.85rem; color: #94A3B8; } }
    }
`;

export const CarouselWrapper = styled.div`
    overflow: hidden; padding: 2rem 0;
`;

export const CarouselTrack = styled.div`
    display: flex; transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(${props => props.offset}%);
`;

export const CarouselSlide = styled.div`
    flex: 0 0 calc(100% / 3); padding: 0 1rem;
    @media (max-width: 968px) { flex: 0 0 50%; }
    @media (max-width: 640px) { flex: 0 0 100%; }
`;

export const CarouselControls = styled.div`
    display: flex; align-items: center; justify-content: center; gap: 2rem; margin-top: 3rem;
`;

export const CarouselNavButton = styled.button`
    background: white; border: 1px solid #E2E8F0; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748B; transition: all 0.3s;
    &:hover { background: #F8FAFC; color: radial-gradient(circle at top right, #3a8cbe 0%, #086fae 100%); border-color: #CBD5E1; }
`;

export const CarouselDot = styled.button`
    width: 10px; height: 10px; border-radius: 50%; border: none; background: ${props => props.$active ? 'radial-gradient(circle at top right, #3a8cbe 0%, #086fae 100%)' : '#E2E8F0'}; cursor: pointer; transition: all 0.3s;
`;

export const SupportBanner = styled.div`
    max-width: 1250px;
    margin: 8rem auto;
    background: #1A365D;
    border-radius: 40px;
    display: flex;
    overflow: hidden;
    color: white;

    @media (max-width: ${props => props.theme.breakpoints.md}) {
        flex-direction: column;
        margin: 4rem 1rem;
    }

    .content {
        flex: 1;
        padding: 5rem;

        @media (max-width: ${props => props.theme.breakpoints.md}) {
            padding: 3rem 2rem;
        }

        h3 {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
            @media (max-width: ${props => props.theme.breakpoints.md}) {
                font-size: 1.8rem;
            }
        }
        ul {
            list-style: none;
            margin-bottom: 2rem;
            li {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 10px;
            }
        }
    }
    .image { flex: 1; position: relative; }
    @media (max-width: 968px) { flex-direction: column; .content { padding: 3rem; } .image { height: 300px; } }
`;

export const MiniCarouselWrapper = styled.div`
    width: 100%; height: 100%; position: relative; overflow: hidden;
`;

export const MiniCarouselTrack = styled.div`
    width: 100%; height: 100%; display: flex;
`;

export const MiniCarouselSlide = styled.div`
    position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: ${props => props.$active ? 1 : 0}; transition: opacity 1s ease-in-out;
    img { width: 100%; height: 100%; object-fit: cover; }
`;

export const RepresentativeBanner = styled.section`
    background: radial-gradient(circle at top right, #3a8cbe 0%, #086fae 100%); padding: 6rem 2rem; text-align: center; color: white; margin-top: 8rem;
    h3 { font-size: 2.5rem; margin-bottom: 1.5rem; }
    .btn-white { 
        background: radial-gradient(circle at top right, #3a8cbe 0%, #086fae 100%); 
        color: white; 
        padding: 1rem 3rem; 
        border-radius: 15px; 
        text-decoration: none; 
        font-weight: 800; 
        display: inline-block; 
        transition: all 0.3s; 
        &:hover { 
            transform: translateY(-3px); 
            box-shadow: 0 10px 30px rgba(0,0,0,0.2); 
        } 
    }
`;
