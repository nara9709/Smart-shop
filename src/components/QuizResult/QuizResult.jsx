import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Button } from '@mui/material';
import styles from './QuizResult.module.css';
import { useAuthContext } from '../context/AuthContext';
import { updateSkinType } from '../../service/firebase';

function QuizResult() {
  let type = useLocation().state.type;
  const product = useLocation().state.product;
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const updateUserSkinType = () => {
    if (type === 'Slightly Dry') {
      type = 'Dry';
    }
    updateSkinType(type, user.uid);
  };

  // If there is user info, update skin type
  user && updateUserSkinType();

  return (
    <section className={styles.section}>
      {!product && <p>We are analyzing your skin type..✍🏻 </p>}
      {product && (
        <>
          <h1>
            ✨Recommendation for <span className={styles.type}>{type} </span>
            Type✨
          </h1>
          <div className={styles.productContainer}>
            <div className={styles.upperSide}>
              <span
                className={styles.imageContainer}
                onClick={() => {
                  navigate('/');
                }}
              >
                <img
                  className={styles.user}
                  src="https://res.cloudinary.com/nara9709/image/upload/v1674333405/kalos-skincare-kzjH8CCWAD0-unsplash_-_%ED%8E%B8%EC%A7%91%ED%95%A8_1_ugqnss.png"
                  alt="user"
                />
              </span>
              <span className={styles.title}> {product.title}</span>
            </div>
            <img
              className={styles.image}
              src={product.image}
              alt="productImage"
              onClick={() => {
                navigate(`/products/${product.id}`, {
                  state: { product },
                });
              }}
            />
            <div className={styles.description}>
              <strong> "{product.title}" </strong> is an incredibly helpful
              product for individuals with <strong>{type} skin type</strong>. If
              you are interested, I invite you to visit the product page and
              <strong> click on the image </strong>to learn more about its
              benefits and features.
            </div>
          </div>

          <Button
            onClick={() => {
              navigate('/myskintypetest');
            }}
            className={styles.retryBtn}
            variant="contained"
          >
            Retry Test
          </Button>
        </>
      )}
    </section>
  );
}

export default QuizResult;
