import React from 'react';
import Item from '../Item/Item.jsx';
import styles from './ItemList.module.css';

function ItemList({ products }) {
  return (
    <section className={styles.itemListContainer}>
      <ul className={styles.itemList}>
        {Object.keys(products).map((item) => {
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
