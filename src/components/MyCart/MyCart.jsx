import { useQuery, useQueryClient } from '@tanstack/react-query';
import styles from './MyCart.module.css';
import React, { useEffect, useState } from 'react';
import { redirect } from 'react-router';

import { useAuthContext } from '../context/AuthContext';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Button } from '@mui/material';
import {
  addOrUpdateToCart,
  getCart,
  removeFromCart,
} from '../../service/firebase';

export default function MyCart({ user }) {
  const userId = useAuthContext().uid;
  const queryClient = useQueryClient();
  const [delivery, setDelivery] = useState(10);

  useEffect(() => {
    if (!user) {
      redirect('/');
    }
  }, [user]);

  // Get cart data
  const { data: products } = useQuery(
    ['carts'],
    () => {
      getCart(userId);
    },
    {
      staleTime: 500000,
      refetchOnMount: false,
    }
  );

  // Add quantity from cart
  const addQuantity = (productId) => {
    products.map((product) => {
      if (product.id === productId) {
        const quantity = product.quantity + 1;
        const updatedProducts = { ...product, quantity };
        addOrUpdateToCart(userId, updatedProducts);
      }
      return {};
    });

    // Refetch cart items
    queryClient.invalidateQueries(['carts']);
  };

  // Subtract quantity from cart
  const subtractQuantity = (productId) => {
    products.map((product) => {
      if (product.id === productId) {
        if (product.quantity === 1) {
          return removeCartItem(productId);
        }

        const quantity = product.quantity - 1;
        const updatedProducts = { ...product, quantity };
        addOrUpdateToCart(userId, updatedProducts);
      }
      return {};
    });

    // Refetch cart items
    queryClient.invalidateQueries(['carts']);
  };

  // Remove item from cart
  const removeCartItem = (productId) => {
    removeFromCart(userId, productId);

    // Refetch cart items
    queryClient.invalidateQueries(['carts']);
  };

  return (
    <section className={styles.carts}>
      <p className={styles.title}> My cart</p>
      <ul>
        {products && products.length === 0 && <p>No item in your cart😢</p>}
        {products &&
          products.map((product) => {
            return (
              <li className={styles.productContainer}>
                <div className={styles.productInfoContainer}>
                  <img
                    className={styles.image}
                    src={product.image}
                    alt={product.title}
                  />
                  <div className={styles.titleContainer}>
                    <p className={styles.productTitle}>{product.title}</p>
                    <p className={styles.productOption}>{product.option}</p>
                    <p className={styles.productPrice}>${product.price}</p>
                  </div>
                </div>

                <div className={styles.buttonContainer}>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      addQuantity(product.id);
                    }}
                  >
                    <AddCircleOutlineIcon fontSize="large"></AddCircleOutlineIcon>
                  </IconButton>
                  {product.quantity}
                  <IconButton
                    color="primary"
                    onClick={() => {
                      subtractQuantity(product.id);
                    }}
                  >
                    <RemoveCircleOutlineIcon fontSize="large"></RemoveCircleOutlineIcon>
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      removeCartItem(product.id);
                    }}
                  >
                    <DeleteForeverIcon fontSize="medium"></DeleteForeverIcon>
                  </IconButton>
                </div>
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
