import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Reviews from '../Reviews/Reviews.jsx';
import styles from './ProductDetail.module.css';
import { useAuthContext } from '../context/AuthContext';

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
import useCarts from '../../hooks/useCarts.jsx';
import useProducts from '../../hooks/useProducts.jsx';

export default function ProductDetail() {
  const user = useAuthContext();
  const { image, title, category, price, description, options, id } =
    useLocation().state.product;
  const navigate = useNavigate();
  const [option, setOption] = useState(options[0]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAfterCart, setOpenAfterCart] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { addOrUpdate } = useCarts();
  const { removeProduct } = useProducts();

  // Delete product
  const deleteProduct = () => {
    removeProduct.mutate({ productId: id });
    setOpenConfirm(false);
    navigate('/', {
      replace: true,
    });
  };

  // Handling modal window
  const handleModalOpen = () =>
    user.uid ? setOpenAfterCart(true) : setOpenAlert(true);
  const handleModalClose = () => {
    user.uid ? setOpenAfterCart(false) : setOpenAlert(false);
  };

  // Get option value
  const getOption = (e) => {
    setOption(e.target.value);
  };

  // Add product to Cart
  const addProductCart = () => {
    // If user is not login, Show modal
    if (!user.uid) {
      handleModalOpen();
      return;
    }

    const product = { id, title, price, option, quantity: 1, image };

    // Pass product info as parameters
    addOrUpdate.mutate(
      { product: product, quantity: product.quantity },
      {
        onSuccess: () => {
          handleModalOpen();
        },
      }
    );
  };

  // Go to Cart
  const goToCart = () => {
    navigate('/carts');
  };

  // Open Confirm Modal
  const openConfirmModal = () => {
    setOpenConfirm(true);
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

          {user.user.isAdmin && (
            <Button
              variant="contained"
              className={styles.button}
              onClick={openConfirmModal}
              fullWidth
              sx={{
                marginTop: 3,
              }}
              color="error"
            >
              Delete Product
            </Button>
          )}
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
          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: 'red', fontWeight: '600' }}
          >
            Login needed
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            You need to login to add a item to your cart
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
          <Typography
            className={styles.modalTitle}
            variant="p"
            component="h3"
            sx={{ fontWeight: '300' }}
          >
            Your item has been added 🛒
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

      <Modal
        open={openConfirm}
        keepMounted
        onClose={() => {
          setOpenConfirm(false);
        }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography
            className={styles.modalTitle}
            variant="p"
            component="h3"
            sx={{ fontWeight: '300' }}
          >
            Are you sure to delete this product?
          </Typography>
          <Typography>Product name: {title}</Typography>
          <div className={styles.buttonContainer}>
            <Button
              variant="contained"
              onClick={() => {
                deleteProduct();
              }}
              sx={{
                marginTop: 3,
              }}
              color="error"
            >
              Delete
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setOpenConfirm(false);
              }}
              sx={{
                marginTop: 3,
              }}
            >
              Cancel
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
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};
