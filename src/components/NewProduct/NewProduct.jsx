import React, { useState } from 'react';
import upload from '../../service/cloudinary';
import styles from './NewProduct.module.css';

export default function NewProduct() {
  const [product, setproduct] = useState({});
  const [file, setFile] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    upload(file).then((url) => {
      console.log(url);
      console.log(product);
      //TODOFirebase에 새로운 제품 추가
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;

    // When change a image file, update it
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }

    // When change a input, update it
    setproduct((product) => ({ ...product, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <p>Post New item</p>
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt={product.name && ''}
          className={styles.productImage}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          accept="image/*"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Item name"
          value={product.title ?? ''}
          required
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Price"
          value={product.price ?? ''}
          name="price"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={product.category ?? ''}
          onChange={handleChange}
          name="category"
          required
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={product.description ?? ''}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Options(Separate options with comma(,))"
          value={product.options ?? ''}
          onChange={handleChange}
          name="options"
          required
        />

        <button className={styles.button}>Post Item</button>
      </form>
    </div>
  );
}
