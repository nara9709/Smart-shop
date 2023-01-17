import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Reviews from '../Reviews/Reviews.jsx';
import Button from '../UI/Button/Button.jsx';
import styles from './ProductDetail.module.css';
import { useAuthContext } from '../context/AuthContext';
import { addCart } from '../../service/firebase.js';

export default function ProductDetail() {
  const userId = useAuthContext().uid;
  let optionRef = useRef();
  const { image, title, category, price, description, options, id } =
    useLocation().state.product;
  const product = useLocation().state;
  const navigate = useNavigate();

  // Add product to Cart
  const addProductCart = () => {
    const option = optionRef.current.value;

    // Pass product info as parameters
    addCart(userId, title, price, image, id, option).then((res) => {
      console.log(res);
    });
    // navigate('/carts', { state: { image, title, category, price, option } });
    // console.log(product);
  };
  return (
    <>
      <p className={styles.category}>{category}</p>
      <section className={styles.container}>
        <img className={styles.image} src={image} alt={title} />
        <div className={styles.product_info_container}>
          <div className={styles.titleContainer}>
            <h3>{title}</h3>
            <h4>${price}</h4>
          </div>
          <p className={styles.description}>{description}</p>
          <span>Options: </span>
          <select ref={optionRef} className={styles.options} name="options">
            {options.map((option) => {
              return <option value={option}>{option}</option>;
            })}
          </select>
          <p className={styles.button}>
            <Button onClick={addProductCart} text="Add cart"></Button>
          </p>
        </div>
      </section>
      <Reviews></Reviews>
    </>
  );
}
