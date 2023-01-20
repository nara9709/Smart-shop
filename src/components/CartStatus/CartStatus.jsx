import React from 'react';
import { BsCart4 } from 'react-icons/bs';
import useCarts from '../../hooks/useCarts';

import styles from './CartStatus.module.css';

function CartStatus() {
  const {
    cartsQuery: { data: carts },
  } = useCarts();

  return (
    <div className={styles.container}>
      <BsCart4 />
      {carts && carts.length !== 0 && (
        <p className={styles.badge}>{carts.length}</p>
      )}
    </div>
  );
}

export default CartStatus;
