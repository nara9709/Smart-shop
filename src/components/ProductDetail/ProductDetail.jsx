import React, { useState } from 'react';
import { useLocation } from 'react-router';
import Reviews from '../Reviews/Reviews.jsx';
import styles from './ProductDetail.module.css';
import { useAuthContext } from '../context/AuthContext';
import { addCart } from '../../service/firebase.js';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
  Button,
} from '@mui/material';

export default function ProductDetail() {
  const [option, setOption] = useState();
  const { userId } = useAuthContext();
  const { image, title, category, price, description, options, id } =
    useLocation().state.product;
  const [open, setOpen] = useState(false);

  // Handling modal window
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  // Get option value
  const getOption = (e) => {
    setOption(e.target.value);
  };

  // Add product to Cart
  const addProductCart = () => {
    // If user is not login, Show modal
    if (!userId) {
      console.log('Please loging');
      handleModalOpen();
      return;
    }

    // Pass product info as parameters
    addCart(userId, title, price, image, id, option).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={handleModalClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Login needed
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            You need to log in If you would like to use cart
          </Typography>
        </Box>
      </Modal>
      <p className={styles.category}>{category}</p>
      <section className={styles.container}>
        <img className={styles.image} src={image} alt={title} />
        <div className={styles.product_info_container}>
          <div className={styles.titleContainer}>
            <h3>{title}</h3>
            <h4>${price}</h4>
          </div>
          <p className={styles.description}>{description}</p>
          <FormControl className={styles.selectContainer} fullWidth>
            <InputLabel>Option</InputLabel>
            <Select
              labelId="options"
              defaultValue={options[0]}
              inputProps={{
                name: 'Options',
                id: 'uncontrolled',
              }}
              onChange={getOption}
              label="Option"
            >
              {options.map((option) => {
                return (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            className={styles.button}
            onClick={addProductCart}
            fullWidth
          >
            Add Cart
          </Button>
        </div>
      </section>
      <Reviews></Reviews>
    </>
  );
}

// Modal Style
const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #dbc7bd',
  boxShadow: 24,
  p: 4,
};
