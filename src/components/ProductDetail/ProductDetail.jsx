import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Reviews from '../Reviews/Reviews.jsx';
import Button from '../UI/Button/Button.jsx';
import styles from './ProductDetail.module.css';

export default function ProductDetail() {
  const [option, setOption] = useState();
  const { image, title, category, price, description, options } =
    useLocation().state.product;
  const product = useLocation().state;
  const navigate = useNavigate();

  const addCart = () => {
    navigate('/carts', { state: { image, title, category, price, option } });
    console.log(product);
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
          <select
            onChange={(e) => {
              setOption(e.target.value);
            }}
            className={styles.options}
            name="options"
          >
            {options.map((option) => {
              return <option value={option}>{option}</option>;
            })}
          </select>
          <p className={styles.button}>
            <Button onClick={addCart} text="Add cart"></Button>
          </p>
        </div>
      </section>
      <Reviews></Reviews>
    </>
  );
}
