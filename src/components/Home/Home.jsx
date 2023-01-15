import React, { useEffect, useState } from 'react';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import styles from './Home.module.css';
import { getProductList } from '../../service/firebase';
export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProductList().then((res) => {
      console.log(res);
      setProducts(res);
    });
  }, []);

  const images = [
    'https://res.cloudinary.com/nara9709/image/upload/v1673757107/2_purapl.png',
    'https://res.cloudinary.com/nara9709/image/upload/v1673757107/1_kwkkf5.png',
    'https://res.cloudinary.com/nara9709/image/upload/v1673757107/4_l3gksb.png',
    'https://res.cloudinary.com/nara9709/image/upload/v1673757107/3_nmpecb.png',
  ];

  return (
    <>
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

      <section>
        <ul>
          {Object.keys(products).forEach((item) => {
            return console.log(item[0]);
          })}
        </ul>
      </section>
    </>
  );
}
