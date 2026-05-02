import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost/www/aplicacoes-placas-e-lapides/lembrancas-vip/backend/index.php',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('@LembrancasVIP:token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
