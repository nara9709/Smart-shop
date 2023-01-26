import { Alert, Button, Rating, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useReview from '../../hooks/useReview';
import { useAuthContext } from '../context/AuthContext';
import styles from './Reviews.module.css';

import ReviewForm from '../ReviewForm/ReviewForm';
import Review from '../Review/Review';
import { useQueryClient } from '@tanstack/react-query';

function Reviews({ productId }) {
  const [openReviewForm, setOpenReviewForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useAuthContext();
  const {
    reviewsQuery: { isLoading, error, data: reviews },
  } = useReview(productId);
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries(['reviews']);
  }, []);

  const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

  let averageRating =
    reviews &&
    average(
      reviews.map((item) => {
        return item.rating;
      })
    );

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Ratings and Reviews</h1>
      <div className={styles.startBox}>
        <span className={styles.star}>
          <Rating
            name="read-only"
            value={(averageRating !== null && averageRating) || 0}
            readOnly
          />
        </span>
        <span className={styles.starAverageNum}>
          {(averageRating !== null && averageRating) || 0}
        </span>
        <span className={styles.starAverageText}>
          Based on {(reviews && reviews.length) || 0} Reviews
        </span>
      </div>
      {user && (
        <Button
          variant="contained"
          onClick={() => {
            if (openReviewForm) {
              setOpenReviewForm(false);
            } else {
              setOpenReviewForm(true);
            }
          }}
        >
          {openReviewForm ? 'CANCLE' : 'WRITE A REVIEW'}
        </Button>
      )}

      {success && (
        <div className={styles.successBox}>
          <Alert severity="success">
            Your review has been successfully uploaded
          </Alert>
        </div>
      )}

      <h2 className={styles.subTitle}>
        Reviewed by {(reviews && reviews.length) || 0} customers
      </h2>

      {isLoading && (
        <div className={styles.skeleton}>
          <Skeleton variant="rectangular" height={60} animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </div>
      )}
      {error && <p>{error}</p>}
      <ul>
        {reviews &&
          reviews.map((review) => (
            <li key={review.id}>
              <Review review={review} />
            </li>
          ))}
      </ul>

      {openReviewForm && (
        <ReviewForm
          setOpenReviewForm={setOpenReviewForm}
          productId={productId}
          setSuccess={setSuccess}
        />
      )}
    </section>
  );
}

export default Reviews;
