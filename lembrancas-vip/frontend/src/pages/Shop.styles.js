import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

export const ShopContainer = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    padding: 3rem 20px 6rem;
    background: radial-gradient(circle at top right, rgba(8, 111, 174, 0.03) 0%, transparent 40%);
`;

export const ShopContent = styled.div`
    display: flex;
    gap: 3rem;
    margin-top: 2rem;

    @media (max-width: ${props => props.theme.breakpoints.lg}) {
        flex-direction: column;
        gap: 2rem;
    }
`;

export const Sidebar = styled.aside`
    flex: 0 0 280px;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    @media (max-width: ${props => props.theme.breakpoints.lg}) {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
`;

export const MainContent = styled.main`
    flex: 1;
`;

export const FilterGroup = styled.div`
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
    padding: 1.8rem;
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0 10px 30px rgba(0,0,0,0.02);
    transition: all 0.3s ease;

    &:hover {
        background: white;
        box-shadow: 0 15px 35px rgba(0,0,0,0.05);
        border-color: rgba(8, 111, 174, 0.1);
    }

    h4 {
        font-size: 0.9rem;
        color: #062B3F;
        margin-bottom: 1.5rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        display: flex;
        align-items: center;
        gap: 12px;
        opacity: 0.8;
    }
`;

export const FilterList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

export const FilterItem = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 50px;
    color: #4A5568;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    user-select: none;

    input {
        display: none; /* Esconder o radio button nativo */
    }

    &:hover {
        background: rgba(8, 111, 174, 0.05);
        border-color: #086fae;
        color: #086fae;
        transform: translateY(-2px);
    }

    &.active {
        background: #086fae;
        border-color: #086fae;
        color: white;
        box-shadow: 0 4px 10px rgba(8, 111, 174, 0.2);
    }
`;

export const PriceRange = styled.div`
    margin-top: 1rem;
    
    .range-inputs {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 1.5rem;

        input {
            width: 100%;
            padding: 10px 12px;
            border-radius: 12px;
            border: 1px solid #E2E8F0;
            font-size: 0.9rem;
            color: #1E293B;
            font-weight: 600;
            background: white;
            transition: all 0.2s;

            &:focus {
                border-color: #086fae;
                box-shadow: 0 0 0 4px rgba(8, 111, 174, 0.1);
                outline: none;
            }
        }
    }

    input[type='range'] {
        -webkit-appearance: none;
        width: 100%;
        height: 6px;
        background: #E2E8F0;
        border-radius: 5px;
        outline: none;
        margin-top: 1.5rem;

        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 20px;
            height: 20px;
            background: #086fae;
            border-radius: 50%;
            cursor: pointer;
            border: 3px solid white;
            box-shadow: 0 2px 10px rgba(8, 111, 174, 0.3);
            transition: all 0.2s;

            &:hover {
                transform: scale(1.1);
                background: #3a8cbe;
            }
        }
    }
`;

export const SortSelect = styled.select`
    width: 100%;
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid #E2E8F0;
    color: #1E293B;
    font-size: 0.95rem;
    font-weight: 600;
    outline: none;
    background-color: #F8FAFC;
    cursor: pointer;
    transition: all 0.3s ease;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234A5568' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1em;

    &:focus {
        border-color: #086fae;
        box-shadow: 0 0 0 4px rgba(8, 111, 174, 0.1);
        background-color: white;
    }

    &:hover {
        border-color: #CBD5E1;
    }
`;

export const ShopHeader = styled.div`
    text-align: center;
    margin-bottom: 5rem;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: -50px;
        left: 50%;
        transform: translateX(-50%);
        width: 150px;
        height: 150px;
        background: radial-gradient(circle, rgba(8, 111, 174, 0.1) 0%, transparent 70%);
        z-index: -1;
    }
    
    h1 {
        font-size: 3.5rem;
        color: #062B3F;
        margin-bottom: 1.5rem;
        font-weight: 800;
        letter-spacing: -1px;
        line-height: 1.1;

        @media (max-width: ${props => props.theme.breakpoints.md}) {
            font-size: 2.5rem;
        }
    }
    
    p {
        font-size: 1.25rem;
        color: #64748B;
        max-width: 800px;
        margin: 0 auto;
        line-height: 1.6;

        @media (max-width: ${props => props.theme.breakpoints.md}) {
            font-size: 1.1rem;
            padding: 0 1rem;
        }
    }
`;

export const FilterSection = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
`;

export const FilterButton = styled.button`
    padding: 0.8rem 2rem;
    border-radius: 50px;
    border: 2px solid #E2E8F0;
    background: transparent;
    color: #4A5568;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        padding: 0.6rem 1.5rem;
        font-size: 0.9rem;
    }
    
    &.active {
        border-color: ${props => props.theme.colors.primary};
        background: ${props => props.theme.colors.primary};
        color: white;
    }
    
    &:hover:not(.active) {
        border-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.primary};
    }
