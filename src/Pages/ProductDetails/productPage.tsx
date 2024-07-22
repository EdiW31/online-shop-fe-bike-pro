import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../Components/UserNavbar/userNavbar.component';
import Footer from '../../Components/Footer/footer.component';
import { getProductById } from '../../EndPoints/Products/products.endpoints';
import { addFavorite, getFavorites, removeFavorite } from '../../EndPoints/Favorites/favorites.endpoint';
import { createOrder } from '../../EndPoints/Order/order.endpoints';

interface Product {
    name: string;
    categoryId: number;
    description?: string;
    price: number;
    photos: Photo[];
}

type Photo = {
    id: number;
    photoUrl: string;
    productId: number;
};

type Favorites = {
    productId: number;
    id: number;
};

interface Order {
    productId: number;
    quantity: number;
    totalPrice: number;
}

const ProductPage = () => {

    const [product, setProduct] = useState<Product | null>(null);
    const [favorites, setFavorites] = useState<Favorites[]>([]);

    const {id} = useParams();
    const productId = parseInt(id) ?? 0;

    const handleAddToCart = async () => {
      try {
        const order = {
          productId: productId,
          quantity: 1,
          totalPrice: product?.price ?? 0
        };
      
        const user = localStorage.getItem('user');
        const userJson = user ? JSON.parse(user) : null;

        const response = await createOrder(order, userJson.id, productId);
        console.log(response);
      } catch (error) {
        console.error("Failed to add to cart:", error);
        // Handle the error appropriately in the UI
      }
    };

    const handleAddFavorite = async (productid:number) => {
        window.location.reload();
    
        const token = localStorage.getItem('token') || '';
        console.log(token);
        const response = await addFavorite(productid, token);
        console.log(response);
      } 

      const handleDeleteFavorite = async (productId: number) => {
        // gaseste produsul favorit cu id-ul dat
        const favorite = favorites.find(favorite => favorite.productId === productId);
        window.location.reload();
    
        if (favorite) {
          await removeFavorite(favorite.id);
        } else {
          console.log("Favorite not found for the given Product ID.");
        }
      }

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await getProductById(productId);
            setProduct(response);
        }

        const fetchFavorites = async () => {
      const token = localStorage.getItem('token') || '';
      const response = await getFavorites(token);
      setFavorites(response);
    };

        fetchFavorites();
        fetchProduct();
    }, [id]);

    console.log(product?.photos.map(photo => photo.photoUrl).join(','));

  return (
    <div>
        <Navbar />
        <section className="text-gray-700 body-font overflow-hidden bg-white">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-[1200px] mx-auto flex flex-wrap">
      <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200 bg-no-repeat bg-" src={`http://localhost:8000/${product?.photos.map(photo => photo.photoUrl).join(',')}`}/>
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">{product?.categoryId}</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product?.name}</h1> 
        <h1 className='text-2xl mt-4'>Description:</h1>
        <p className="leading-relaxed">{product?.description}</p>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
          <div className="flex">
            <span className="mr-3">Color</span>
            <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
            <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
            <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
          </div>
          <div className="flex ml-6 items-center">
            <span className="mr-3">Size</span>
            <div className="relative">
              <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                <option>SM</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="flex">
          <span className="title-font font-medium text-2xl text-gray-900">${product?.price}</span>
          <button onClick={handleAddToCart} className="mr-4 flex ml-auto text-white bg-slate-700 border-0 py-2 px-6 focus:outline-none hover:bg-slate-600 rounded">Add to Cart</button>
          {favorites.some((favorite) => favorite.productId === parseInt(id)) ? (
    <button
      onClick={() => handleDeleteFavorite(parseInt(id))}
      className='flex-none flex items-center justify-center w-9 h-9 rounded-md text-red-500 border border-red-200'
      type='button'
      aria-label='Remove from Favorites'
    >
      {/* Icon or text indicating removal from favorites */}
      <svg
        width='20'
        height='20'
        fill='currentColor'
        aria-hidden='true'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
        />
      </svg>
    </button>
            ) : (
            <button
              onClick={() => handleAddFavorite(parseInt(id))}
              className='flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200'
              type='button'
              aria-label='Favorites'
            >
              {/* Existing SVG for adding to favorites */}
              <svg
                width='20'
                height='20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
</section>
        <Footer />
    </div>
  )
}

export default ProductPage
