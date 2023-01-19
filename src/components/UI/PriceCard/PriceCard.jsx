import React from 'react';
import styles from './PriceCard.module.css';

function PriceCard({ text, price }) {
  return (
    <div className={styles.itemTotal}>
      <span>{text}</span>
      <span className={styles.number}>${price}</span>
    </div>
  );
}

export default PriceCard;
