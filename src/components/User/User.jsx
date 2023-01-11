import React from 'react';
import styles from './User.module.css';

const User = ({ user: { photoURL, displayName } }) => {
  return (
    <li className={styles.menu_profile}>
      <img src={photoURL} alt={displayName} />
      <span className={styles.name}>{displayName}</span>
    </li>
  );
};

export default User;
