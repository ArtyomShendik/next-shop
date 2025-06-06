import { FC, useState, useEffect } from 'react';
import { Product } from '../../types';
import { useCartStore } from '@/app/store/useCartStore';
import { ProductCardControls } from '../ProductCardControls/ProductCardControls';
import { ProductCardImage } from '../ProductCardImage/ProductCardImage';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { items, addItem, updateItem, removeItem } = useCartStore();
  const cartItem = items.find((item) => item.id === product.id);
  const [quantity, setQuantity] = useState(cartItem?.quantity || 0);
  const [isInCart, setIsInCart] = useState(quantity > 0);

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
      setIsInCart(true);
    } else {
      setQuantity(0);
      setIsInCart(false);
    }
  }, [cartItem]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      if (newQuantity === 0) {
        removeItem(product.id);
        setIsInCart(false);
      } else {
        updateItem(product.id, newQuantity, product.price * newQuantity);
      }
    }
  };

  const handleBuyClick = () => {
    setIsInCart(true);
    setQuantity(1);
    addItem({
      id: product.id,
      quantity: 1,
      price: product.price,
      name: product.title,
    });
  };

  return (
    <div className={styles.card}>
      <ProductCardImage image_url={product.image_url} title={product.title} />
      <h3 className={styles.title}>{product.title}</h3>
      <p className={styles.description}>{product.description}</p>
      <div className={styles.price}>
        {product.price} ₽ {quantity > 1 && `/ ${product.price * quantity} ₽`}
      </div>
      {!isInCart ? (
        <button onClick={handleBuyClick} className={styles.buyButton}>
          Купить
        </button>
      ) : (
        <ProductCardControls
          handleQuantityChange={handleQuantityChange}
          quantity={quantity}
        />
      )}
    </div>
  );
};
