import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addReview, getReviews } from '../service/firebase';

function useReview(productId) {
  const queryClient = useQueryClient();

  const reviewsQuery = useQuery(
    ['reviews', productId || ''],
    () => getReviews(productId),
    {
      enabled: !!productId,
    }
  );

  const addNewReview = useMutation(
    ({ productId, review }) => addReview(productId, review),
    {
      onSuccess: () => queryClient.invalidateQueries(['reviews']),
    }
  );

  return { reviewsQuery, addNewReview };
}

export default useReview;
