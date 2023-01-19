import React from 'react';
import styles from './CartItem.module.css';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { addOrUpdateToCart, removeFromCart } from '../../service/firebase';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';

function CartItem({ product }) {
  const queryClient = useQueryClient();
  const userId = useAuthContext().uid;

  // Add quantity from cart
  const addQuantity = (productId) => {
    const quantity = product.quantity + 1;

    addOrUpdateToCart(userId, { ...product, quantity });

    // Refetch cart items
    queryClient.invalidateQueries(['carts']);
  };

  // Subtract quantity from cart
  const subtractQuantity = (productId) => {
    if (product.quantity === 1) {
      return removeCartItem(productId);
    }

    const quantity = product.quantity - 1;

    addOrUpdateToCart(userId, { ...product, quantity });

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
    <>
      <div className={styles.productInfoContainer}>
        <img className={styles.image} src={product.image} alt={product.title} />
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
    </>
  );
}

export default CartItem;
