import React, { useEffect, useState } from 'react';
import upload from '../../service/cloudinary';
import styles from './NewProduct.module.css';
import { v4 as uuid } from 'uuid';
import { writeProductData } from '../../service/firebase';

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsUploaded(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [isUploaded]);

  const handleSubmit = (e) => {
    e.preventDefault();

    upload(file).then((url) => {
      // Add new product to fireabse
      writeProductData(product, uuid(), url) //
        // Update isUploaded value to display a completion message
        .then((res) => setIsUploaded(res));
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
    setProduct((product) => ({ ...product, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <p>Post New item</p>
      {isUploaded && (
        <p>
          {' '}
          <strong>{product.title}</strong> has been uploaded!{' '}
        </p>
      )}
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
          placeholder="Options(Separated by comma(,))"
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
