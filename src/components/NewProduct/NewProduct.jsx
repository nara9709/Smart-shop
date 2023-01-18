import React, { useEffect, useState } from 'react';
import upload from '../../service/cloudinary';
import styles from './NewProduct.module.css';

import { addNewProduct } from '../../service/firebase';
import Button from '../UI/Button/Button';
import { Box, CircularProgress, Fab, Stack } from '@mui/material';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [success, setSuccess] = useState(false);

  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);

    upload(file)
      .then((url) => {
        // Add new product to fireabse
        addNewProduct(product, url) //
          // Update success value to display a completion message
          .then((res) => {
            setSuccess(res);
            setTimeout(() => {
              setSuccess(false);
            }, 5000);
            setProduct({});
            setFile(null);
          });
      })
      .finally(() => setIsUploading(false));
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

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  return (
    <div className={styles.container}>
      <p>Post New item</p>
      {success && (
        <p className={styles.successMeg}>
          ✅{product.title} has been uploaded!
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

        <span className={styles.buttonContainer}></span>

        <Box sx={{ m: 1, position: 'relative' }}>
          <Fab
            aria-label="save"
            color="primary"
            sx={buttonSx}
            onClick={handleSubmit}
          >
            {success ? <CheckIcon /> : <SaveIcon />}
          </Fab>
          {isUploading && (
            <CircularProgress
              size={68}
              sx={{
                color: green[500],
                position: 'absolute',
                top: -6,
                left: -6,
                zIndex: 1,
              }}
            />
          )}
        </Box>
      </form>
    </div>
  );
}
