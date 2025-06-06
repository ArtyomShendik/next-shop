'use client';

import { FC, useState, useEffect, useRef } from 'react';
import { useProductsQuery } from './hooks/useProductsQuery';
import { ProductCard } from './components/ProductCard/ProductCard';
import { ProductCardSkeleton } from './components/ProductCardSkeleton/ProductCardSkeleton';
import { useInView } from 'react-intersection-observer';
import styles from './Products.module.css';
import { Product } from './types';
import { Loader } from '@/app/components/Loader';

export const Products: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const { ref, inView } = useInView();
  const isLoadingRef = useRef(false);
  const { products, isLoading, error, total } = useProductsQuery(currentPage);

  useEffect(() => {
    if (products.length > 0) {
      setAllProducts((prev) => [...prev, ...products]);
      isLoadingRef.current = false;
    }
  }, [products]);

  useEffect(() => {
    if (
      inView &&
      !isLoading &&
      !isLoadingRef.current &&
      allProducts.length < total
    ) {
      isLoadingRef.current = true;
      setCurrentPage((prev) => prev + 1);
    }
  }, [inView, isLoading, allProducts.length, total]);

  if (error) return <div>Error: {error.message}</div>;

  if (isLoading) {
    return (
      <div className={styles.products}>
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.productsGrid}>
      {allProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <Loader ref={ref} isLoading={isLoading} />
    </div>
  );
};
