import React from 'react';
import styles from './CartItem.module.css';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import useCarts from '../../hooks/useCarts';

function CartItem({ product }) {
  const { addOrUpdate, removeCartItem } = useCarts();

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
            addOrUpdate.mutate({
              product: product,
              quantity: product.quantity + 1,
            });
          }}
        >
          <AddCircleOutlineIcon fontSize="large"></AddCircleOutlineIcon>
        </IconButton>
        {product.quantity}
        <IconButton
          color="primary"
          onClick={() => {
            addOrUpdate.mutate({
              product: product,
              quantity: product.quantity === 1 ? 1 : product.quantity - 1,
            });
          }}
        >
          <RemoveCircleOutlineIcon fontSize="large"></RemoveCircleOutlineIcon>
        </IconButton>
        <IconButton
          color="error"
          onClick={() => {
            removeCartItem.mutate({ productId: product.id });
          }}
        >
          <DeleteForeverIcon fontSize="medium"></DeleteForeverIcon>
        </IconButton>
      </div>
    </>
  );
}

export default CartItem;
