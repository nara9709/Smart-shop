import React from 'react';
import { MdOutlineModeEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

import User from '../User/User';
import Button from '@mui/material/Button';
import { useAuthContext } from '../context/AuthContext';

import CartStatus from '../CartStatus/CartStatus';

export default function Header() {
  const { user, login, logout } = useAuthContext();

  return (
    <nav className={styles.nav}>
      <div className={styles.leftNav}>
        <Link to="">
          <p className={styles.textLogo}>SKI N BODY</p>
        </Link>
        <ul className={styles.menu}>
          <Link to="/products">
            <li>Products</li>
          </Link>
          {user && (
            <Link to="/carts">
              <li className={styles.icon_cart}>
                <CartStatus></CartStatus>
              </li>
            </Link>
          )}
          {user && user.isAdmin && (
            <Link to="products/new">
              <li className={styles.icon_edit}>
                <MdOutlineModeEdit />
              </li>
            </Link>
          )}
          {user && (
            <li>
              <User user={user} />
            </li>
          )}
        </ul>
      </div>

      <Link to="">
        {!user && (
          <Button onClick={login} size="medium" variant="outlined">
            Login
          </Button>
        )}
        {user && (
          <Button onClick={logout} size="medium" variant="outlined">
            Logout
          </Button>
        )}
      </Link>
    </nav>
  );
}
