import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
} from '@mui/material';
import React, { useState } from 'react';
import useProducts from '../../hooks/useProducts.jsx';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Item from '../Item/Item.jsx';
import styles from './ItemList.module.css';
import { useRef } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function ItemList({ category }) {
  //Get product data using custom hook
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  const [isFilter, setIsFilter] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [isOpenSort, setOpenSort] = useState(false);
  const [sortName, setSortName] = useState('NEW');
  const [skintype, setSkinType] = useState('Normal');
  const [concern, setConcern] = useState('All');

  // Get window size
  const windowWidth = useRef([window.innerWidth]).current;

  // Assign class name for select container by window size
  const selectBoxStyle =
    windowWidth < 480 ? `${styles.selectBoxMobile}` : `${styles.selectBox}`;
  const filterIconStyle =
    windowWidth < 480 ? `${styles.filterIconMobile}` : `${styles.filterIcon}`;

  let [filteredProducts, setfilteredProducts] = useState({});

  // Sort items by price
  const sortProductsBy = (order) => {
    // Sory by low price
    if (order === 'ascending') {
      setfilteredProducts(() => {
        let filtered = [...products].sort((a, b) => a.price - b.price);

        return filtered;
      });
    } else if (order === 'new') {
      setIsFilter(false);
    } else {
      // Sory by high price
      setfilteredProducts(() => {
        let filtered = [...products].sort((a, b) => b.price - a.price);

        return filtered;
      });
    }

    setIsFilter(true);
  };

  const filterProductBy = () => {
    // Close filter window
    setShowFilter(false);

    // Filtering by skin type and concern
    if (skintype !== 'Normal' && concern !== 'All') {
      setfilteredProducts(() => {
        let filtered = [...products].filter((item) => {
          return item.skintype === skintype && item.concern === concern;
        });
        return filtered;
      });
    } else if (skintype === 'Normal' && concern !== 'All') {
      setfilteredProducts(() => {
        let filtered = [...products].filter((item) => {
          return item.concern === concern;
        });
        return filtered;
      });
    } else if (skintype !== 'Normal' && concern === 'All') {
      setfilteredProducts(() => {
        let filtered = [...products].filter((item) => {
          return item.skintype === skintype;
        });
        return filtered;
      });
    } else if (skintype === 'Normal' && concern === 'All') {
      setfilteredProducts(() => {
        return [...products];
      });
    }

    setIsFilter(true);
  };

  return (
    <section className={styles.itemListContainer}>
      <div className={styles.sortContainer}>
        <div className={styles.sort}>
          <p
            onClick={() => {
              isOpenSort ? setOpenSort(false) : setOpenSort(true);
            }}
          >
            Sort by:
            <span> {sortName}</span>
            <KeyboardArrowDownIcon />
          </p>
          <p className={filterIconStyle}>
            Filter
            <IconButton
              onClick={() => {
                if (showFilter) {
                  setShowFilter(false);
                } else {
                  setShowFilter(true);
                }
              }}
            >
              <FilterAltIcon />
            </IconButton>
          </p>

          {isOpenSort && (
            <div className={styles.sortList}>
              <ul>
                <li
                  onClick={() => {
                    setOpenSort(false);
                    sortProductsBy('all');
                    setSortName('NEW');
                  }}
                >
                  new
                </li>
                <li
                  onClick={() => {
                    setOpenSort(false);
                    sortProductsBy('ascending');
                    setSortName('LOW PRICE');
                  }}
                >
                  low price
                </li>
                <li
                  onClick={() => {
                    setOpenSort(false);
                    sortProductsBy('descending');
                    setSortName('HIGH PRICE');
                  }}
                >
                  high price
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {isLoading && (
        <div className={styles.skeleton}>
          <Stack spacing={1}>
            <Skeleton
              variant="rectangular"
              width={300}
              height={300}
              animation="wave"
            />
            <Skeleton
              variant="rounded"
              width={210}
              height={60}
              animation="wave"
            />
          </Stack>
        </div>
      )}

      {/* Show If there is error */}
      {error && <p>{error}</p>}
      <ul className={styles.itemList}>
        {/* Show all category items */}
        {products &&
          category === 'all' &&
          Object.keys(isFilter ? filteredProducts : products).map((item) => {
            return (
              <li className={styles.item} key={item}>
                <Item
                  product={isFilter ? filteredProducts[item] : products[item]}
                />
              </li>
            );
          })}

        {showFilter && (
          <div className={selectBoxStyle}>
            <FormControl>
              <InputLabel id="typelabel"> Skintype</InputLabel>
              <Select
                className={styles.skintype}
                value={skintype}
                labelId="typelabel"
                label="Skin type"
                onChange={(e) => {
                  setSkinType(e.target.value);
                }}
              >
                <MenuItem value={'Dry'}>Dry</MenuItem>
                <MenuItem value={'Oily'}>Oily</MenuItem>
                <MenuItem value={'Normal'}>Normal</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="concernLabel"> Concern</InputLabel>
              <Select
                className={styles.concern}
                value={concern}
                label="Concern"
                onChange={(e) => {
                  setConcern(e.target.value);
                }}
                labelId="concernLabel"
              >
                <MenuItem value={'Dryness'}>Dryness</MenuItem>
                <MenuItem value={'Look of Redness'}>Look of Redness</MenuItem>
                <MenuItem value={'Dark Circles'}>Dark Circles</MenuItem>
                <MenuItem value={'Puffiness'}>Puffiness</MenuItem>
                <MenuItem value={'Cleansing'}>Cleansing</MenuItem>
                <MenuItem value={'Visible Shine'}>Visible Shine</MenuItem>
                <MenuItem value={'All'}>All</MenuItem>
              </Select>

              <Button
                onClick={filterProductBy}
                variant="outlined"
                sx={{ marginTop: 1.5 }}
              >
                Search
              </Button>
            </FormControl>
          </div>
        )}
        {/* Show selected category items */}
        {products &&
          category !== 'all' &&
          Object.keys(isFilter ? filteredProducts : products)
            .filter((item) => products[item].category === category)
            .map((product) => {
              return (
                <li className={styles.item} key={products[product].id}>
                  <Item
                    product={
                      isFilter ? filteredProducts[product] : products[product]
                    }
                  />
                </li>
              );
            })}
      </ul>
    </section>
  );
}

export default ItemList;
