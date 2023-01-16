import React from 'react';
import styles from './Item.module.css';

function Item({ product }) {
  return (
    <>
      <img className={styles.image} src={product.image} alt={product.title} />
      <div className={styles.infoBox}>
        <span>
          <p>
            {product.title}
            <p>{product.category}</p>
          </p>
        </span>
        <span className={styles.price}> ${product.price}</span>
      </div>
    </>
  );
}

export default Item;
