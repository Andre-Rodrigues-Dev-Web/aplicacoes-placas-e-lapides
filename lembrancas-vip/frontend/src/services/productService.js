import api from '../api/axios';

const BASE_URL = 'http://localhost/www/aplicacoes-placas-e-lapides/lembrancas-vip/backend';

export const getImageUrl = (url) => {
    // Imagem de fallback oficial do site (pode ser trocada por uma específica de "produto sem foto")
    const DEFAULT_FALLBACK = '/porcelain_plaque_memorial_1777705081872.png';

    if (!url) return DEFAULT_FALLBACK;
    const trimmedUrl = url.trim();
    
    // Se for um link do Unsplash quebrado ou placeholder genérico
    if (trimmedUrl.includes('unsplash.com') || trimmedUrl.includes('placeholder')) {
        // Usar uma imagem de natureza serena como fallback para memoriais
        return 'https://images.unsplash.com/photo-1520121401995-928cd50d4e27?q=80&w=800&auto=format&fit=crop';
    }
    
    if (trimmedUrl.startsWith('http')) return trimmedUrl;
    
    // Se não começa com uploads/ nem com /, adiciona uploads/
    if (!trimmedUrl.startsWith('uploads/') && !trimmedUrl.startsWith('/')) {
        return `${BASE_URL}/uploads/${trimmedUrl}`;
    }
    
    return `${BASE_URL}/${trimmedUrl.startsWith('/') ? trimmedUrl.slice(1) : trimmedUrl}`;
};

export const productService = {
    getAll: async () => {
        try {
            const response = await api.get('/products');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            throw error;
        }
    },

    getBySlug: async (slug) => {
        try {
            const response = await api.get(`/products/${slug}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar produto ${slug}:`, error);
            throw error;
        }
    },

    getFeatured: async () => {
        try {
            const response = await api.get('/products?featured=true');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar produtos em destaque:', error);
            return []; // Fallback para não quebrar a UI
        }
    }
};

export const testimonialService = {
    getAll: async () => {
        try {
            const response = await api.get('/testimonials');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar depoimentos:', error);
            return [];
        }
    }
};
