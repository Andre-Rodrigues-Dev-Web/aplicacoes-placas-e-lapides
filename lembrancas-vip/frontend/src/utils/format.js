/**
 * Formata um valor numérico para moeda brasileira (BRL)
 * @param {number} value - Valor a ser formatado
 * @returns {string} - Valor formatado (ex: R$ 1.250,00)
 */
export const formatCurrency = (value) => {
    if (typeof value !== 'number') {
        const parsed = parseFloat(value);
        if (isNaN(parsed)) return 'R$ 0,00';
        value = parsed;
    }
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

/**
 * Formata uma data para o padrão brasileiro
 * @param {string|Date} date - Data a ser formatada
 * @returns {string} - Data formatada (ex: 02/05/2026)
 */
export const formatDate = (date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
};

/**
 * Encurta um texto para um limite de caracteres
 * @param {string} text - Texto original
 * @param {number} limit - Limite de caracteres
 * @returns {string} - Texto encurtado com reticências
 */
export const truncateText = (text, limit = 100) => {
    if (!text || text.length <= limit) return text;
    return `${text.substring(0, limit)}...`;
};
