import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
} from '@mui/material';
import React, { useState } from 'react';
import styles from './ReviewForm.module.css';
import StarIcon from '@mui/icons-material/Star';

import { useAuthContext } from '../context/AuthContext';
import useReview from '../../hooks/useReview';

function ReviewForm({ setOpenReviewForm, productId, setSuccess }) {
  const [rating, setRating] = useState(2);
  const [hover, setHover] = useState(-1);
  const [skinType, setSkinType] = useState('');
  const [headline, setHeadline] = useState('');
  const [comments, setCommnets] = useState('');
  const { displayName } = useAuthContext().user;
  const { addNewReview } = useReview();

  const handleChange = (event) => {
    setSkinType(event.target.value);
  };

  const uploadReview = () => {
    const review = { displayName, rating, skinType, headline, comments };

    // Upload a reivew
    addNewReview.mutate(
      { productId, review },
      {
        onSuccess: () => {
          // Clear inputs
          setCommnets('');
          setHeadline('');
          setRating(2);
          setSkinType('');

          // Show success image
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 5000);
          setOpenReviewForm(false);
        },
      }
    );
  };

  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

  const getLabelText = (rating) => {
    return `${rating} Star${rating !== 1 ? 's' : ''}, ${labels[rating]}`;
  };

  return (
    <div className={styles.writeRivewContainer}>
      <div className={styles.inputBox}>
        <p className={styles.inputLabel}>Your Rating</p>
        <div className={styles.ratingContainer}>
          <Box
            sx={{
              width: 200,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Rating
              name="hover-feedback"
              rating={rating}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newrating) => {
                setRating(newrating);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {rating !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
            )}
          </Box>
        </div>
        <div className={styles.inputBox}>
          <p className={styles.inputLabel}>Review Headline</p>
          <input
            type="text"
            onChange={(e) => {
              setHeadline(e.target.value);
            }}
            value={headline}
          />
        </div>
        <div className={styles.inputBox}>
          <p className={styles.inputLabel}>Comments</p>
          <textarea
            name="comments"
            cols="120"
            rows="10"
            onChange={(e) => {
              setCommnets(e.target.value);
            }}
            value={comments}
          ></textarea>
        </div>
        <div className={styles.inputBox}>
          <FormControl fullWidth>
            <InputLabel>Skin Type</InputLabel>
            <Select value={skinType} label="Skin Type" onChange={handleChange}>
              <MenuItem value={'Normal'}>Normal</MenuItem>
              <MenuItem value={'Oily'}>Oily</MenuItem>
              <MenuItem value={'Dry'}>Dry</MenuItem>
              <MenuItem value={'Combination'}>Combination</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <Button
        size="large"
        onClick={() => {
          uploadReview();
        }}
      >
        SUBMIT REVIEW
      </Button>
    </div>
  );
}

export default ReviewForm;
