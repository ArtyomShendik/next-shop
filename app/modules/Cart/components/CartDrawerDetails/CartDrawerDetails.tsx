import { FC } from 'react';
import { useCartStore } from '@/app/store/useCartStore';
import styles from './CartDrawerDetails.module.css';
import { CartDrawerItem } from '../CartDrawerItem/CartDrawerItem';
import { OrderForm } from '@/app/modules/OrderForm/OrderForm';

interface CartDrawerDetailsProps {
  setIsOpen: (isOpen: boolean) => void;
}

export const CartDrawerDetails: FC<CartDrawerDetailsProps> = ({
  setIsOpen,
}) => {
  const { items } = useCartStore();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.cartDrawerDetails}>
      <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
        x
      </button>
      <h2 className={styles.cartDrawerDetailsTitle}>Корзина</h2>
      <div className={styles.info}>
        {items.length > 0 ? (
          <>
            <p className={styles.infoText}>Товаров в корзине: {items.length}</p>
            <p className={styles.infoText}>Общее количество: {totalItems}</p>
          </>
        ) : (
          <p className={styles.infoText}>Корзина пуста. Добавьте товар!</p>
        )}
      </div>
      <div className={styles.items}>
        {items.map((item) => (
          <CartDrawerItem
            key={item.id}
            id={item.id}
            quantity={item.quantity}
            price={item.price}
            name={item.name}
          />
        ))}
      </div>
      {items.length > 0 && (
        <>
          <p className={styles.infoText}>Общая стоимость: {totalPrice} ₽</p>
          <OrderForm />
        </>
      )}
    </div>
  );
};
