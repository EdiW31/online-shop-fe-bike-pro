import React from 'react';
import BgImage from '../../Assets/bg-slate.png';
import BikeImage from '../../Assets/whiteBike-removebg.png';
import { easeIn, easeInOut, easeOut, motion } from 'framer-motion';
import Footer from '../Footer/footer.component';
import Mtb from '../../Assets/mtb.webp';
import Gravel from '../../Assets/gravel.webp';
import Road from '../../Assets/roadbike.webp';
import WorldMap from '../../Assets/world-map.png';
import Logo from '../../Assets/brandIcon.png';

const bgImage = {
  backgroundImage: `url(${BgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

export const Hero = () => {
  return (
    <main style={bgImage}>
      <section className='min-h-[750px] w-full'>
        {/* Hero Section */}
        <div className='container'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center min-h-[800px]'>
            {/* text content  */}
            <div className='text-orange-200 mt-[100px] md:mt-0 p-4 space-y-10'>
              <h1 className='text-7xl font-bold leading-tight ml-14'>
                Bike Pro.
              </h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  ease: easeIn,
                  duration: 2,
                }}
                className='relative z-10 space-y-3'
              >
                <h1 className='text-2xl'>Best Bike Shop,</h1>
                <h1 className='text-sm opacity-55 leading-loose'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat, officia iusto illum laboriosam praesentium ipsum
                  nihil consectetur laborum temporibus aliquam saepe suscipit
                  esse dolorem!
                </h1>
              </motion.div>
              <motion.div
                className='text-center'
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ease: easeOut, duration: 1 }}
              >
                <a
                  href='/products'
                  className='lg:animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium bg-orange-400  px-4 py-2 rounded-lg tracking-wide text-white'
                >
                  <span className='ml-2'>Check Our bikes! 🚲</span>
                </a>
              </motion.div>
            </div>
            {/* Image Section */}
            <div className='relative col-span-2'>
              <img
                src={BikeImage}
                alt='bike'
                className='relative z-40 h-[230px] md:h-[300px] lg:h-[400px] img-shadow1 -bottom-0 lg:-bottom-5'
              />
              {/* ring circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ease: easeInOut, duration: 0.5 }}
                className='h-[90px] w-[90px]  lg:h-[180px] lg:w-[180px] absolute top-10 right-2 lg:-right-4 border-orange-300 border-[10px] lg:border-[20px] z-10 rounded-full'
              ></motion.div>
              <motion.div
                initial={{ bottom: -30 }}
                animate={{ bottom: 20 }}
                transition={{ ease: easeOut, duration: 1 }}
                className='hidden lg:block absolute bottom-20 left-[170px] '
              >
                <h1 className='text-[170px] scale-150 font-bold text-black/20 leading-none'>
                  bike pro
                </h1>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Middle Part */}
        <div className='flex bg-slate-100 w-full'>
          <main className='max-w-6xl mx-auto pt-10 pb-36 px-8'>
            <div className='max-w-md mx-auto mb-14 text-center'>
              <h1 className='text-4xl font-semibold mb-6 lg:text-5xl'>
                <span className='text-orange-600'>Categories.</span> Check them
                out!
              </h1>
              <p className='text-xl text-gray-500 font-medium'>
                Choose the best one for you!
              </p>
            </div>

            <div className='flex flex-col justify-between items-center lg:flex-row lg:items-start'>
              <div className='w-full flex-1 mt-8 p-8 order-2 bg-white shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-1 lg:rounded-r-none'>
                <div className='mb-7 pb-7 flex items-center border-b border-gray-300'>
                  <img src={Mtb} alt='' className='rounded-3xl w-20 h-20' />
                  <div className='ml-5'>
                    <span className='block text-2xl font-semibold'>
                      Mountain Bikes
                    </span>
                  </div>
                </div>
                <ul className='mb-7 font-medium text-gray-500'>
                  <li className='flex text-lg mb-2'>
                    <span className='ml-3'>
                      Good on every<span className='text-black'>surface</span>
                    </span>
                  </li>
                  <li className='flex text-lg mb-2'>
                    <span className='ml-3'>
                      Flexible, for <span className='text-black'>everyone</span>
                    </span>
                  </li>
                  <li className='flex text-lg'>
                    <span className='ml-3'>
                      <span className='text-black'>Easy </span>to use!
                    </span>
                  </li>
                </ul>
                <a
                  href='/products'
                  className='flex justify-center items-center bg-orange-600 rounded-xl py-5 px-4 text-center text-white text-xl'
                >
                  Check them out!
                </a>
              </div>

              <div className='w-full flex-1 p-8 order-1 shadow-xl rounded-3xl bg-gray-900 text-gray-400 sm:w-96 lg:w-full lg:order-2 lg:mt-0'>
                <div className='mb-8 pb-8 flex items-center border-b border-gray-600'>
                  <img src={Road} alt='' className='rounded-3xl w-20 h-20' />
                  <div className='ml-5'>
                    <span className='block text-3xl font-semibold text-white'>
                      Road Bikes
                    </span>
                  </div>
                </div>
                <ul className='mb-10 font-medium text-xl'>
                  <li className='flex mb-6'>
                    <span className='ml-3'>
                      Made for<span className='text-white'> Roads</span>
                    </span>
                  </li>
                  <li className='flex mb-6'>
                    <span className='ml-3'>
                      Very <span className='text-white'>Light Weight!</span>
                    </span>
                  </li>
                  <li className='flex mb-6'>
                    <span className='ml-3'>
                      Fast<span className='text-white'> is the word </span>
                    </span>
                  </li>
                </ul>
                <a
                  href='/products'
                  className='flex justify-center items-center bg-white rounded-xl py-6 px-4 text-center text-orange-600 text-2xl'
                >
                  Check them out!
                  <img
                    src='https://res.cloudinary.com/williamsondesign/arrow-right.svg'
                    className='ml-2'
                    alt='arrow-right'
                  />
                </a>
              </div>

              <div className='w-full flex-1 mt-8 p-8 order-2 bg-white shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-3 lg:rounded-r-none'>
                <div className='mb-7 pb-7 flex items-center border-b border-gray-300'>
                  <img src={Gravel} alt='' className='rounded-3xl w-20 h-20' />
                  <div className='ml-5'>
                    <span className='block text-2xl font-semibold'>
                      Gravel Bike
                    </span>
                  </div>
                </div>
                <ul className='mb-7 font-medium text-gray-500'>
                  <li className='flex text-lg mb-2'>
                    <span className='ml-3'>
                      Good on every<span className='text-black'>surface</span>
                    </span>
                  </li>
                  <li className='flex text-lg mb-2'>
                    <span className='ml-3'>
                      Best for <span className='text-black'>comuting</span>
                    </span>
                  </li>
                  <li className='flex text-lg'>
                    <span className='ml-3'>
                      <span className='text-black'>MTB+RB </span>in one!
                    </span>
                  </li>
                </ul>
                <a
                  href='/products'
                  className='flex justify-center items-center bg-indigo-600 rounded-xl py-5 px-4 text-center text-white text-xl'
                >
                  Check them out!
                </a>
              </div>
            </div>
          </main>
        </div>

        {/* World Map */}
        <div className='container my-36'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap08 place-items-center'>
          <div className='col-span-2'>
                <img src={WorldMap}  alt='' className='w-full sm:w-[500] mx-auto'/>
            </div>
            <div className='flex justify-center flex-col'>
              <h1 className='text-4xl font-semibold text-center text-orange-600 mb-5'>
                Where do we deliver?
              </h1>
              <p className='text-center text-white text-3xl'>Everywhere! Because we are</p>
              <img src={Logo} alt=''/>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='flex flex-col  w-full'>
          <Footer />
        </div>
      </section>
    </main>
  );
};

export default Hero;
