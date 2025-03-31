import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayCOPCurrency from '../helpers/displayCurrency'
import addToCart from '../helpers/addToCart'
import { Link, useLocation  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import Context from '../context';
import scrollTop from '../helpers/scrollTop';

//pasamos category como parametros a donde se llame la funcion <HorizontalCardProduct/>
const CategoryWiseProductDisplay = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)
    const {fetchUserAddToCart} = useContext(Context)


    const handleAddToCart = async(e, id)=>{
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    const navigate = useNavigate()


    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        console.log(categoryProduct.data)
        setLoading(false)
        setData(categoryProduct?.data)
    }



    useEffect(() => {
        fetchData()
    }, [])

  
    return (
        <div className='container mx-auto px-4   my-0     relative '>
            
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
            <div className='grid grid-cols-1 place-items-center md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-y-4 md:gap-6'>
            {
                loading ? (
                    loadingList.map((product, index) => {
                        return (
                            <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                <div className='bg-white h-full p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center'>
                                </div>
    
                                <div className='p-4 grid w-full gap-2  '>
                                <h2 className='font-medium text-md md:text-md text-black text-ellipsis line-clamp-1 bg-slate-300 w-full'></h2>
                                <p className='capitalize text-slate-500 p-1 bg-slate-200 w-full'>{product?.category}</p>
                                <div className='flex gap-3 '>
                                    <p className='text-slate-500 line-through p-1 bg-slate-200 w-full'></p>
                                    <p className='text-red-600 font-medium p-1 bg-slate-200'></p>
                                </div>
                                
                                <button className='text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-0.5 rounded-full w-full'></button>
                                </div>
                            </div>
                        )
                    })
                ):(
                    data.map((product, index) => {
                        return (
                            //para enviar arriba de la pagina es con }
                            <Link key={product._id}  to={`/product/${product._id}`} onClick={scrollTop}   className='w-full min-w-[280px] md:min-w-[290px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex mb-4 md:mb-2'>
                                <div className='bg-white h-full p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center'>
                                    <img src={product.productImage[0]}  className='object-scale-down h-full hover:scale-110 transition-all' />
                                </div>
    
                                <div className='p-1 '>
                                <h2 className='font-medium text-md md:text-md text-black text-ellipsis line-clamp-1'>{product.productName}</h2>
                                <p className='capitalize text-slate-500'>{product?.category}</p>
                                <div className='flex gap-3'>
                                    <p className='text-slate-500 line-through'>{displayCOPCurrency(product.price)}</p>
                                </div>
                                <div className='flex gap-3'>
                                    <p className='text-red-600 font-medium'>{displayCOPCurrency(product.sellingPrice)}</p>
                                </div>
                            <button className='text-sm bg-red-600 hover:bg-blue-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e, product?._id)}>Add to Cart</button>
                                </div>
                            </Link>
                        )
                    })
                )
               
            }
            </div>

        </div>
    )
}

export default CategoryWiseProductDisplay