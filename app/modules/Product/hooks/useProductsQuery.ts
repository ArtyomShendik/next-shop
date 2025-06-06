import { useState, useEffect } from 'react';
import { Product } from '../types';

interface ApiResponse {
  page: number;
  amount: number;
  total: number;
  items: Product[];
}

export const useProductsQuery = (page: number) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://o-complex.com:1337/products?page=${page}&page_size=20`
        );
        const data: ApiResponse = await response.json();
        setProducts(data.items || []);
        setTotal(data.total);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  return { products, isLoading, error, total };
};
