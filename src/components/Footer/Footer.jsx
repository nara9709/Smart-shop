import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import styles from './Footer.module.css';

function Footer(props) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <ul className={styles.ul}>
          <li className={styles.item}>
            <div className={styles.des}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                doloribus amet animi, natus incidunt error quo esse ab dolorum
                delectus.
              </p>
              <span className={styles.spanBorderBottom}></span>
              <div>
                <h5>Find us here:</h5>
                <ul className={styles.findusList}>
                  <li className={styles.findusItem}>
                    <em className={styles.em}>FB</em>
                  </li>
                  <li>
                    <em className={styles.em}>TW</em>
                  </li>
                  <li>
                    <em className={styles.em}>INS</em>
                  </li>
                  <li>
                    <em className={styles.em}>PT</em>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className={styles.item}>
            <div className={styles.linkitems}>
              <div className={styles.about}>
                <h6>About</h6>
                <ul>
                  <li className={styles.linkItem}>
                    <span className={styles.linkSpan}></span>
                    <p>About US</p>
                  </li>
                  <li className={styles.linkItem}>
                    <span className={styles.linkSpan}></span>
                    <p>Collections</p>
                  </li>
                  <li className={styles.linkItem}>
                    <span className={styles.linkSpan}></span>
                    <p>Shop</p>
                  </li>
                  <li className={styles.linkItem}>
                    <span className={styles.linkSpan}></span>
                    <p>Blog</p>
                  </li>
                </ul>
              </div>
              <div className={styles.useful}>
                <h6>Useful Links</h6>
                <ul>
                  <li className={styles.linkItem}>
                    <span className={styles.linkSpan}></span>
                    <p>Privacy Policy</p>
                  </li>
                  <li className={styles.linkItem}>
                    <span className={styles.linkSpan}></span>
                    <p>Terms of use</p>
                  </li>
                  <li className={styles.linkItem}>
                    <span className={styles.linkSpan}></span>
                    <p>Support</p>
                  </li>
                  <li className={styles.linkItem}>
                    <span className={styles.linkSpan}></span>
                    <p>Shipping details</p>
                  </li>
                  <li className={styles.linkItem}>
                    <span className={styles.linkSpan}></span>
                    <p>FAQs</p>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className={styles.item}>
            <div className={styles.newsletter}>
              <h6>Newsletter</h6>
              <p>
                Subscribe to be the first to hear about deals. offers and
                upcoming collections.
              </p>
              <div className={styles.email}>
                <p>Enter Your email</p>
                <SendIcon />
              </div>
              <span className={styles.spanBorderBottom}></span>
            </div>
          </li>
        </ul>
        <span className={styles.spanBorderBottom}></span>
        <div className={styles.copylight}>
          <p>© All right reserved. Naralee 2023</p>
          <div>
            <p>Payment Methods</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
