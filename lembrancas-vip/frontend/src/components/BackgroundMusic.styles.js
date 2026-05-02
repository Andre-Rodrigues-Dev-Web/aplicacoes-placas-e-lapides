import styled from 'styled-components';

export const AudioControlPanel = styled.div`
    position: relative;
    margin-top: 1.5rem;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50px;
    padding: 0.5rem 1rem;
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: all 0.3s;
    border: 1px solid #E2E8F0;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0,0,0,0.15);
    }
`;

export const PlayButton = styled.button`
    background: ${({ theme }) => theme.gradients.primary};
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.2s;
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);

    &:hover {
        opacity: 0.9;
    }
`;

export const InfoText = styled.div`
    display: flex;
    flex-direction: column;

    span.title {
        font-size: 0.85rem;
        font-weight: bold;
        color: #2D3748;
    }

    span.subtitle {
        font-size: 0.7rem;
        color: #718096;
    }
`;
