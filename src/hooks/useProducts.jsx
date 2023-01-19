import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductList, addNewProduct } from '../service/firebase';

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery(['products'], getProductList, {
    staleTime: 1000 * 60,
  });

  const addProduct = useMutation(
    ({ product, url }) => addNewProduct(product, url),
    { onSuccess: () => queryClient.invalidateQueries(['products']) }
  );

  return { productsQuery, addProduct };
}
