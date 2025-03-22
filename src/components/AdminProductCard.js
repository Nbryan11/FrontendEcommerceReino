import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayCOPCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const[editProduct, setEditProduct] = useState(false)
  return (
    <div className='bg-white p-4 rounded'>
                  <div className='w-40'>
                    <div className='w-32 h-32 flex justify-center items-center  '>
                    <img src={data.productImage[0]} width={120} height={120} className='mx-auto object-fill h-full'/>

                    </div>
                  <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
                  <div>
                    <p className='font-semibold'> 
                    {
                      displayCOPCurrency(data.price)
                    }
                    </p>
                  <div className='flex'>
                  <div onClick={()=>setEditProduct(true)} className='w-fit ml-auto p-2 bg-blue-100 hover:bg-blue-600 rounded-full hover:text-white cursor-pointer'>
                    <MdModeEditOutline/>
                  </div>

                  <div onClick={()=>setEditProduct(true)} className='w-fit ml-auto p-2 bg-blue-100 hover:bg-blue-600 rounded-full hover:text-white cursor-pointer'>
                    <MdDelete/>
                  </div>
                  </div>

                  </div>
                  

                  
                  </div>
                {
                    editProduct &&(
                        <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>
                    )
                }
                </div>
  )
}

export default AdminProductCard