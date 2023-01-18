import { useQuery } from '@tanstack/react-query';
import styles from './MyCart.module.css';
import React, { useEffect, useState } from 'react';
import { redirect } from 'react-router';
import { getCartItems } from '../../service/firebase';
import { useAuthContext } from '../context/AuthContext';
import { Button, Icon } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function MyCart({ user }) {
  const userId = useAuthContext().uid;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!user) {
      redirect('/');
    }
  }, [user]);

  const {
    isLoading,
    error,
    refetch,
    data: carts,
  } = useQuery(
    ['cart'],
    () => {
      getCartItems(userId);
    },
    {
      staleTime: 500000,
      refetchOnMount: false,
    }
  );

  // Get data again when page is load
  useEffect(() => {
    refetch();
  }, []);

  console.log(carts);

  return (
    <section className={styles.carts}>
      <p className={styles.title}> My cart</p>
      <ul>
        {carts &&
          carts.map((options) => {
            return (
              <div>
                {Object.values(options).map((product) => {
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
                          <p className={styles.productOption}>
                            {product.option}
                          </p>
                          <p className={styles.productPrice}>
                            ${product.price}
                          </p>
                        </div>
                      </div>

                      <div className={styles.buttonContainer}>
                        <IconButton color="primary">
                          <AddCircleOutlineIcon fontSize="large"></AddCircleOutlineIcon>
                        </IconButton>
                        {product.count}
                        <IconButton color="primary">
                          <RemoveCircleOutlineIcon fontSize="large"></RemoveCircleOutlineIcon>
                        </IconButton>
                        <IconButton color="error">
                          <DeleteForeverIcon fontSize="medium"></DeleteForeverIcon>
                        </IconButton>
                      </div>
                    </li>
                  );
                })}
              </div>
            );
          })}
      </ul>

      <div>
        <span>
          <span>Total</span>
          {total}
        </span>
      </div>
    </section>
  );
}
