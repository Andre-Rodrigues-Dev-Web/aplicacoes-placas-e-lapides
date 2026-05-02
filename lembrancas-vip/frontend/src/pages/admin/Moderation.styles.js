import styled from 'styled-components';

export const ModerationGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
`;

export const ContentCard = styled.div`
    background: white;
    padding: 1.5rem;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
    border: 1px solid #E2E8F0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 15px rgba(0,0,0,0.05);
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
    }

    .type-icon {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        background: #F7FAFC;
        color: #718096;
    }

    .content {
        margin-bottom: 1.5rem;
        flex-grow: 1;

        h4 {
            color: #2D3748;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        p {
            color: #4A5568;
            font-size: 0.95rem;
            line-height: 1.5;
            font-style: italic;
            background: #fff;
            padding: 1rem;
            border-radius: 8px;
            border-left: 3px solid #E2E8F0;
        }

        .meta {
            margin-top: 1rem;
            font-size: 0.8rem;
            color: #A0AEC0;
        }
    }

    .actions {
        display: flex;
        gap: 10px;
        border-top: 1px solid #F1F5F9;
        padding-top: 1rem;

        button {
            flex: 1;
            padding: 8px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            transition: all 0.2s;
        }

        .btn-approve {
            background: #C6F6D5;
            color: #22543D;
            &:hover { background: #9AE6B4; }
        }

        .btn-reject {
            background: #FED7D7;
            color: #822727;
            &:hover { background: #FEB2B2; }
        }
    }
`;
