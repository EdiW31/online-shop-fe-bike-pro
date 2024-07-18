import axiosInstance from "../axios.config";

export const getProducts = async () => {
    try {
        const response = await axiosInstance.get("/products");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getProductById = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

interface Product {
    name: string,
    categoryId: number,
    description?: string,
    price: number
}
export const createProduct = async (name: string, categoryId: number, description: string, price: number) => {
    const newProduct:Product = {
        name,
        categoryId,
        description,
        price
    }
    
    try{
        const createdProduct = await axiosInstance.post("/products/create", newProduct);
        return createdProduct.data;
    }
    catch(error){
        console.error("Error creating product");
    }
}

export const updateProduct = async (id: number, name: string, categoryId: number, description: string, price: number) => {
    const updatedProduct:Product = {
        name,
        categoryId,
        description,
        price
    }

    try {
        const response = await axiosInstance.patch(`/products/${id}`, updatedProduct);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteProduct = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const addPhoto = async (id: number, photo: File) => {
    const formData = new FormData();
    formData.append("id", id.toString());
    formData.append("photo", photo);

    try {
        const response = await axiosInstance.post(`/upload`, formData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}