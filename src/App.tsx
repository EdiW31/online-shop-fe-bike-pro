import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminHome from "./AdminPages/AdminHome/adminHome";
import AdminProducts from "./AdminPages/AdminProducts/adminProducts";
import AdminUsers from "./AdminPages/AdminUsers/adminUsers";
import AdminReviews from "./AdminPages/AdminReviews/adminReviews";

import Home from "./Pages/Home/home";
import SignUpPage from "./Pages/Auth/signUp";
import SignIn from "./Pages/Auth/singIn";
import AdminRoute from "./EndPoints/adminRoutes";
import Unauthorized from "./Pages/Unauthorized/unauthorized";
import Products from "./Pages/ProductList/products";


function App() {

  return (
    <Router>
      <Routes>
        {/* Admin routes */}
        <Route element={<AdminRoute/>}>
          <Route path="/admin" element={<AdminHome/>}/>
          <Route path="/admin/addproduct" element={<AdminProducts/>}/>
          <Route path="/admin/users" element={<AdminUsers/>}/>
          <Route path="/admin/reviews" element={<AdminReviews/>}/>
        </Route>

        {/* Users routes */}
        <Route path="/" element={<Home/>}/>
        <Route path="/auth/signup" element={<SignUpPage/>}/>
        <Route path="/auth/signin" element={<SignIn/>}/>
        <Route path="/unouthorized" element={<Unauthorized/>}/>
        <Route path="/products" element={<Products/>}/>
      </Routes>
    </Router>
  );
}
// - Project structure:
//   - src/
//     - components/ (Reusable UI components)
//       - Navbar/
//         - Navbar.tsx
//         - navbar.css
//       - Footer/
//         - Footer.tsx
//         - footer.css
//       - ProductCard/
//         - ProductCard.tsx
//         - productCard.css
//     - pages/ (Different pages of the application)
//       - Home/
//         - Home.tsx
//         - home.css
//       - ProductList/
//         - ProductList.tsx
//         - productList.css
//       - ProductDetails/
//         - ProductDetails.tsx
//         - productDetails.css
//       - Cart/
//         - Cart.tsx
//         - cart.css
//       - Checkout/
//         - Checkout.tsx
//         - checkout.css
export default App;
