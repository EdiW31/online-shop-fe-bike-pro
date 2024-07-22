import { createOrder } from '../../EndPoints/Order/order.endpoints';
import { addFavorite, getFavorites, removeFavorite } from '../../EndPoints/Favorites/favorites.endpoint';
import { useEffect, useState } from 'react';


type ProductCardProps = {
  name: string;
  productId: number;
  price: number;
  category: any;
  photoUrl: any;
};

type Favorites = {
  productId: number;
  id: number;
};

export const ProductCard: React.FC<ProductCardProps> = ({

  name,
  productId,
  price,
  photoUrl,

}) => {
  const [favorites, setFavorites] = useState<Favorites[]>([]);

  const user = localStorage.getItem('user');
  const userJson = user != null ? JSON.parse(user) : null;

  const handleAddToCart = async () => {
    try {
      const order = {
        productId: productId,
        quantity: 1,
        totalPrice: price,
      };
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
    const fetchFavorites = async () => {
      const token = localStorage.getItem('token') || '';
      const response = await getFavorites(token);
      setFavorites(response);
    };
    fetchFavorites();
  }, []);
  

  return (
    <div>
      {/* <!-- component --> */}
      <div className='group my-10 flex w-full max-w-[570px] flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md'>
        <a
          className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl'
          href='#/'
        >
          <img
            className='peer absolute top-0 right-0 h-full w-full object-cover'
            src={`http://localhost:8000/${photoUrl ? photoUrl.map((photo: any) => photo.photoUrl): ''}`}
            alt='salut'
          />
        </a>
        <div className=' flex flex-col mt-4 px-5 pb-5 text-center justify-center'>
          <a href={`/product/${productId}`}>
            <h5 className='text-xl tracking-tight text-slate-900'>{name}</h5>
          </a>
          <div className='flex justify-around my-3'>  
          <a href='#/'>
            <h5 className='text-xl tracking-tight text-slate-900'>$ {price}</h5>
          </a>
          {favorites.some((favorite) => favorite.productId === productId) ? (
    <button
      onClick={() => handleDeleteFavorite(productId)}
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
              onClick={() => handleAddFavorite(productId)}
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
          <a
            href='#/'
            className='flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='mr-2 h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
              />
            </svg>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
