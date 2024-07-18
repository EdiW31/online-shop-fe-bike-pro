import axiosInstance from "../axios.config";

interface User{
    email: string,
    password: string,
    name?: string
}

export const SignUp = async(email: string, password: string, name:string) => {

    const newUser: User = {
        email,
        password,
        name
    }

    try {
        const response = await axiosInstance.post("/auth/signup", newUser);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const SignIn = async(email: string, password: string) => {

    const UserSignIn : User = {
        email,
        password
    }

    try {
        const response = await axiosInstance.post("/auth/signin", UserSignIn);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data;

    } catch (error) {
        console.error(error);
    }
}

export const Logout = async() => {
    try {
        const response = await axiosInstance.get("/auth/logout");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}