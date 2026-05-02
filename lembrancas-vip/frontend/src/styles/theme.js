export const theme = {
    colors: {
        // Brand Colors
        primary: '#086fae',
        primaryLight: '#3a8cbe',
        primaryDark: '#065181',
        
        secondary: '#0F172A',
        accent: '#25D366', // WhatsApp Green
        
        // Neutral Palette
        white: '#FFFFFF',
        gray: {
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
            600: '#475569',
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A',
        },
        
        // Semantic Colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',

        // Theme Specific
        deepBlue: '#062B3F',
        lightBlue: '#E8F6FC',
        textGray: '#5D6B76',
        softBlack: '#101820'
    },
    
    gradients: {
        primary: 'radial-gradient(circle at top right, #3a8cbe 0%, #086fae 100%)',
        dark: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    },
    
    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        premium: '0 25px 50px -12px rgba(0, 0, 0, 0.12)',
        button: '0 10px 25px rgba(37, 99, 235, 0.2)',
        buttonHover: '0 15px 30px rgba(37, 99, 235, 0.3)'
    },
    
    radius: {
        none: '0',
        sm: '8px',
        md: '12px',
        lg: '24px',
        xl: '32px',
        full: '9999px',
    },
    
    transitions: {
        default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fast: 'all 0.15s ease-in-out',
        slow: 'all 0.5s ease-in-out',
    },

    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
    },
    
    mixins: {
        glassButton: `
            background: radial-gradient(circle at top right, #3a8cbe 0%, #086fae 100%);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 12px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 10px 25px rgba(8, 111, 174, 0.2);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 15px 30px rgba(8, 111, 174, 0.3);
                background: radial-gradient(circle at top right, #4a9cce 0%, #0a7fbe 100%);
            }

            &:disabled {
                opacity: 0.6;
                cursor: not-allowed;
                transform: none;
            }
        `
    }
};
