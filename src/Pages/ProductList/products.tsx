import { useCallback, useState, useEffect } from 'react';
import Footer from '../../Components/Footer/footer.component';
import UserNavbar from '../../Components/UserNavbar/userNavbar.component';
import { getProducts, getProductsByCategory } from '../../EndPoints/Products/products.endpoints';
import { getCategory } from '../../EndPoints/Category/category.enpoints';
import ProductCard from '../../Components/ProductCard/productCard.component';
import BackgroundImage from '../../Assets/4k.jpg';

interface Photo {
  id: number;
  photoUrl: string;
  productId: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  photos: Photo[];
}

interface Category {
  id: number;
  name: string;
}

export const Products = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [productMtb, setProductMtb] = useState<Product[]>([]);
  const [productRoad, setProductRoad] = useState<Product[]>([]);
  const [productGrvl, setProductGrvl] = useState<Product[]>([]);
  const [shownProducts, setShownProducts] = useState<Product[]>([]);
  
  // fetch la categorii
  const fetchCategories = async () => {
    const response = await getCategory();
    setCategories(response);
  };

  // fetch produse 
  const fetchProducts = useCallback(async () => {
    const response = selectedCategoryId ? await getProductsByCategory(selectedCategoryId) : await getProducts();
    setShownProducts(response);
  }, []);
  
  // fetch produse dupa categorie
  const fetchProductsGrvl = async () => {
    try {
      const response = await getProductsByCategory(3);
      setProductGrvl(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  

  const fetchProductsMtb = async () => {
    try {
      const response = await getProductsByCategory(1);
      setProductMtb(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  const fetchProductsRoad = async () => {
    const response = await getProductsByCategory(2);
    setProductRoad(response);
  }
  
  const handleCategoryChange = useCallback((categoryId: number | null) => {
    // daca aceasi categorie este selectata afiseaza toate
    setSelectedCategoryId(prevCategoryId => prevCategoryId === categoryId ? null : categoryId);
  }, []);

  const chooseCategory = (categoryId: number | null) => {
    switch (categoryId) {
      case 1:
        setShownProducts(productMtb);
        break;
      case 2:
        setShownProducts(productRoad);
        break;
      case 3:
        setShownProducts(productGrvl);
        break;
      default:
        console.log('No category selected');
    }
  }

  const handleCategoryClick = (categoryId: number | null) => {
    handleCategoryChange(categoryId);
    chooseCategory(categoryId);
  }

  

  useEffect(() => {
    fetchProductsGrvl();
    fetchProductsRoad();
    fetchProductsMtb();
    fetchCategories();
    fetchProducts();
    
  }, [handleCategoryChange, fetchProducts,]);


  return (
    <div>
      <UserNavbar />
      <div
        className='bg-no-repeat bg-cover bg-center brightness-75'
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          height: '60vh',
        }}
      >
        <div className='grid grid-cols-2 justify-center items-center h-full'>
          <div className='ml-16'>
            <h1 className='text-3xl lg:text-5xl text-white font-semibold mb-3'>These are all our products!</h1>
            <p className='lg:tet-3xl text-white'>You can also choose to see the products by their categories.</p>
          </div>
        </div>
      </div>
      <div className='flex justify-start p-2 bg-orange-400 '>
        <div className='justify-start p-2 font-sans'>
          {categories &&categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className='text-slate-800  ml-5 mr-5 px-2 rounded-md'
            >
              {category.name}
            </button>
          ))}
          <button className='text-black ml-5 mr-5 px-2 py-[3px] rounded-md bg-white'>
            <a href='/products'>All Products</a>
          </button>
        </div>
      </div>
      
      <div className='grid lg:grid-cols-3 grid-cols-1 justify-center gap-5  '>
        {shownProducts && shownProducts.map(product => (
          <ProductCard
            key={product.id}
            category={categories.find(category => category.id === product.categoryId)?.name}
            name={product.name}
            price={product.price}
            productId={product.id}
            photoUrl={product.photos}
          />
        ))}
      </div>
      <div className='w-full h-1 bg-slate-100'/>
      <Footer />
    </div>
  );
};

export default Products;