import { forwardRef } from 'react';
import styles from './Loader.module.css';

interface LoaderProps {
  isLoading: boolean;
}

export const Loader = forwardRef<HTMLDivElement, LoaderProps>(
  ({ isLoading }, ref) => {
    return (
      <div ref={ref} className={styles.loader}>
        {isLoading && <div className={styles.spinner} />}
      </div>
    );
  }
);

Loader.displayName = 'Loader';
