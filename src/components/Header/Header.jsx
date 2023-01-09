import React, { useEffect, useState } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { BsCart4 } from 'react-icons/bs';
import { MdOutlineModeEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import login, { onUserStateChange, logout } from '../../service/firebase';

export default function Header() {
  const [user, setUser] = useState(null);

  // When page is load, check user already login
  useEffect(() => {
    onUserStateChange((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  // Login with google account
  const handleLogin = () => {
    login().then(setUser);
  };

  // Logout
  const handleLogout = () => {
    logout().then(setUser).catch(console.error);
  };

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
        {user !== null && (
          <li className={styles.menu_profile}>
            <img src={user.photoURL} alt="Profile" />
            <span>{user.displayName}</span>
          </li>
        )}
        <Link to="">
          {user === null ? (
            <li onClick={handleLogin}>Login</li>
          ) : (
            <li onClick={handleLogout}> Logout</li>
          )}
        </Link>
      </ul>
    </nav>
  );
}
