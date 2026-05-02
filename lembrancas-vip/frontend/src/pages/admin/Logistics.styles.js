import styled from 'styled-components';

export const LogisticsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 2rem;
`;

export const LogisticsCard = styled.div`
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
    border: 1px solid #E2E8F0;
    display: grid;
    grid-template-columns: 2fr 1.5fr 1.5fr 1fr;
    align-items: center;
    gap: 1.5rem;
    transition: all 0.2s;

    &:hover {
        border-color: #00AEEF;
        box-shadow: 0 4px 12px rgba(0, 174, 239, 0.05);
    }

    @media (max-width: 1024px) {
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }

    .info {
        h4 { color: #2D3748; margin-bottom: 4px; }
        p { color: #718096; font-size: 0.85rem; }
    }

    .status-select {
        select {
            width: 100%;
            padding: 8px;
            border-radius: 8px;
            border: 1px solid #E2E8F0;
            background: #fff;
            font-size: 0.9rem;
        }
    }

    .tracking-input {
        display: flex;
        gap: 8px;
        input {
            flex: 1;
            padding: 8px;
            border-radius: 8px;
            border: 1px solid #E2E8F0;
            font-size: 0.85rem;
        }
    }

    .btn-save {
        background: #00AEEF;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: opacity 0.2s;

        &:hover { opacity: 0.9; }
        &:disabled { background: #CBD5E0; cursor: not-allowed; }
    }
`;
