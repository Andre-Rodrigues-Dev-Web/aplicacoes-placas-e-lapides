import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

export const LoginContainer = styled.div`
    display: flex;
    min-height: 100vh;
    width: 100%;
    background: #F8FAFC;

    @media (max-width: 968px) {
        flex-direction: column;
    }
`;

export const FormSide = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    background: #F0F9FF; /* Light blueish tint like the image */
    position: relative;
    z-index: 10;

    @media (max-width: 968px) {
        padding: 2rem;
        min-height: 100vh;
    }
`;

export const FormCard = styled.div`
    background: white;
    width: 100%;
    max-width: 480px;
    padding: 4rem;
    border-radius: 40px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
    text-align: center;
    animation: ${fadeIn} 0.8s ease-out;

    @media (max-width: 480px) {
        padding: 2.5rem;
    }
`;

export const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 3rem;

    img {
        height: 35px;
    }

    span {
        font-size: 1.5rem;
        font-weight: 800;
        color: #1E40AF;
        letter-spacing: -0.5px;
        text-transform: uppercase;
    }
`;

export const FormTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 800;
    color: #1E293B;
    margin-bottom: 0.5rem;
`;

export const FormSubtitle = styled.p`
    font-size: 1rem;
    color: #64748B;
    margin-bottom: 3rem;
    line-height: 1.5;
`;

export const InputGroup = styled.div`
    text-align: left;
    margin-bottom: 1.5rem;

    label {
        display: block;
        font-size: 0.9rem;
        font-weight: 700;
        color: #1E293B;
        margin-bottom: 10px;
    }

    input {
        width: 100%;
        padding: 1.2rem 1.5rem;
        border-radius: 15px;
        border: 1px solid #E2E8F0;
        background: #FFFFFF;
        font-size: 1rem;
        transition: all 0.3s;
        outline: none;

        &:focus {
            border-color: #3B82F6;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
    }
`;

export const FormOptions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.5rem;
    font-size: 0.9rem;

    .checkbox-group {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #475569;
        font-weight: 600;
        cursor: pointer;
    }

    .forgot-link {
        color: radial-gradient(circle at top right, #3a8cbe 0%, #086fae 100%);
        text-decoration: none;
        font-weight: 700;
        &:hover { text-decoration: underline; }
    }
`;

export const LoginButton = styled.button`
    ${({ theme }) => theme.mixins.glassButton}
    width: 100%;
    padding: 1.3rem;
    font-size: 1.1rem;
    border-radius: 15px;
`;

export const FormFooter = styled.p`
    margin-top: 2.5rem;
    font-size: 0.85rem;
    color: #94A3B8;
    line-height: 1.6;
`;

export const VisualSide = styled.div`
    flex: 1.2;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 6rem;
    color: white;
    overflow: hidden;

    @media (max-width: 968px) {
        display: none;
    }
`;

export const VideoBG = styled.video`
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    z-index: 1;
`;

export const Overlay = styled.div`
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.2));
    z-index: 2;
`;

export const VisualContent = styled.div`
    position: relative;
    z-index: 10;
    max-width: 600px;
    animation: ${fadeIn} 1s ease-out;

    h2 {
        font-size: 3rem;
        font-weight: 800;
        margin-bottom: 1.5rem;
        letter-spacing: -1px;
    }

    p {
        font-size: 1.2rem;
        opacity: 0.9;
        margin-bottom: 4rem;
        line-height: 1.6;
    }
`;

export const FeatureList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 4rem;
`;

export const FeatureCard = styled.div`
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    padding: 1.8rem;
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    gap: 1.5rem;
    transition: all 0.3s;

    &:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: translateX(10px);
    }

    .icon-box {
        width: 50px;
        height: 50px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.4rem;
    }

    .text {
        h4 { font-size: 1.15rem; font-weight: 800; margin-bottom: 4px; }
        p { font-size: 0.95rem; opacity: 0.8; margin-bottom: 0; }
    }
`;

export const ActionWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 3rem;

    .site-btn {
        background: radial-gradient(circle at top right, #3a8cbe 0%, #086fae 100%);
        color: white;
        padding: 1rem 2.5rem;
        border-radius: 12px;
        font-weight: 800;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-size: 0.9rem;
        transition: all 0.3s;
        &:hover { background: #1E40AF; transform: translateY(-2px); }
    }

    .social-links {
        display: flex;
        gap: 1rem;
        a {
            width: 40px; height: 40px;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            color: white; text-decoration: none; transition: all 0.3s;
            &:hover { background: radial-gradient(circle at top right, #3a8cbe 0%, #086fae 100%); transform: scale(1.1); }
        }
    }
`;

export const ErrorMsg = styled.div`
    background: #FEE2E2;
    color: #B91C1C;
    padding: 1rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    font-size: 0.9rem;
    font-weight: 600;
    border: 1px solid #FECACA;
`;
