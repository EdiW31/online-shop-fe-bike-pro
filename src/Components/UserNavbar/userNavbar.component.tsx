import { useState, useEffect } from 'react';
import LogoIcon from '../../Assets/brandIcon.png';
import { getOrderByUser } from '../../EndPoints/Order/order.endpoints';
import { getProductById } from '../../EndPoints/Products/products.endpoints';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  categoryId: number;
  price: number;
}

export const UserNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //cart functions
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    seeOrder();
  };

  const seeOrder = async () => {
    const userId = localStorage.getItem('user');
    const user = userId ? JSON.parse(userId) : null;
    if (!user) {
      return;
    }
    let productIds: number[] = [];
    if (user) {
      // Fetch orders for the connected user
      const orders = await getOrderByUser(user.id);
      // Reset and update productIds with the new user's order items
      productIds = orders.flatMap((order: any) =>
        order.items.map((item: any) => item.productId),
      );
    } else {
      // If no user is connected, reset productIds to an empty array
      productIds = [];
    }
    // Assume we have an endpoint that returns an array of objects of type {productId: number, quantity: number, totalPrice: number}
    Promise.all(
      productIds.map(id => {
        return getProductById(id).then(product => {
          return product;
        });
      }),
    )
      .then(products => {
        setProducts(products);
      })
      .catch(error => {
        console.error('Failed to fetch products', error);
      });
  };

  useEffect(() => {
    seeOrder();
  }, []);
  //end cart functions

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div>
      <nav className='bg-gray-800'>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
          <div className='relative flex h-16 items-center justify-between'>
            <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
              {/* Mobile menu button*/}
              <button
                type='button'
                onClick={toggleMobileMenu}
                className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                aria-controls='mobile-menu'
                aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
              >
                <span className='absolute -inset-0.5'></span>
                <span className='sr-only'>Open main menu</span>
                {/* Icon when menu is closed. Menu open: "hidden", Menu closed: "block" */}
                <svg
                  className='block h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                  />
                </svg>
                {/* Icon when menu is open. Menu open: "block", Menu closed: "hidden" */}
                <svg
                  className='hidden h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
              <div className='flex flex-shrink-0 items-center'>
                <img
                  className='h-10 w-auto'
                  src={LogoIcon}
                  alt='Your Company'
                />
              </div>
              <div className='hidden sm:ml-6 sm:block'>
                <div className='flex space-x-4'>
                  {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                  <a
                    href='#'
                    className='rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white'
                    aria-current='page'
                  >
                    Products
                  </a>
                  <a
                    href='#'
                    className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                  >
                    Favorites
                  </a>
                  {(() => {
                    const user = localStorage.getItem('user');
                    const userDetails = user ? JSON.parse(user) : null;

                    if (!userDetails) {
                      return null;
                    }

                    return (
                      <>
                        {userDetails.role === 'ADMIN' && (
                          <a
                            href='/admin'
                            className='rounded-md px-3 py-2 text-sm font-medium text-orange-700 bg-gray-200 hover:bg-orange-700 hover:text-white'
                          >
                            Admin Panel
                          </a>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
              <button
                type='button'
                className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                onClick={toggleCart}
              >
                <span className='absolute -inset-1.5'></span>
                <span className='sr-only'>ViewCart</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                  />
                </svg>
                {isCartOpen && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      ease: 'easeInOut',
                      duration: 0.8,
                      delay: 0.2,
                    }}
                  >
                    <div
                      className='relative z-50'
                      aria-labelledby='slide-over-title'
                      role='dialog'
                      aria-modal='true'
                    >
                      {/* Background backdrop, show/hide based on slide-over state.
                Entering: "ease-in-out duration-500"
                From: "opacity-0"
                To: "opacity-100"
                Leaving: "ease-in-out duration-500"
                From: "opacity-100"
                To: "opacity-0" */}
                      <div
                        className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
                        aria-hidden='true'
                      ></div>

                      <div className='fixed inset-0 overflow-hidden'>
                        <div className='absolute inset-0 overflow-hidden'>
                          <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                            {/* Slide-over panel, show/hide based on slide-over state.
                        Entering: "transform transition ease-in-out duration-500 sm:duration-700"
                        From: "translate-x-full"
                        To: "translate-x-0"
                        Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
                        From: "translate-x-0"
                      To: "translate-x-full" */}
                            <div className='pointer-events-auto w-screen max-w-md'>
                              <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                                <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                                  <div className='flex items-start justify-between'>
                                    <h2
                                      className='text-lg font-medium text-gray-900'
                                      id='slide-over-title'
                                    >
                                      Shopping cart
                                    </h2>
                                    <div className='ml-3 flex h-7 items-center'>
                                      <button
                                        type='button'
                                        className='relative -m-2 p-2 text-gray-400 hover:text-gray-500'
                                        onClick={toggleCart}
                                      >
                                        <span className='sr-only'>
                                          Close panel
                                        </span>
                                        <svg
                                          className='h-6 w-6'
                                          fill='none'
                                          viewBox='0 0 24 24'
                                          strokeWidth='1.5'
                                          stroke='currentColor'
                                          aria-hidden='true'
                                        >
                                          <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M6 18L18 6M6 6l12 12'
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>

                                  {products.map(product => (
                                    <div>
                                      <div className='mt-8'></div>
                                      <div className='flow-root'>
                                        <ul
                                          role='list'
                                          className='-my-6 divide-y divide-gray-200'
                                        >
                                          <li className='flex py-6'>
                                            <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                              <img
                                                src='https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg'
                                                alt='Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.'
                                                className='h-full w-full object-cover object-center'
                                              />
                                            </div>

                                            <div className='ml-4 flex flex-1 flex-col'>
                                              <div>
                                                <div className='flex justify-between text-base font-medium text-gray-900'>
                                                  <h3>
                                                    <a
                                                      href={`/products/${product.id}`}
                                                    >
                                                      {product.name}
                                                    </a>
                                                  </h3>
                                                  <p className='ml-4'>
                                                    ${product.price}
                                                  </p>
                                                </div>
                                                <p className='mt-1 text-sm text-gray-500'>
                                                  Product ID: {product.id}
                                                </p>
                                              </div>
                                              <div className='flex flex-1 items-end justify-between text-sm'>
                                                <p className='text-gray-500'>
                                                  Category ID:{' '}
                                                  {product.categoryId}
                                                </p>

                                                <div className='flex'>
                                                  <button
                                                    type='button'
                                                    className='font-medium text-indigo-600 hover:text-indigo-500'
                                                  >
                                                    Remove
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          {/* More products... */}
                                        </ul>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                                  <div className='flex justify-between text-base font-medium text-gray-900'>
                                    <p>Subtotal</p>
                                    <p>
                                      $
                                      {products.reduce(
                                        (total, product) =>
                                          total + Number(product.price),
                                        0,
                                      )}
                                    </p>
                                  </div>
                                  <p className='mt-0.5 text-sm text-gray-500'>
                                    Shipping and taxes calculated at checkout.
                                  </p>
                                  <div className='mt-6'>
                                    <a
                                      href='#'
                                      className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                                    >
                                      Checkout
                                    </a>
                                  </div>
                                  <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                                    <p>
                                      or
                                      <a
                                        href='/products'
                                        type='button'
                                        className='ml-1 font-medium text-indigo-600 hover:text-indigo-500'
                                      >
                                        Continue Shopping{' '}
                                        <span aria-hidden='true'> &rarr;</span>
                                      </a>
                                      x
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </button>

              {/* Profile dropdown */}
              {localStorage.getItem('user') ? (
                <div className='relative ml-3'>
                  <div>
                    <button
                      type='button'
                      onClick={toggleDropdown}
                      className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                      id='user-menu-button'
                      aria-expanded='false'
                      aria-haspopup='true'
                    >
                      <span className='absolute -inset-1.5'></span>
                      <span className='sr-only'>Open user menu</span>
                      <img
                        className='h-8 w-8 rounded-full'
                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        alt=''
                      />
                    </button>
                  </div>

                  {isDropdownOpen && (
                    <div
                      className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5'
                      role='menu'
                      aria-orientation='vertical'
                      aria-labelledby='user-menu-button'
                      tabIndex={-1}
                    >
                      <a
                        href='/favorites'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        role='menuitem'
                        tabIndex={-1}
                      >
                        Account
                      </a>
                      {localStorage.getItem('role') === 'admin' && (
                        <a
                          href='/admin'
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                          role='menuitem'
                          tabIndex={-1}
                        >
                          Admin Panel
                        </a>
                      )}
                      <button onClick={handleLogout}>
                        <a
                          href='#'
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                          role='menuitem'
                          tabIndex={-1}
                        >
                          Sign Out
                        </a>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type='button'
                  className='relative ml-3 flex rounded-md bg-orange-400 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 p-2'
                >
                  <span className='sr-only'>Sign in</span>
                  <a href='/auth/signup'>Sign Up</a>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state. */}
        {isMobileMenuOpen && (
          <div className='sm:hidden' id='mobile-menu'>
            <div className='space-y-1 px-2 pb-3 pt-2'>
              <a
                href='#'
                className='block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white'
                aria-current='page'
              >
                Products
              </a>
              <a
                href='#'
                className='block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
              >
                Favorites
              </a>
              {(() => {
                const user = localStorage.getItem('user');
                const userDetails = user ? JSON.parse(user) : null;

                if (!userDetails) {
                  return null;
                }

                return (
                  <div className='mt-5'>
                    {userDetails.role === 'ADMIN' && (
                      <a
                        href='/admin'
                        className='rounded-md px-3 py-2 text-sm font-medium text-orange-700 bg-gray-200 hover:bg-orange-700 hover:text-white mt-3'
                      >
                        Admin Panel
                      </a>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default UserNavbar;
