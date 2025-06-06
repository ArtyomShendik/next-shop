// import Cart from './components/Cart';
import { Reviews } from './modules/Review/Review';
import { Products } from './modules/Product/Products';
import styles from './page.module.css';
import { Cart } from './modules/Cart/Cart';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Основной контент */}
          <div>
            {/* Секция отзывов */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Отзывы</h2>
              <Reviews className={styles.reviewsGrid} />
            </section>
            {/* Секция товаров */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Товары</h2>
              <div className={styles.productsGrid}>
                <Products />
              </div>
            </section>
          </div>
          {/* Боковая панель с корзиной */}
          {/* <div className={styles.cartContainer}>
            <Cart />
          </div> */}
        </div>
        <div className={styles.cartContainer}>
          <Cart />
        </div>
      </div>
    </main>
  );
}
