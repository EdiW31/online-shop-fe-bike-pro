import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../Components/AdminNavbar/navbar.component';
import { getProducts } from '../../EndPoints/Products/products.endpoints';
import { AdminProductCard } from '../../Components/AdminProductCard/adminProductCard.component';
import { AddProd } from '../../Components/Add_Edit_Products/addProd.component';

interface Product {
  id: number;
  name: string;
  categoryId: number;
  description?: string;
  price: number;
  photos: string[];
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts();
    setProducts(fetchedProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, [reloadTrigger]);

  console.log(products)

  const toggleReload = () => {
    setReloadTrigger(!reloadTrigger);
  };

  return (
    <main className='w-full h-screen flex flex-row'>
      <div className='static top-0 left-0'>
        <AdminNavbar />
      </div>
      <section className='flex flex-col p-10 ml-20 w-full gap-5'>
        <h1 className='text-4xl text-neutral-300'>
          Product Dashboard, delete, create, edit!
        </h1>
        <div className='bg-orange-300 p-1 rounded-md'></div>
        {/* Pass toggleReload to AddProd to be called after a product is added */}
        <AddProd onProductChange={toggleReload} />
        <div className='w-full lg:block'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6 mb-10'>
            {products.map(product => (
              <AdminProductCard
                key={product.id}
                id={product.id}
                productKey={product.id}
                name={product.name}
                price={product.price}
                photos={product.photos}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminProducts;
