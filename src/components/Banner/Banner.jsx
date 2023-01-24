import React from 'react';
import styles from './Banner.module.css';
import { Slide } from 'react-slideshow-image';

function Banner() {
  const images = [
    'https://res.cloudinary.com/nara9709/image/upload/v1673757107/2_purapl.png',
    'https://res.cloudinary.com/nara9709/image/upload/v1673757107/1_kwkkf5.png',
    'https://res.cloudinary.com/nara9709/image/upload/v1673757107/4_l3gksb.png',
    'https://res.cloudinary.com/nara9709/image/upload/v1673757107/3_nmpecb.png',
  ];
  return (
    <section>
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
    </section>
  );
}

export default Banner;
