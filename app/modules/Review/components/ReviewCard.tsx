import { FC } from 'react';
import DOMPurify from 'dompurify';
import { Review } from '../types';
import styles from './ReviewCard.module.css';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
  const sanitizedHtml = DOMPurify.sanitize(review.text);

  return (
    <div className={styles.card}>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    </div>
  );
};
