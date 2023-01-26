import { Rating } from '@mui/material';
import React from 'react';
import styles from './Review.module.css';

function Review({
  review: { headline, comments, displayName, rating, id, skinType },
}) {
  return (
    <div className={styles.reviewBox}>
      <div className={styles.ratingBox}>
        <div className={styles.starBox}>
          <span className={styles.rating}>
            <Rating name="read-only" value={rating} readOnly />
          </span>
          <span className={styles.ratingNum}>{rating}</span>
        </div>
        <span className={styles.headline}>{headline}</span>
      </div>
      <div className={styles.commentBox}>
        <p className={styles.skinType}>
          <strong>SKIN TYPE:</strong> {skinType}
        </p>
        <p>{comments}</p>
        <p>
          <strong>By</strong> {displayName}
        </p>
      </div>
    </div>
  );
}

export default Review;
