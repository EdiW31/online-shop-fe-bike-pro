import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../Components/AdminNavbar/navbar.component';
import { getProducts } from '../../EndPoints/Products/products.endpoints'; // Adjust the import path as necessary

interface Product {
  name: string;
  categoryId: number;
  description?: string;
  price: number;
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <main className="w-full h-screen flex flex-row">
    <div className="sticky top-0 left-0">
      <AdminNavbar />
    </div>
    <section className="flex flex-col p-10 ml-20 w-full gap-5">
    <div>
        <h2>Products</h2>
        <ul className=''>
          {products.map((product, index) => (
            <li key={index}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      </div>
    </section>
  </main>
  );
};

export default AdminProducts;