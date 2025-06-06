import { FC } from 'react';
import { IconTrash } from '@/app/components/IconTrash';
import styles from './CartDrawerItem.module.css';
import { useCartStore } from '@/app/store/useCartStore';

interface CartDrawerItemProps {
  id: number;
  quantity: number;
  price: number;
  name: string;
}

export const CartDrawerItem: FC<CartDrawerItemProps> = ({
  id,
  quantity,
  price,
  name,
}) => {
  const { removeItem } = useCartStore();

  return (
    <div className={styles.productItem}>
      <div>
        <h3>{name}</h3>
        <p className={styles.price}>{price} ₽</p>
      </div>
      <div>
        <p>{quantity}</p>
        <button className={styles.trashButton} onClick={() => removeItem(id)}>
          <IconTrash />
        </button>
      </div>
    </div>
  );
};
