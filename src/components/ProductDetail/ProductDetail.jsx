import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Reviews from '../Reviews/Reviews.jsx';
import styles from './ProductDetail.module.css';
import { useAuthContext } from '../context/AuthContext';
import { addOrUpdateToCart } from '../../service/firebase.js';
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
import { useQueryClient } from '@tanstack/react-query';

export default function ProductDetail() {
  const userId = useAuthContext().uid;
  const { image, title, category, price, description, options, id } =
    useLocation().state.product;
  const navigate = useNavigate();
  const [option, setOption] = useState(options[0]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAfterCart, setOpenAfterCart] = useState(false);
  const queryClient = useQueryClient();

  // Handling modal window
  const handleModalOpen = () =>
    userId ? setOpenAfterCart(true) : setOpenAlert(true);
  const handleModalClose = () => {
    userId ? setOpenAfterCart(false) : setOpenAlert(false);
  };

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

    const product = { id, title, price, option, quantity: 1 };

    // Pass product info as parameters
    addOrUpdateToCart(userId, product).then(() => {
      handleModalOpen();
    });

    // Update cart bedge count
    queryClient.invalidateQueries({ queryKey: ['carts'] });
  };

  // Go to Cart
  const goToCart = () => {
    navigate('/carts');
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
            sx={{
              marginTop: 3,
            }}
          >
            Add Cart
          </Button>
        </div>
      </section>
      <Reviews></Reviews>

      {/* Modal windows */}
      <Modal
        keepMounted
        open={openAlert}
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

      <Modal
        keepMounted
        open={openAfterCart}
        onClose={handleModalClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography className={styles.modalTitle} variant="h6" component="h2">
            ✅Your item has been added!
          </Typography>
          <div className={styles.buttonContainer}>
            <Button
              variant="contained"
              onClick={handleModalClose}
              sx={{
                marginTop: 3,
              }}
            >
              Continue
            </Button>
            <Button
              variant="contained"
              onClick={goToCart}
              sx={{
                marginTop: 3,
              }}
            >
              Go to cart
            </Button>
          </div>
        </Box>
      </Modal>
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
