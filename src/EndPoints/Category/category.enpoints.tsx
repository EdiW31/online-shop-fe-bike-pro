import axiosInstance from '../axios.config';

export const getCategory = async () => {
  try {
    const response = await axiosInstance.get('/category');
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createCategory = async (name: string) => {
  try {
    const response = await axiosInstance.post('/category', { name });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteCategory = async (key: number) => {
  try {
    const response = await axiosInstance.delete(`/category/${key}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
