import React, { useEffect, useState } from 'react';
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
  Tooltip,
} from '@mui/material';
import useCarts from '../../hooks/useCarts.jsx';
import useProducts from '../../hooks/useProducts.jsx';
import Login from '../Login/Login.jsx';
import { getUserType } from '../../service/firebase.js';

export default function ProductDetail() {
  const { user } = useAuthContext();
  const [userType, setUserType] = useState(null);
  const {
    image,
    title,
    category,
    price,
    description,
    options,
    id,
    skintype,
    concern,
  } = useLocation().state.product;
  const navigate = useNavigate();
  const [option, setOption] = useState(options[0]);
  const [openAfterCart, setOpenAfterCart] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { addOrUpdate } = useCarts();
  const { removeProduct } = useProducts();

  // Delete product
  const deleteProduct = () => {
    // removeProduct.mutate({ productId: id });
    // setOpenConfirm(false);
    // navigate('/', {
    //   replace: true,
    // });

    alert('The function is implemented, but I blocked it just in case.🧐');
  };

  // Handling modal window
  const handleModalOpen = () => setOpenAfterCart(true);
  const handleModalClose = () => {
    setOpenAfterCart(false);
  };

  // Get option value
  const getOption = (e) => {
    setOption(e.target.value);
  };

  // Add product to Cart
  const addProductCart = () => {
    // If user is not login, Show modal
    if (!user) {
      setOpenLogin(true);
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

  const getUserSkinType = () => {
    getUserType(user.uid).then((type) => {
      return setUserType(type);
    });
  };

  useEffect(() => {
    // If there is user info, get user's skin type
    user && getUserSkinType();
  }, []);

  return (
    <>
      <section className={styles.container}>
        {openLogin && <Login setOpenLogin={setOpenLogin} />}
        <img className={styles.image} src={image} alt={title} />
        <div className={styles.product_info_container}>
          <div className={styles.titleContainer}>
            <div>
              <p className={styles.category}>{category}</p>
              <h3>{title}</h3>
              <h4>${price}</h4>
            </div>
            {userType === skintype && (
              <Tooltip title="This item is matched with your skin type! ">
                <span className={styles.matchBadge}>Matched item✨</span>
              </Tooltip>
            )}
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
            Add to Cart
          </Button>
          {user && user.uid !== null && user.isAdmin ? (
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
          ) : null}
          <div className={styles.tableText}>
            <span className={styles.line}></span>
            <span className={styles.text}> We recommend this item for </span>
            <span className={styles.line}></span>
          </div>
          <div className={styles.rowHeader}>
            <div className={styles.cell}>Skin Type</div>
            <div className={styles.cell}> Concern</div>
          </div>
          <div className={styles.row}>
            <div className={styles.cell}>{skintype}</div>
            <div className={styles.cell}>{concern}</div>
          </div>
        </div>
      </section>

      <Reviews productId={id}></Reviews>

      {/* Modal windows */}

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
            sx={{ fontWeight: '300', marginBottom: 1 }}
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
  width: 280,
  bgcolor: 'background.paper',
  border: '2px solid #dbc7bd',
  borderRadius: '10px',
  boxShadow: 24,
  p: 3,
};
