'use client';

import { FC, useState } from 'react';
import { IconCart } from '@/app/components/IconCart';
import { CartDrawerDetails } from '../CartDrawerDetails/CartDrawerDetails';
import styles from './CartDrawer.module.css';

export const CartDrawer: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={handleOpen} className={styles.cartDrawerButton}>
        <IconCart />
      </button>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={handleClose}
      />
      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>
        <CartDrawerDetails setIsOpen={setIsOpen} />
      </div>
    </>
  );
};
