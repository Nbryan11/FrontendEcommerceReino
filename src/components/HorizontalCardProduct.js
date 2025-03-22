import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayCOPCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scroll, setScroll] = useState(0);
    const scrollElement = useRef();

    // Para actualizar el número que está en la canasta
    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const loadingList = new Array(13).fill(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const categoryProduct = await fetchCategoryWiseProduct(category);
            if (categoryProduct && categoryProduct.data) {
                setData(categoryProduct.data);
            } else {
                setData([]); // Si no hay datos, establece `data` como un array vacío
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]); // En caso de error, establece `data` como un array vacío
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]); // Asegúrate de incluir `category` como dependencia

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    };

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    };

    return (
        <div className="container mx-auto px-4 pt-6 relative ">
            <h2 className="text-2xl font-semibold py-4">{heading}</h2>
            <div className="relative">
                {/* Flechas de navegación dentro de un div relativo */}
                <button className="bg-slate-300 shadow-sm rounded-full p-2 absolute left-2 top-1/2 transform -translate-y-1/2 text-lg hidden md:block" onClick={scrollLeft}>
                    <FaAngleLeft />
                </button>
                <button className="bg-slate-300 shadow-sm rounded-full p-2 absolute right-2 top-1/2 transform -translate-y-1/2 text-lg hidden md:block" onClick={scrollRight}>
                    <FaAngleRight />
                </button>
    
                <div className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all bg-white" ref={scrollElement}>
                    {loading ? (
                        loadingList.map((product, index) => (
                            <div key={index} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                                <div className="bg-white h-full p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center"></div>
                                <div className="p-4 grid w-full gap-2">
                                    <h2 className="font-medium text-md md:text-md text-black text-ellipsis line-clamp-1 bg-slate-300 w-full"></h2>
                                    <p className="capitalize text-green-500 p-1 bg-slate-200 w-full">{product?.category}</p>
                                    <div className="flex gap-3">
                                        <p className="text-slate-500 line-through p-1 bg-slate-200 w-full"></p>
                                        <p className="text-green-600 font-medium p-1 bg-slate-200"></p>
                                    </div>
                                    <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-0.5 rounded-full w-full"></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        data && data.length > 0 ? (
                            data.map((product) => (
                                <Link key={product._id} to={"product/" + product._id} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm flex">
                                    <div className="bg-white h-full p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center">
                                        <img src={product.productImage[0]} className="object-scale-down h-full hover:scale-110 transition-all" alt={product.productName} />
                                    </div>
                                    <div className="p-1">
                                        <h2 className="font-medium text-md md:text-md text-black text-ellipsis line-clamp-1">{product.productName}</h2>
                                        <p className="capitalize text-slate-500">{product.category}</p>
                                        <div className="flex gap-3">
                                            <p className="text-slate-500 line-through">{displayCOPCurrency(product.price)}</p>
                                            <p className="text-green-600 font-medium">{displayCOPCurrency(product.sellingPrice)}</p>
                                        </div>
                                        <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-0.5 rounded-full" onClick={(e) => handleAddToCart(e, product._id)}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>No hay productos disponibles</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
    
};

export default HorizontalCardProduct;