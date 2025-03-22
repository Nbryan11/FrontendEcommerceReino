import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: '#4A90E2' }}>
      <div className="flex justify-between items-center space-x-2">
        {loading ? (
          <div className="flex justify-center items-center w-full h-32">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        ) : (
          categoryProduct.map((product, index) => (
            <Link
              key={index}
              to={`/product-category/${product.category}`}
              className={`px-4 py-2 bg-white hover:bg-gray-200 cursor-pointer flex items-center justify-center text-sm font-medium text-gray-900 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 border-r-2 border-blue-500`}
            >
              <div className="uppercase text-center">{product?.category}</div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryList;
