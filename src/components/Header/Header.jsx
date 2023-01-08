import React, { useState } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { BsCart4 } from 'react-icons/bs';
import { MdOutlineModeEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';

export default function Header({ auth }) {
  const [userInfo, setUserInfo] = useState(null);
  const userAuth = new auth();

  // Login with google account
  const logInUser = () => {
    userAuth.loginWithGoogle().then((user) => {
      setUserInfo(user.user);
    });
  };

  console.log(userInfo);

  // Logout
  const logOutUser = () => {
    userAuth
      .logOut()
      .then(() => {
        console.log('Log out!');
        setUserInfo(null);
      })
      .catch((err) => {
        console.log(err);
      });
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
        {userInfo !== null && (
          <li className={styles.menu_profile}>
            <img src={userInfo.photoURL} alt="Profile" />
            <span>{userInfo.displayName}</span>
          </li>
        )}
        <Link to="">
          {userInfo === null ? (
            <li onClick={logInUser}>Login</li>
          ) : (
            <li onClick={logOutUser}> Logout</li>
          )}
        </Link>
      </ul>
    </nav>
  );
}
