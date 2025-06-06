import { FC } from 'react';
import styles from './ProductCardImage.module.css';

interface ProductCardImageProps {
  image_url: string;
  title: string;
}

export const ProductCardImage: FC<ProductCardImageProps> = ({
  image_url,
  title,
}) => {
  return (
    <div className={styles.imageContainer}>
      <img src={image_url} alt={title} className={styles.image} />
    </div>
  );
};
