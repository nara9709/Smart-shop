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

export default function MyCart({ user }) {
  const [delivery, setDelivery] = useState(10);
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
    );

  return (
    <section className={styles.carts}>
      <p className={styles.title}> My cart</p>
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

      <div className={styles.totalContainer}>
        <PriceCard text="Item Total" price={totalPrice}></PriceCard>
        <AddCircleOutlineIcon color="primary" />
        <PriceCard text="Delivery" price={delivery}></PriceCard>
        <DragHandleIcon color="primary" />
        <PriceCard text="Total" price={totalPrice + delivery}></PriceCard>
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
