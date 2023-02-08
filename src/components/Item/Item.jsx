import React from 'react';
import { useNavigate } from 'react-router';
import styles from './Item.module.css';

function Item({ product, product: { id, image, title, category, price } }) {
  const navigate = useNavigate();

  // Go to product detail page with product id
  const goToDetail = () => {
    navigate(`/products/${id}`, {
      state: { product },
    });
  };

  return (
    <div className={styles.itemContainer} onClick={goToDetail}>
      <img className={styles.image} src={image} alt={title} loading="lazy" />
      <div className={styles.infoBox}>
        <span className={styles.titleContainer}>
          <p className={styles.category}>{category}</p>
          <p className={styles.title}> {title}</p>
        </span>
        <span className={styles.price}> ${price}</span>
        <p className={styles.new}>NEW</p>
      </div>
    </div>
  );
}

export default Item;
