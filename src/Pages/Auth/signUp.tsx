import { useState } from "react";
import { SignUp } from "../../EndPoints/Authentication/auth.endpoints"
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigate = useNavigate();

    const handleSignUp=()=>{
        SignUp(email, password, name).then((res)=>{
            if(res){
                navigate("/auth/signin");
            }else{
                setErrorMessage("Email is already in Use!!");
            }
        }).catch((error)=>{
        const errorMessage = error.message || "An error occurred!";
        setErrorMessage(errorMessage);
        });
    }

    return (
        <div className="font-[sans-serif] bg-white md:h-screen">
            <div className="grid md:grid-cols-2 items-center gap-8 h-full">
                <div className="max-md:order-1 p-4 bg-gray-50 h-full">
                    <img src="https://readymadeui.com/signin-image.webp" className="lg:max-w-[90%] w-full h-full object-contain block mx-auto" alt="login-image" />
                </div>

                <div className="flex items-center p-6 h-full w-full">
                    <form className="max-w-lg w-full mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-12">
                            <h3 className="text-blue-500 md:text-3xl text-2xl font-extrabold max-md:text-center">Create an account for Bike Pro.</h3>
                        </div>

                        <div>
                            <label className="text-gray-800 text-xs block mb-2">Full Name</label>
                            <div className="relative flex items-center">
                                <input name="name" type="text" required className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className="text-gray-800 text-xs block mb-2">Email</label>
                            <div className="relative flex items-center">
                                <input name="email" type="text" required className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className="text-gray-800 text-xs block mb-2">Password</label>
                            <div className="relative flex items-center">
                                <input name="password" type="password" required className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex items-center mt-6">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 rounded" />
                            <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                                I accept the <a href="#" className="text-blue-500 font-semibold hover:underline ml-1">Terms and Conditions</a>
                            </label>
                        </div>
                        <div className="mt-4">
                            {/* Other JSX elements */}
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display the error message if it exists */}
                            {/* Rest of the form */}
                        </div>
                        <div className="mt-12">
                            <button type="button" className="w-full py-3 px-6 text-sm tracking-wider font-semibold rounded-md bg-blue-600 hover:bg-blue-700 text-white focus:outline-none" onClick={handleSignUp}>
                                Create an account
                            </button>
                            <p className="text-sm mt-6 text-gray-800">Already have an account? <a href="/auth/signin" className="text-blue-500 font-semibold hover:underline ml-1">Login here</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage
