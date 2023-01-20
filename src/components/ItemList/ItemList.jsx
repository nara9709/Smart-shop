import { Paper, Skeleton, Stack } from '@mui/material';
import React from 'react';
import useProducts from '../../hooks/useProducts.jsx';
import Item from '../Item/Item.jsx';
import styles from './ItemList.module.css';

function ItemList() {
  //Get product data using custom hook
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  return (
    <section className={styles.itemListContainer}>
      {isLoading && (
        <Stack spacing={1}>
          <Skeleton
            variant="rectangular"
            width={300}
            height={300}
            animation="wave"
          />
          <Skeleton
            variant="rounded"
            width={210}
            height={60}
            animation="wave"
          />
        </Stack>
      )}
      {error && <p>{error}</p>}
      <ul className={styles.itemList}>
        {products &&
          Object.keys(products).map((item) => {
            return (
              <li key={item}>
                <Paper className={styles.item} elevation={2}>
                  <Item product={products[item]} />
                </Paper>
              </li>
            );
          })}
      </ul>
    </section>
  );
}

export default ItemList;
