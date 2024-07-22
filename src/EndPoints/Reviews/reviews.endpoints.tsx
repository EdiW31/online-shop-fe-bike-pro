import axiosInstance from '../axios.config';

export const getReviews = async () => {
  try {
    const response = await axiosInstance.get('/reviews');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getReviewsByProductId = async (productId: number) => {
  try {
    const response = await axiosInstance.get(`/reviews/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const createReview = async (
  productId: number,
  rating: number,
  comment: string,
) => {
  const newReview = {
    productId,
    rating,
    comment,
  };

  const token = localStorage.getItem('token') || '';

  try {
    const createdReview = await axiosInstance.post(
      '/reviews/create',
      newReview,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return createdReview.data;
  } catch (error) {
    console.error('Error creating review', error);
    throw error; // It's a good practice to either handle the error or throw it so the caller can handle it.
  }
}
