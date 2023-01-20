import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useAuthContext } from '../components/context/AuthContext';
import {
  addOrUpdateToCart,
  getCart,
  removeFromCart,
} from '../service/firebase';

function useCarts(props) {
  const queryClient = useQueryClient();
  const userId = useAuthContext().uid;

  //   Get cart data from firebase
  const cartsQuery = useQuery(['carts', userId || ''], () => getCart(userId), {
    staleTime: 1000 * 60,
    enabled: !!userId,
  });

  // Add or subtract cart item's quantity from cart
  const addOrUpdate = useMutation(
    ({ product, quantity }) => {
      if (quantity === 1) {
        quantity = 1;
      }
      addOrUpdateToCart(userId, { ...product, quantity });
    },
    // Refetch cart items
    { onSuccess: () => queryClient.invalidateQueries(['carts', userId]) }
  );

  // Remove cart item from cart
  const removeCartItem = useMutation(
    ({ productId }) => removeFromCart(userId, productId),
    { onSuccess: () => queryClient.invalidateQueries(['carts', userId]) }
  );
  return { addOrUpdate, cartsQuery, removeCartItem };
}

export default useCarts;
