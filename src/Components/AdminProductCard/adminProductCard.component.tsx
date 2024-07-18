import React from 'react'
import { deleteProduct } from '../../EndPoints/Products/products.endpoints'

interface AdminProductCardProps {
    productKey: number;
    name: string;
    price: number;
}

export const AdminProductCard: React.FC<AdminProductCardProps> = ({name, price, productKey}) => {

    const handleDelete = async () => {
        try {
            // Assuming `key` is of type number or can be directly used as an ID.
            const data = await deleteProduct(productKey);
            console.log('Product deleted:', productKey);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    return (
    <div>
        <div className="bg-gray-100 rounded-2xl p-5 z-0 cursor-pointer hover:-translate-y-2 transition-all relative sm:max-w-80">

            <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
                <img src="https://readymadeui.com/images/product9.webp" alt="Product 1"
                className="h-full w-full object-contain" />
            </div>

            <div>
                <h3 className="text-lg font-extrabold text-gray-800">{name}</h3>
                <p className="text-gray-600 text-sm mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <h4 className="text-lg text-gray-800 font-bold mt-4">${price}</h4>
            </div>
            
            <div className='flex gap-4 justify-around mt-3  '>
                <button className='h-10 w-28 bg-red-600 rounded-full'onClick={handleDelete}>
                    Delete
                </button>
                <button className='h-10 w-28 bg-purple-300 rounded-full'>
                    Edit
                </button>
            </div>

            </div>
        </div>
    )
}

export default AdminProductCard