`;

export const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2.5rem;

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
`;

export const ProductCard = styled.div`
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 28px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.8);
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    display: flex;
    flex-direction: column;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 28px;
        box-shadow: 0 20px 50px rgba(8, 111, 174, 0.1);
        opacity: 0;
        transition: opacity 0.4s ease;
        z-index: -1;
    }

    &:hover {
        transform: translateY(-12px);
        background: white;
        border-color: rgba(8, 111, 174, 0.2);
        
        &::after {
            opacity: 1;
        }
    }
`;

export const ProductImageWrapper = styled.div`
    position: relative;
    height: 250px;
    overflow: hidden;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }

    ${ProductCard}:hover & img {
        transform: scale(1.1);
    }
`;

export const ProductBadge = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    background: #086fae;
    color: white;
    padding: 6px 18px;
    border-radius: 50px;
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 4px 15px rgba(8, 111, 174, 0.3);
    z-index: 2;
`;

export const ProductInfo = styled.div`
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export const CategoryTag = styled.span`
    color: #3B82F6;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
`;

export const ProductName = styled.h3`
    font-size: 1.25rem;
    color: #1E293B;
    margin-bottom: 0.75rem;
    font-weight: 700;
    line-height: 1.3;
`;

export const ProductPrice = styled.div`
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1rem;
    border-top: 1px solid #F1F5F9;

    .price {
        font-size: 1.8rem;
        font-weight: 900;
        color: ${props => props.theme.colors.primary};
        display: block;
    }

    .label {
        font-size: 0.8rem;
        color: #64748B;
        font-weight: 600;
    }
`;

export const ActionButtons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 1.5rem;
`;

export const Button = styled.button`
    padding: 0.8rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: none;
`;

export const DetailsButton = styled(Link)`
    ${props => props.theme.mixins.glassButton}
    padding: 0.8rem;
    font-size: 0.85rem;
    text-decoration: none;
`;

export const WhatsAppButton = styled.a`
    background: #25D366;
    color: white;
    padding: 0.8rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.85rem;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    
    &:hover {
        background: #22C55E;
        box-shadow: 0 5px 15px rgba(34, 197, 94, 0.3);
        transform: translateY(-2px);
    }
`;

export const LoadingSpinner = styled.div`
    border: 4px solid #f3f3f3;
    border-top: 4px solid ${props => props.theme.colors.primary};
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: ${spin} 1s linear infinite;
    margin: 0 auto 1rem;
`;

export const EmptyState = styled.div`
    text-align: center;
    padding: 8rem 0;
    background: #F8FAFC;
    border-radius: 40px;
    border: 2px dashed #E2E8F0;
    margin-top: 2rem;

    svg {
        color: #CBD5E1;
        margin-bottom: 1.5rem;
        opacity: 0.8;
    }

    h3 {
        font-size: 1.5rem;
        color: #1E293B;
        margin-bottom: 0.5rem;
        font-weight: 800;
    }

    p {
        color: #64748B;
        font-size: 1.1rem;
    }
`;
