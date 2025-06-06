import { FC } from 'react';
import styles from './ProductCardControls.module.css';
import { IconTrash } from '@/app/components/IconTrash';

interface ProductCardControlsProps {
  quantity: number;
  handleQuantityChange: (quantity: number) => void;
}

export const ProductCardControls: FC<ProductCardControlsProps> = ({
  handleQuantityChange,
  quantity,
}) => {
  return (
    <div className={styles.quantityControls}>
      <div>
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          className={styles.quantityButton}
        >
          -
        </button>

        <input
          type="number"
          min="0"
          value={quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 0)}
          className={styles.quantityInput}
        />

        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          className={styles.quantityButton}
        >
          +
        </button>
      </div>

      <div>
        {quantity >= 2 && (
          <button onClick={() => handleQuantityChange(0)}>
            <IconTrash />
          </button>
        )}
      </div>
    </div>
  );
};
