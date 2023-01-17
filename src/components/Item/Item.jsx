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
    <div div onClick={goToDetail}>
      <img className={styles.image} src={image} alt={title} />
      <div className={styles.infoBox}>
        <span>
          <p>
            {title}
            <p className={styles.category}>{category}</p>
          </p>
        </span>
        <span className={styles.price}> ${price}</span>
      </div>
    </div>
  );
}

export default Item;
