import { useQuery } from '@tanstack/react-query';
import styles from './MyCart.module.css';
import React, { useEffect, useState } from 'react';
import { redirect } from 'react-router';

import { useAuthContext } from '../context/AuthContext';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Box, Button } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import { getCart } from '../../service/firebase';
import CartItem from '../CartItem/CartItem';

export default function MyCart({ user }) {
  const userId = useAuthContext().uid;
  const [delivery, setDelivery] = useState(10);

  useEffect(() => {
    if (!user) {
      redirect('/');
    }
  }, [user]);

  // Get cart data
  const { isLoading, data: products } = useQuery(
    ['carts'],
    () => {
      getCart(userId);
    },
    {
      staleTime: 500000,
      refetchOnMount: false,
    }
  );

  if (isLoading)
    return (
      <Box
        fullWidth
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
          <Skeleton animation={false} fullWidth />
          <Skeleton animation="wave" fullWidth />
          <Skeleton animation={false} fullWidth />
        </Box>
        <Skeleton animation="wave" variant="rectangular" />
      </Box>
    );

  return (
    <section className={styles.carts}>
      <p className={styles.title}> My cart</p>
      <ul>
        {products && products.length === 0 && <p>No item in your cart😢</p>}
        {products &&
          products.map((product) => {
            return (
              <li className={styles.productContainer}>
                <CartItem product={product} key={product.id}></CartItem>
              </li>
            );
          })}
      </ul>

      <div className={styles.totalContainer}>
        <div className={styles.itemTotal}>
          <span>Item Total</span>
          <span className={styles.number}>
            $
            {products
              ? products.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )
              : 0}
          </span>
        </div>
        <AddCircleOutlineIcon color="primary" />
        <div className={styles.itemTotal}>
          <span>Delivery</span>
          <span className={styles.number}>${products ? `${delivery}` : 0}</span>
        </div>
        <DragHandleIcon color="primary" />
        <div className={styles.itemTotal}>
          <span>Total</span>
          <span className={styles.number}>
            $
            {products &&
              delivery +
                products.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
          </span>
        </div>
      </div>
      <Button
        variant="contained"
        fullWidth
        sx={{ marginBottom: 10, marginTop: 5 }}
      >
        Order
      </Button>
    </section>
  );
}
