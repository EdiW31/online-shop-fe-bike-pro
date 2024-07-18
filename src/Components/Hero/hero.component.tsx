import React from 'react'
import BgImage from '../../Assets/bg-slate.png'
import BikeImage from '../../Assets/whiteBike-removebg.png'
import {easeIn, easeInOut, easeOut, motion} from 'framer-motion'

const bgImage = {
    backgroundImage: `url(${BgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
}

export const Hero = () => {
  return (
    <main style={bgImage}>
        <section className="min-h-[750px] w-full">
            <div className="container">
                {/* Navbar Section */}

                {/* Hero Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center min-h-[800px]">
                    {/* text content  */}
                    <div className='text-orange-200 mt-[100px] md:mt-0 p-4 space-y-10'>
                        <h1 className='text-7xl font-bold leading-tight ml-14'>
                            Bike Pro.
                        </h1>
                        <motion.div 
                            initial={{opacity:0}}
                            animate={{opacity:1}}
                            transition={{
                                ease: easeIn,
                                duration: 2
                            }}
                            className='relative z-10 space-y-3'
                        >
                            <h1 className='text-2xl'>
                                Best Bike Shop,
                            </h1>
                            <h1 className='text-sm opacity-55 leading-loose'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, officia iusto illum laboriosam praesentium ipsum nihil consectetur laborum temporibus aliquam saepe suscipit esse dolorem!
                            </h1>
                        </motion.div>
                        <motion.div className='text-center' initial={{scale:0}} animate={{scale:1}} transition={{ease:easeOut, duration: 1}}>
                        <a href="/products"
                            className="lg:animate-bounce focus:animate-none hover:animate-none inline-flex text-md font-medium bg-orange-400  px-4 py-2 rounded-lg tracking-wide text-white">
                            <span className="ml-2">Check Our bikes! 🚲</span>
                        </a>
                        </motion.div>
                    </div>
                    {/* Image Section */}
                    <div className='relative col-span-2'>
                        <img src={BikeImage} alt='bike' className='relative z-40 h-[230px] md:h-[300px] lg:h-[400px] img-shadow1 -bottom-0 lg:-bottom-5' /> 
                        {/* ring circle */}
                        <motion.div initial={{scale: 0}} animate={{scale:1}} transition={{ease:easeInOut, duration:0.5}} className='h-[90px] w-[90px]  lg:h-[180px] lg:w-[180px] absolute top-10 right-2 lg:-right-4 border-orange-300 border-[10px] lg:border-[20px] z-10 rounded-full'></motion.div>
                        <motion.div initial={{bottom:-30}} animate={{bottom:20}} transition={{ease:easeOut, duration:1}}className='hidden lg:block absolute bottom-20 left-[170px] '>
                        <h1 className='text-[170px] scale-150 font-bold text-black/20 leading-none'>
                            bike pro
                        </h1>
                        </motion.div>
                    </div>
                </div>
                {/* Image Section */}
            </div>
        </section>
    </main>
  )
}

export default Hero
