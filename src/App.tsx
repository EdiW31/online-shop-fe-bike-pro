import { useEffect, useState } from "react";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

interface User {
  id: string;
  email: string;
}


function App() {

  const [user, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch(`${backendUrl}/users`).then((response) => {
      response.json().then((data) => {
        setUsers(data);
      });
    });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
      {user.map((user) => (
        <li key={user.id}>
          <div>{user.email}</div>
        </li>
      ))}
      </ul>
    </div>
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
