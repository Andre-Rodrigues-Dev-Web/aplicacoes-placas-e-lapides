import { useState, useEffect } from 'react';
import { testimonialService } from '../services/productService';

export const useTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const data = await testimonialService.getAll();
                if (data && data.length > 0) {
                    setTestimonials(data);
                } else {
                    // Fallback para dados estáticos se a API retornar vazio
                    setTestimonials([
                        { 
                            id: 1, 
                            initials: 'J', 
                            name: 'Janaina', 
                            location: 'Ibiporuna/MG',
                            text: 'Boa tarde, Tânia! Recebi a placa dos meus avós. Quanta perfeição! Detalhes e material excelente.', 
                            rating: 5 
                        },
                        { 
                            id: 2, 
                            initials: 'ME', 
                            name: 'Maria Eduarda', 
                            location: 'Arapiraca/AL',
                            text: 'Hoje recebi a minha encomenda, ficou maravilhosa, que lindo é o trabalho que vocês fazem.', 
                            rating: 5 
                        },
                        { 
                            id: 3, 
                            initials: 'C', 
                            name: 'Cíntia', 
                            location: 'Cordeiro/RJ',
                            text: 'Fiz o pedido de 2 placas de inox. Meu pedido chegou super rápido, material de qualidade.', 
                            rating: 5 
                        }
                    ]);
                }
            } catch (error) {
                console.error('Erro ao buscar depoimentos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    return { testimonials, loading };
};
