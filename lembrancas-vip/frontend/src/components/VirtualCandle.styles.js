import styled, { keyframes } from 'styled-components';

export const flicker = keyframes`
    0%   { transform: rotate(-1deg); opacity: 0.8; }
    25%  { transform: rotate(1deg); opacity: 0.9; }
    50%  { transform: rotate(-1deg); opacity: 1; }
    75%  { transform: rotate(2deg); opacity: 0.9; }
    100% { transform: rotate(-1deg); opacity: 0.8; }
`;

export const floatUp = keyframes`
    0% { opacity: 0; transform: translateY(10px); }
    10% { opacity: 1; }
    100% { opacity: 0; transform: translateY(-30px); }
`;

export const CandleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    padding: 1.5rem;
    border-radius: ${({ theme }) => theme.radius.large};
    box-shadow: 0 4px 15px rgba(0,0,0,0.02);
    text-align: center;
`;

export const CandleIconWrapper = styled.div`
    font-size: 3rem;
    color: #ED8936;
    margin-bottom: 0.5rem;
    position: relative;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }

    svg {
        animation: ${flicker} 2s infinite alternate;
        filter: drop-shadow(0 0 10px rgba(237, 137, 54, 0.6));
    }
    
    .floating-text {
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.8rem;
        color: #DD6B20;
        font-weight: bold;
        animation: ${floatUp} 2s forwards;
        pointer-events: none;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
    margin-top: 1rem;
`;

export const Input = styled.input`
    padding: 0.8rem;
    border: 1px solid #E2E8F0;
    border-radius: 4px;
    font-size: 0.9rem;
    background: #fff;
    &:focus { outline: none; border-color: #ED8936; }
`;

export const Button = styled.button`
    background: #ED8936;
    color: white;
    padding: 0.8rem;
    border-radius: 4px;
    font-weight: bold;
    font-size: 0.9rem;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.9;
    }
    
    &:disabled {
        background: #CBD5E0;
        cursor: not-allowed;
    }
`;
