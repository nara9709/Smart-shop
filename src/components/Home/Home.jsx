import React, { useEffect, useState } from 'react';
import 'react-slideshow-image/dist/styles.css';
import styles from './Home.module.css';
import ItemList from '../ItemList/ItemList';
import useFade from '../../hooks/useFade';
import { Button } from '@mui/material';

export default function Home() {
  const [isVisible, setVisible, fadeProps] = useFade();
  const [textShow, setTextShow] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => {
      setTextShow(true);
    }, 700);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isVisible && (
        <section className={styles.mainContainer}>
          <div className={styles.sideBar}>
            <ul>
              <li>
                <a
                  target="_blank"
                  href="https://www.facebook.com/"
                  rel="noreferrer"
                >
                  FB
                </a>
              </li>
              <li>
                <a target="_blank" href="https://twitter.com/" rel="noreferrer">
                  TW
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.instagram.com/"
                  rel="noreferrer"
                >
                  INS
                </a>
              </li>
              <li>
                <a target="_blank" href="">
                  PT
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.mainImageContainer}>
            <img
              {...fadeProps}
              src="https://res.cloudinary.com/nara9709/image/upload/v1674333405/kalos-skincare-kzjH8CCWAD0-unsplash_-_%ED%8E%B8%EC%A7%91%ED%95%A8_1_ugqnss.png"
              alt=""
            />
          </div>
          {isVisible && textShow && (
            <div {...fadeProps} className={styles.mainTextContainer}>
              <div className={styles.ImageTitle}>
                <em className={styles.organic}>
                  <strong>ORGANIC</strong>
                </em>
                <em>COLLECTION</em>
              </div>
              <div>
                <p className={styles.subText}>
                  Meet New
                  <br />
                  Organic Care Product
                </p>
              </div>
              <Button variant="contained">Shop Now</Button>
            </div>
          )}
        </section>
      )}

      <ItemList></ItemList>
    </>
  );
}
