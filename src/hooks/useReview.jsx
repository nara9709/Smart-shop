import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addReview, getReviews } from '../service/firebase';

function useReview() {
  const queryClient = useQueryClient();

  const reviewsQuery = useQuery(
    ['products'],
    ({ productId }) => getReviews(productId),
    {
      staleTime: 1000 * 60,
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
