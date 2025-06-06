import { FC } from 'react';
import styles from './ProductCardSkeleton.module.css';

export const ProductCardSkeleton: FC = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.image} />
      <div className={styles.content}>
        <div className={styles.title} />
        <div className={styles.description} />
        <div className={styles.price} />
        <div className={styles.button} />
      </div>
    </div>
  );
};
