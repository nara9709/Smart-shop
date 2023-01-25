import React, { useEffect, useState } from 'react';
import 'react-slideshow-image/dist/styles.css';
import styles from './Home.module.css';
import useFade from '../../hooks/useFade';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import Bounce from '../UI/Bounce';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import WalletIcon from '@mui/icons-material/Wallet';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isVisible, setVisible, fadeProps] = useFade(false, 'fadeIn');
  const [textShow, setTextShow] = useState(false);
  const navigate = useNavigate();

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
        <>
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
                  <a
                    target="_blank"
                    href="https://twitter.com/"
                    rel="noreferrer"
                  >
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
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate('/products');
                  }}
                >
                  Shop Now
                </Button>
              </div>
            )}
            <Bounce className={styles.scrollDownContainer}>
              <h1 className={styles.scrollDown}>Scroll Dowm </h1>
              <p>l</p>
            </Bounce>
          </section>
          <section className={styles.styleContainer}>
            <div className={styles.productNum}>
              <p>130 +</p>
              <em>Products for you</em>
            </div>
            <div className={styles.styleItems}>
              <ul>
                <li>
                  <div className={styles.item_soap}>
                    <p className={styles.title}>Organic Soap</p>
                    <div className={styles.desBox}>
                      <p className={styles.topLine}>
                        House-made <strong>Soap</strong>
                      </p>
                      <p className={styles.bottomLine}>
                        Choice for <br /> Sensitive Skin
                      </p>
                      <div className={styles.shopNow}>
                        <div className={styles.shopLine}></div>{' '}
                        <p
                          onClick={() => {
                            navigate('/products', {
                              state: {
                                category: 'Soap',
                              },
                            });
                          }}
                        >
                          Shop Now
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className={styles.item_serum}>
                    <p className={styles.title}>Serum</p>
                    <div className={styles.desBox}>
                      <p className={styles.topLine}>
                        Deep Hydration <strong> Serum </strong>
                      </p>
                      <p className={styles.bottomLine}>
                        Deeply hydrates
                        <br /> for 72 hours
                      </p>
                      <div className={styles.shopNow}>
                        <div className={styles.shopLine}></div>{' '}
                        <p
                          onClick={() => {
                            navigate('/products', {
                              state: {
                                category: 'Serum',
                              },
                            });
                          }}
                        >
                          Shop Now
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className={styles.item_cream}>
                    <p className={styles.title}>Moisturizer</p>
                    <div className={styles.desBox}>
                      <p className={styles.topLine}>
                        lightweight <strong> Moisturizer </strong>
                      </p>
                      <p className={styles.bottomLine}>
                        Provides
                        <br /> antioxidant protection
                      </p>
                      <div className={styles.shopNow}>
                        <div className={styles.shopLine}></div>{' '}
                        <p
                          onClick={() => {
                            navigate('/products', {
                              state: {
                                category: 'Cream',
                              },
                            });
                          }}
                        >
                          Shop Now
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className={styles.item_lip}>
                    <p className={styles.title}>Lip Cream</p>
                    <div className={styles.desBox}>
                      <p className={styles.topLine}>
                        Advanced <strong> Lip Cream </strong>
                      </p>
                      <p className={styles.bottomLine}>
                        Repairs
                        <br /> the look of dry, damaged lips
                      </p>
                      <div className={styles.shopNow}>
                        <div className={styles.shopLine}></div>{' '}
                        <p
                          onClick={() => {
                            navigate('/products', {
                              state: {
                                category: 'Lip',
                              },
                            });
                          }}
                        >
                          Shop Now
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.introductionList}>
              <ul>
                <li className={styles.introItem}>
                  <LocalShippingIcon sx={{ fontSize: 50 }}></LocalShippingIcon>
                  <h2>Free Shipping</h2>
                  <span></span>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Possimus.
                  </p>
                </li>
                <li className={styles.introItem}>
                  <PhoneEnabledIcon sx={{ fontSize: 50 }}></PhoneEnabledIcon>
                  <h2>24/7 Customer Serivce</h2>
                  <span></span>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Possimus.
                  </p>
                </li>
                <li className={styles.introItem}>
                  <WalletIcon sx={{ fontSize: 50 }}></WalletIcon>
                  <h2>Money Back Guarantee</h2>
                  <span></span>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Possimus.
                  </p>
                </li>
              </ul>
            </div>
          </section>
        </>
      )}
    </>
  );
}
