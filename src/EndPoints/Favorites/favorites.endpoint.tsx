import axiosInstance from "../axios.config";

export interface Product{
    productId: number;
}

export const getFavorites = async (userToken:string) => {
  const response = await axiosInstance.get("/favorites/showfav", {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  });
  return response.data;
};

export const addFavorite = async (productId: number, userToken: string) => {
    const product: Product = {
      productId: productId
    };
    const response = await axiosInstance.post("/favorites/addfav", product, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    });
    return response.data;
  };

export const removeFavorite = async (favId: number) => {
  const response = await axiosInstance.delete(`/favorites/${favId}`);
  return response.data;
};

