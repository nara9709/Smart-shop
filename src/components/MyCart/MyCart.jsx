import React, { useEffect } from 'react';
import { redirect, useLocation } from 'react-router';

export default function MyCart({ user }) {
  useEffect(() => {
    if (!user) {
      redirect('/');
    }
  }, [user]);

  const { image, title, category, price, option } = useLocation().state;
  console.log(title, option);

  return (
    <div>
      <h1>My cart</h1>
    </div>
  );
}
