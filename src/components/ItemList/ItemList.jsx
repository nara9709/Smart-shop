import { Skeleton, Stack } from '@mui/material';
import React, { useState } from 'react';
import useProducts from '../../hooks/useProducts.jsx';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Item from '../Item/Item.jsx';
import styles from './ItemList.module.css';

function ItemList({ category }) {
  //Get product data using custom hook
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  const [isFilter, setIsFilter] = useState(false);
  const [isOpenSort, setOpenSort] = useState(false);
  const [sortName, setSortName] = useState('NEW');

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
