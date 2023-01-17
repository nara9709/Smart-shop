import React from 'react';
import styles from './Item.module.css';

function Item({ product: { id, image, title, category, price } }) {
  return (
    <>
      <img className={styles.image} src={image} alt={title} />
      <div className={styles.infoBox}>
        <span>
          <p>
            {title}
            <p>{category}</p>
          </p>
        </span>
        <span className={styles.price}> ${price}</span>
      </div>
    </>
  );
}

export default Item;
