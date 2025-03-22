import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

const ClientComputerCard = ({
    data,
    fetchdata
}) => {
    const[editProduct, setEditProduct] = useState(false)
  return (
    <div className='bg-white p-4 rounded'>
                  <div className='flex flex-col'>
                    <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={data.productImage[0]} width={120} height={120} className='mx-auto object-fill h-full'/>

                    </div>
                  <h1 className='text-ellipsis line-clamp-2'>Tipo: {data.tipoComputadora}</h1>
                  <h1 className='text-ellipsis line-clamp-2'>Marca: {data.marca}</h1>
                  <h1 className='text-ellipsis line-clamp-2'>Modelo: {data.modelo}</h1>

                  <div className='flex justify-end'>
                    
                  <div onClick={()=>setEditProduct(true)} className='  p-2 mr-1 bg-blue-100 hover:bg-blue-600 rounded-full hover:text-white cursor-pointer'>
                    <MdModeEditOutline/>
                  </div>

                  <div onClick={()=>setEditProduct(true)} className=' p-2 bg-blue-100 hover:bg-blue-600 rounded-full hover:text-white cursor-pointer'>
                    <MdDeleteForever/>
                  </div>
                  </div>
                  

                  
                  </div>
                
                </div>
  )
}

export default ClientComputerCard