import React from 'react';
import { BsCart4 } from 'react-icons/bs';
import { getCart } from '../../service/firebase';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import styles from './CartStatus.module.css';

function CartStatus(props) {
  const userId = useAuthContext().uid;
  const { data: products } = useQuery(['carts'], () => getCart(userId));

  return (
    <div className={styles.container}>
      <BsCart4 />
      {products && <p className={styles.badge}>{products.length}</p>}
    </div>
  );
}

export default CartStatus;
