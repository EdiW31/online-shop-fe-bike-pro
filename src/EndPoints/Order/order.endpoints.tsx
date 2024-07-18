import axiosInstance from "../axios.config";

// Assuming CreateOrderDto is defined somewhere in your project
// Replace this with the actual type definition
interface CreateOrderDto {
  productId: string;
  quantity: number;
  totalPrice: number;
}

export const createOrder = async (createOrderDto: CreateOrderDto, user: any, product: any) => {
  try {
    // Assuming the user and product information needs to be included in the request
    // Adjust this according to your backend requirements
    const response = await axiosInstance.post('/order/create', {
      ...createOrderDto,
      user,
      product
    });
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrderByUser = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/order/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting order:', error);
    throw error;
  }
}

export const getAllOrders = async () => {
    try {
        const response = await axiosInstance.get('/order');
        return response.data;
    } catch (error) {
        console.error('Error getting orders:', error);
        throw error;
    }
}

export const deleteOrder = async (orderId: number) => {
    try {
        const response = await axiosInstance.delete(`/order/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting order:', error);
        throw error;
    }
}