import React, { useEffect, useState } from 'react';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
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

  const images = [
    'https://res.cloudinary.com/nara9709/image/upload/v1673757107/2_purapl.png',
    'https://res.cloudinary.com/nara9709/image/upload/v1673757107/1_kwkkf5.png',
    'https://res.cloudinary.com/nara9709/image/upload/v1673757107/4_l3gksb.png',
    'https://res.cloudinary.com/nara9709/image/upload/v1673757107/3_nmpecb.png',
  ];

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
      <div className={styles.slideContainer}>
        <Slide duration={3000} arrows={false}>
          <div className={styles.each_slide_effect}>
            <div style={{ backgroundImage: `url(${images[0]})` }}></div>
          </div>
          <div className={styles.each_slide_effect}>
            <div style={{ backgroundImage: `url(${images[1]})` }}></div>
          </div>
          <div className={styles.each_slide_effect}>
            <div style={{ backgroundImage: `url(${images[2]})` }}></div>
          </div>
          <div className={styles.each_slide_effect}>
            <div style={{ backgroundImage: `url(${images[3]})` }}></div>
          </div>
        </Slide>
      </div>
      <ItemList></ItemList>
    </>
  );
}
