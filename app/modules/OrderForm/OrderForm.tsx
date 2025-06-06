'use client';

import { CartItem, useCartStore } from '@/app/store/useCartStore';
import IMask from 'imask';
import { FC, useEffect, useRef, useState } from 'react';
import styles from './OrderForm.module.css';

export const OrderForm: FC = () => {
  const [phone, setPhone] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const maskRef = useRef<ReturnType<typeof IMask>>(null);
  const { items } = useCartStore();

  useEffect(() => {
    if (inputRef.current) {
      maskRef.current = IMask(inputRef.current, {
        mask: '+{7}(000)000-00-00',
      });

      maskRef.current.on('accept', () => {
        const formattedPhone = maskRef.current?.value || '';
        const cleanPhone = formattedPhone.replace(/\D/g, '');
        setPhone(cleanPhone);
        // Проверяем, что номер содержит 11 цифр (7 + 10 цифр номера)
        setIsPhoneValid(cleanPhone.length === 11);
      });
    }

    return () => {
      maskRef.current?.destroy();
    };
  }, []);

  const handleOrder = async (phone: string, items: CartItem[]) => {
    try {
      const response = await fetch('http://o-complex.com:1337/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, cart: items }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error);
      }

      useCartStore.getState().clearCart();
    } catch (error) {
      console.error('Order error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPhoneValid || items.length === 0 || phone.length !== 11) {
      setIsPhoneValid(false);
      return;
    }

    setIsLoading(true);
    try {
      await handleOrder(phone, items);
      setShowSuccess(true);
      setPhone('');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Order error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="phone-input" className={styles.label}>
            Номер телефона
          </label>
          <input
            ref={inputRef}
            id="phone-input"
            type="tel"
            className={`${styles.input} ${!isPhoneValid ? styles.error : ''}`}
            placeholder="+7(999)999-99-99"
          />
          {!isPhoneValid && (
            <p className={styles.errorText}>
              Введите корректный номер телефона
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading || items.length === 0}
          className={styles.submitButton}
        >
          {isLoading ? 'Отправка...' : 'Заказать'}
        </button>
      </form>
      {showSuccess && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Успешно!</h3>
            <p>Ваш заказ принят в обработку</p>
          </div>
        </div>
      )}
    </>
  );
};
