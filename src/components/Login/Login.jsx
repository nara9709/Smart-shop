import React from 'react';
import styles from './Login.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuthContext } from '../context/AuthContext';

function Login({ setOpenLogin }) {
  const { loginWithEmail, loginWithGoogle } = useAuthContext();

  return (
    <div className={styles.container}>
      <IconButton
        className={styles.closeBtn}
        onClick={() => {
          setOpenLogin(false);
        }}
      >
        <CloseIcon fontSize="large" />
      </IconButton>
      <h1>Login</h1>
      <Alert severity="info" className={styles.alert}>
        Login with a test account to use all features on this website
        <strong>(Admin account)</strong>
      </Alert>
      <form>
        <input type="id" placeholder="test@test.com" />
        <input type="password" placeholder="!!test" />
        <Button
          onClick={() => {
            // Login with email
            loginWithEmail('test@test.com', '!!test');
            setOpenLogin(false);
          }}
          variant="contained"
          className={styles.loginbtn}
        >
          Login
        </Button>
      </form>
      <h3>or use a social network</h3>
      <IconButton
        onClick={() => {
          // Login with google
          loginWithGoogle();
          setOpenLogin(false);
        }}
      >
        <GoogleIcon fontSize="large" color="primary" />
      </IconButton>
    </div>
  );
}

export default Login;
