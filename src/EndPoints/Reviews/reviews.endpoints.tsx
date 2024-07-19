import axiosInstance from '../axios.config';

export const getReviews = async () => {
  try {
    const response = await axiosInstance.get('/reviews');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
