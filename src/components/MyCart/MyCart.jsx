import styles from './MyCart.module.css';
import React, { useEffect, useState } from 'react';
import { redirect } from 'react-router';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Box, Button } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import CartItem from '../CartItem/CartItem';
import PriceCard from '../UI/PriceCard/PriceCard';
import useCarts from '../../hooks/useCarts';
import { style } from '@mui/system';

export default function MyCart({ user }) {
  useEffect(() => {
    if (!user) {
      redirect('/');
    }
  }, [user]);

  // Get cart data
  const {
    cartsQuery: { isLoading, data: products },
  } = useCarts();

  const totalPrice = products
    ? products.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;

  // When page is loading, show loading animation
  if (isLoading)
    return (
      <div className={styles.skeleton}>
        <Box
          sx={{
            display: 'flex',
            marginTop: '50px',
          }}
        >
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={200}
            height={100}
          />
          <Box
            sx={{
              marginTop: '20px',
              marginLeft: '20px',
              width: '900px',
            }}
          >
            <Skeleton animation={false} />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
          <Skeleton animation="wave" variant="rectangular" />
        </Box>
      </div>
    );

  return (
    <section className={styles.carts}>
      <header>
        <p className={styles.title}> My cart</p>
      </header>
      <div className={styles.container}>
        {' '}
        <div className={styles.cartContainer}>
          <div className={styles.infoList}>
            <em className={styles.product}>Product</em>
            <em className={styles.price}>Price</em>
            <em className={styles.quantity}>Quantity</em>
            <em className={styles.subtotal}>Subtotal</em>
          </div>
          <ul>
            {products && products.length === 0 && <p>No item in your cart😢</p>}
            {products &&
              products.map((product) => {
                return (
                  <li className={styles.productContainer} key={product.id}>
                    <CartItem product={product ? product : null}></CartItem>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className={styles.totalContainer}>
          <div className={styles.summaryTop}>
            <h4>Order Summary</h4>
            <ul>
              {products &&
                products.map((product) => {
                  return (
                    <li key={product.id}>
                      <em>{product.title}</em>
                      <em className={styles.summaryPrice}>
                        ${product.price * product.quantity}
                      </em>
                    </li>
                  );
                })}
            </ul>
          </div>
          <Button
            variant="contained"
            fullWidth
            sx={{ marginBottom: 1, marginTop: 1 }}
          >
            PROCEED TO CHECKOUT
          </Button>
        </div>
      </div>
    </section>
  );
}
