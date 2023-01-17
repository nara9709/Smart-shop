import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { getProductList } from '../../service/firebase.js';
import Item from '../Item/Item.jsx';
import styles from './ItemList.module.css';

function ItemList() {
  // Use useQuery to caching product data
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(['products'], () => getProductList(), {
    staleTime: 50000,
    refetchOnMount: false,
  });

  return (
    <section className={styles.itemListContainer}>
      {isLoading && (
        <div className={styles.loader_container}>
          <div className={styles.spinner}></div>
        </div>
      )}
      {error && <p>{error}</p>}
      <ul className={styles.itemList}>
        {products &&
          Object.keys(products).map((item) => {
            return (
              <li key={item} className={styles.item}>
                <Item product={products[item]} />
              </li>
            );
          })}
      </ul>
    </section>
  );
}

export default ItemList;
