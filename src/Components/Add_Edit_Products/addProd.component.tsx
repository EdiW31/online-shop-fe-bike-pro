import { PhotoIcon, } from '@heroicons/react/24/solid'
import { createProduct, addPhoto, getProducts } from '../../EndPoints/Products/products.endpoints'
import { getCategory } from '../../EndPoints/Category/category.enpoints'
import { useState, useEffect } from 'react'



interface Product {
    name: string,
    categoryId: number,
    description: string,
    price: number
}

interface Category {
    id: number,
    name: string
}

interface AddProdProps {
    onProductChange: () => void;
}

export function AddProd({ onProductChange }: AddProdProps){

    const [categories, setCategories] = useState<Category[]>([]);
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState(0);
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await getCategory();
            setCategories(fetchedCategories);
        };

        const fetchProducts = async () => {
            const fetchedProducts = await getProducts();
            setProducts(fetchedProducts);
        }
        fetchCategories();
        fetchProducts();
    }, []);

    const handleAddProduct = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const product: Product = {
                name: productName,
                categoryId: productCategory,
                description: productDescription,
                price: productPrice
            }
            const data = await createProduct(product.name, product.categoryId, product.description, product.price);
            console.log('Product created:', data);
            // Add any post-creation logic here (e.g., redirecting the user or clearing the form)
        } catch (error) {
            console.error('Error creating product:', error);
        }
    }

    const handleAddPhoto = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const photo = (document.getElementById('file-upload') as HTMLInputElement).files?.[0];
            if (!photo) {
                console.error('No photo selected');
                return;
            }
            const productId = products.length+1; // Replace with the actual product ID
            const data = await addPhoto(productId, photo);
            console.log('Photo uploaded:', data);
            // Add any post-upload logic here (e.g., displaying the photo or clearing the input)
        } catch (error) {
            console.error('Error uploading photo:', error);
        }
    }

    const handleAddPhotoToForm = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files ? e.target.files[0]: null;
            if(file){
                setPhoto(file);
                const photoPreviewUrl = URL.createObjectURL(file);
                setPhotoPreviewUrl(photoPreviewUrl);
            }
    }

    const handleSave = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleAddProduct(e);
        handleAddPhoto(e);
    }
 return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Product Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    placeholder='Product Name here'
                    className="block flex-1 border-0 bg-    transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    type="text"
                    value={productName}
                    onChange = {(e)=> setProductName(e.target.value)}
                  />
                </div>

                <label className="mt-10 block text-sm font-medium leading-6 text-gray-900">
                    Price
                </label>
                <input 
                    type="number"
                    className="block flex-1 border-0 bg-gray-100 py-1.5 pl-1 text-gray-900 placeholder:text-gray-600 focus:ring-0 sm:text-sm sm:leading-6"
                    value={productPrice}
                    onChange={(e) => {
                        const price = parseFloat(e.target.value);
                        if (!isNaN(price)) {
                            setProductPrice(price); // Set the price if it's a valid number
                        } else {
                            setProductPrice(0); // Set to an empty string or 0 if the input is not a number
                        }
                    }}
                >

                </input>
                
                <label htmlFor="username" className="mt-10 block text-sm font-medium leading-6 text-gray-900">
                Category
                </label>
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <select 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={productCategory}
                    onChange={(e) => setProductCategory(parseInt(e.target.value))}
                >
                    <option selected>Choose a category</option>
                    {categories.map((category) => (
                        <option value={category.id}>{category.name}</option>
                    ))}
                </select>
                </div>
              </div>
            </div>

            <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                        <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleAddPhotoToForm} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        {/* Photo preview */}
                        {photoPreviewUrl && <img src={photoPreviewUrl} alt="Preview" className="mt-4 max-h-40" />}
                    </div>
                </div>
            </div>
            {/* Submit buttons */}
          </div>
        </div>        
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSave}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}