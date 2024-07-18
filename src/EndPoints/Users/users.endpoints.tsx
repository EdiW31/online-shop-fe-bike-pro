import axiosInstance from "../axios.config";

interface User {
    name: string;
    email: string;
    //set it up with ADMIN or USER
    role: string;
}

export const getUsers = () => {
  return axiosInstance.get('/users');
};

export const getUser = (id: string) => {
  return axiosInstance.get(`/users/${id}`);
};

export const createUsers = (name: string, email:string, role:string) => {

    const user: User = {
        name: name,
        email: email,
        role: role,
    };

  return axiosInstance.post('/users/create', user);
};

export const updateUsers = (id: string, user:User) => {
  return axiosInstance.patch(`/users/${id}`, user);
};

export const deleteUsers = (id: string) => {
  return axiosInstance.delete(`/users/${id}`);
};

