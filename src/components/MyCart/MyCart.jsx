import React, { useEffect } from 'react';
import { redirect, useLocation } from 'react-router';

export default function MyCart({ user }) {
  useEffect(() => {
    if (!user) {
      redirect('/');
    }
  }, [user]);

  return (
    <div>
      <h1>My cart</h1>
    </div>
  );
}
