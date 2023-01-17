import React from 'react';
import { CiWheat } from 'react-icons/ci';
import { BsCart4 } from 'react-icons/bs';
import { MdOutlineModeEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

import User from '../User/User';
import Button from '../UI/Button/Button';
import { useAuthContext } from '../context/AuthContext';

export default function Header() {
  const { user, login, logout } = useAuthContext();

  return (
    <nav className={styles.nav}>
      <Link to="">
        <p className={styles.title_container}>
          <CiWheat />
          Skin N Body
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
          {!user && (
            <li>
              <Button onClick={login} text="Login" />
            </li>
          )}
          {user && (
            <li>
              <Button onClick={logout} text="Logout" />
            </li>
          )}
        </Link>
      </ul>
    </nav>
  );
}
