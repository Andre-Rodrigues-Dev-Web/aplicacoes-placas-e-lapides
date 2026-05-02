import styled from 'styled-components';

export const TimelineContainer = styled.div`
    position: relative;
    max-width: 800px;
    margin: 3rem auto;
    padding: 2rem 0;

    &::after {
        content: '';
        position: absolute;
        width: 2px;
        background: ${({ theme }) => theme.gradients.primary};
        top: 0;
        bottom: 0;
        left: 50%;
        margin-left: -1px;

        @media (max-width: 768px) {
            left: 20px;
        }
    }
`;

export const TimelineItem = styled.div`
    padding: 10px 40px;
    position: relative;
    background: inherit;
    width: 50%;
    box-sizing: border-box;

    &:nth-child(odd) {
        left: 0;
    }

    &:nth-child(even) {
        left: 50%;
    }

    @media (max-width: 768px) {
        width: 100%;
        padding-left: 60px;
        padding-right: 20px;
        
        &:nth-child(even) {
            left: 0%;
        }
    }

    &::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        right: -8px;
        background-color: white;
        border: 4px solid #D4AF37;
        top: 24px;
        border-radius: 50%;
        z-index: 1;

        @media (max-width: 768px) {
            left: 12px;
        }
    }

    &:nth-child(even)::after {
        left: -8px;
        
        @media (max-width: 768px) {
            left: 12px;
        }
    }
`;

export const TimelineContent = styled.div`
    padding: 1.5rem;
    background: white;
    position: relative;
    border-radius: ${({ theme }) => theme.radius.large};
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    border: 1px solid #F1F5F9;
    transition: transform 0.3s;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(212, 175, 55, 0.15);
    }
`;

export const YearBadge = styled.span`
    display: inline-block;
    padding: 0.2rem 0.8rem;
    background: #FEFCBF;
    color: #B7791F;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

export const EventTitle = styled.h4`
    color: ${({ theme }) => theme.colors.deepBlue};
    font-family: 'Nunito', sans-serif;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
`;

export const EventDescription = styled.p`
    color: ${({ theme }) => theme.colors.textGray};
    font-size: 0.95rem;
    line-height: 1.6;
`;
