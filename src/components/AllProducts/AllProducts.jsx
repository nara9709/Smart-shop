import React, { useState } from 'react';
import { useLocation } from 'react-router';
import Banner from '../Banner/Banner';

import ItemList from '../ItemList/ItemList';

export default function AllProducts() {
  const state = useLocation().state;
  const category = state ? state.category : 'all';

  return (
    <>
      <Banner></Banner>
      <ItemList category={category}></ItemList>
    </>
  );
}
