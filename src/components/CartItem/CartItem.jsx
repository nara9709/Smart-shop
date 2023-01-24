import React from 'react';
import styles from './CartItem.module.css';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

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
        </div>
      </div>

      <div className={styles.productPrice}>
        <em>${product.price}</em>
      </div>

      <div className={styles.buttonContainer}>
        <div>
          <IconButton
            color="default"
            onClick={() => {
              addOrUpdate.mutate({
                product: product,
                quantity: product.quantity + 1,
              });
            }}
          >
            <AddIcon fontSize="medium"></AddIcon>
          </IconButton>
          <em> {product.quantity}</em>
          <IconButton
            color="default"
            onClick={() => {
              addOrUpdate.mutate({
                product: product,
                quantity: product.quantity === 1 ? 1 : product.quantity - 1,
              });
            }}
          >
            <RemoveIcon fontSize="medium"></RemoveIcon>
          </IconButton>
        </div>
      </div>
      <div className={styles.subtotal}>
        <em>${product.price * product.quantity}</em>
        <IconButton
          color="error"
          onClick={() => {
            removeCartItem.mutate({ productId: product.id });
          }}
        >
          <DeleteForeverIcon
            fontSize="medium"
            className={styles.deleteButton}
          ></DeleteForeverIcon>
        </IconButton>
      </div>
    </>
  );
}

export default CartItem;
