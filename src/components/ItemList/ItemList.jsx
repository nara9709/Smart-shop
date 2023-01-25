import { Skeleton, Stack } from '@mui/material';
import React from 'react';
import useProducts from '../../hooks/useProducts.jsx';
import Item from '../Item/Item.jsx';
import styles from './ItemList.module.css';

function ItemList({ category }) {
  //Get product data using custom hook
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  return (
    <section className={styles.itemListContainer}>
      {isLoading && (
        <div className={styles.skeleton}>
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
        </div>
      )}

      {/* Show If there is error */}
      {error && <p>{error}</p>}
      <ul className={styles.itemList}>
        {/* Show all category items */}
        {products &&
          category === 'all' &&
          Object.keys(products).map((item) => {
            return (
              <li className={styles.item} key={item}>
                <Item product={products[item]} />
              </li>
            );
          })}

        {/* Show selected category items */}
        {products &&
          category !== 'all' &&
          Object.keys(products)
            .filter((item) => products[item].category === category)
            .map((product) => {
              return (
                <li className={styles.item} key={products[product].id}>
                  <Item product={products[product]} />
                </li>
              );
            })}
      </ul>
    </section>
  );
}

export default ItemList;
