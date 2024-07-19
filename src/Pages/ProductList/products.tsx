import Footer from '../../Components/Footer/footer.component';
import UserNavbar from '../../Components/UserNavbar/userNavbar.component';
import { getProducts } from '../../EndPoints/Products/products.endpoints';
import { getCategory } from '../../EndPoints/Category/category.enpoints';
import { useState, useEffect } from 'react';
import ProductCard from '../../Components/ProductCard/productCard.component';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Category {
  id: number;
  name: string;
}

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      setProducts(response);
    };

    const fetchCategories = async () => {
      const response = await getCategory();
      setCategories(response);
    };

    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div>
      <UserNavbar />
      <div className='flex justify-around gap-10 p-2 bg-orange-500'>
        <h1 className='text-xl text-white'>Categories:</h1>
        <div className='justify-center p-2'>
          {categories.map(category => (
            <a
              href={`/category/${category.id}`}
              className='text-black bg-orange-600 ml-5 mr-5 px-2 rounded-md'
            >
              {category.name}
            </a>
          ))}
        </div>
      </div>
      <div className='flex justify-center text-center mt-10'>
        <h1 className='text-3xl text-orange-400'>
          Below you can see all of our products!
        </h1>
      </div>
      <div className='grid lg:grid-cols-4 justify-center gap-7 ml-3'>
        {products.map(product => (
          <ProductCard
            name={product.name}
            price={product.price}
            productId={product.id}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Products;
