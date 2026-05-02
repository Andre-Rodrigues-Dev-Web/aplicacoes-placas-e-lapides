import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            const data = await productService.getAll();
            setProducts(data);
            setFilteredProducts(data);
            setError(null);
        } catch (err) {
            setError('Não foi possível carregar o catálogo de produtos.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const filterProducts = useCallback((filter) => {
        if (filter === 'Todos') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(p => 
                p.badge === filter || 
                p.category_name === filter ||
                (p.category && p.category.name === filter)
            );
            setFilteredProducts(filtered);
        }
    }, [products]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        filteredProducts,
        loading,
        error,
        filterProducts,
        refresh: fetchProducts
    };
};

export const useFeaturedProducts = (limit = 3) => {
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const data = await productService.getFeatured();
                setBestSellers(data.slice(0, limit));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, [limit]);

    return { bestSellers, loading };
};
