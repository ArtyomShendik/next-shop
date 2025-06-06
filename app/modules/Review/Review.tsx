'use client';

import { FC } from 'react';
import { ReviewCard } from './components/ReviewCard';
import { useReviewsQuery } from './hooks/useReviewsQuery';

interface ReviewGalleryProps {
  className?: string;
}

export const Reviews: FC<ReviewGalleryProps> = ({ className }) => {
  const { reviews, isLoading, error } = useReviewsQuery();

  if (isLoading) return null;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={className}>
      {reviews &&
        reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
    </div>
  );
};
