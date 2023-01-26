import { Alert, Button } from '@mui/material';
import React, { useState } from 'react';
import useReview from '../../hooks/useReview';
import { useAuthContext } from '../context/AuthContext';
import styles from './Reviews.module.css';

import ReviewForm from '../ReviewForm/ReviewForm';

function Reviews({ productId }) {
  const [openReviewForm, setOpenReviewForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useAuthContext();
  const {
    reviewsQuery: { isLoaindg, error, data: reviews },
  } = useReview();

  return (
    <section>
      <h1>Ratings and Reviews</h1>
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
