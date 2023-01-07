import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { BsCart4 } from 'react-icons/bs';
import { MdOutlineModeEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';

const Header = () => {
  return (
    <nav className={styles.nav}>
      <Link to="">
        <p className={styles.title_container}>
          <FiShoppingBag />
          Smart Shop
        </p>
      </Link>

      <ul className={styles.menu}>
        <Link to="/products">
          <li>Products</li>
        </Link>
        <Link to="/carts">
          <li className={styles.icon_cart}>
            <BsCart4 />
          </li>
        </Link>
        <Link to="products/new">
          <li className={styles.icon_edit}>
            <MdOutlineModeEdit />
          </li>
        </Link>
        <Link to="">
          <li>Login</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Header;
