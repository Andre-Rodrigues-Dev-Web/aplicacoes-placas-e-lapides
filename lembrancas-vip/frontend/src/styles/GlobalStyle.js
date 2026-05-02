import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Nunito', sans-serif;
        background-color: ${({ theme }) => theme.colors.lightGray};
        color: ${({ theme }) => theme.colors.softBlack};
        -webkit-font-smoothing: antialiased;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    button {
        cursor: pointer;
        border: none;
        outline: none;
        font-family: inherit;
    }

    /* Scrollbar Styles */
    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f5f9;
    }

    ::-webkit-scrollbar-thumb {
        background: radial-gradient(circle at top right, #3a8cbe 0%, #086fae 100%);
        border-radius: 10px;
        border: 2px solid #f1f5f9;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: radial-gradient(circle at top right, #4ba3d5 0%, #0a7fc5 100%);
    }
`;
