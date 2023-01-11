import React, { useCallback, useEffect, useState } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { BsCart4 } from 'react-icons/bs';
import { MdOutlineModeEdit } from 'react-icons/md';
import { Link, redirect } from 'react-router-dom';
import styles from './Header.module.css';
import login, { onUserStateChange, logout } from '../../service/firebase';
import User from '../User/User';

export default function Header() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // When a page is loaded, check user has already login
  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

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
          {!user ? (
            <li onClick={login}>Login</li>
          ) : (
            <li onClick={logout}> Logout</li>
          )}
        </Link>
      </ul>
    </nav>
  );
}
