import React from 'react';
import { BsCart4 } from 'react-icons/bs';
import { MdOutlineModeEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

import User from '../User/User';
import Button from '@mui/material/Button';
import { useAuthContext } from '../context/AuthContext';

export default function Header() {
  const { user, login, logout } = useAuthContext();

  return (
    <nav className={styles.nav}>
      <Link to="">
        <img
          className={styles.logo}
          src="https://res.cloudinary.com/nara9709/image/upload/v1674020578/SKI_N_BODY_2_b7anul.png"
          alt="logo"
        />
      </Link>
      <ul className={styles.menu}>
        <Link to="/products">
          <li>Products</li>
        </Link>
        {user && (
          <Link to="/carts">
            <li className={styles.icon_cart}>
              <BsCart4 />
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
        {user && <User user={user} />}
        <Link to="">
          {!user && (
            <li>
              <Button onClick={login} size="medium" variant="contained">
                Login
              </Button>
            </li>
          )}
          {user && (
            <li>
              <Button onClick={logout} size="medium" variant="contained">
                Logout
              </Button>
            </li>
          )}
        </Link>
      </ul>
    </nav>
  );
}
