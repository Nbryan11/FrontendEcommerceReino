import React, { useState } from 'react';
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayCOPCurrency from '../helpers/displayCurrency';
import { toast } from "react-toastify";
import SummaryApi from '../common';

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct, setEditProduct] = useState(false);

    const handleDeleteProduct = async () => {
      if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
    
      try {
        const response = await fetch(SummaryApi.deleteProduct.url, {
          method: SummaryApi.deleteProduct.method,
          credentials: "include", // Importante para las cookies de autenticación
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: data._id // Asegúrate que data._id existe
          }),
        });
    
        const responseData = await response.json();
    
        if (responseData.success) {
          toast.success(responseData.message || "Producto eliminado correctamente");
          fetchdata(); // Actualiza la lista de productos
        } else {
          toast.error(responseData.message || "Error al eliminar el producto");
        }
    
      } catch (error) {
        console.error("Error en handleDeleteProduct:", error);
        toast.error("Error de conexión al servidor");
      }
    };
    return (
        <div className='bg-white p-4 rounded'>
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={data.productImage[0]} width={120} height={120} className='mx-auto object-fill h-full' alt={data.productName}/>
                </div>
                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
                <div>
                    <p className='font-semibold'> 
                        {displayCOPCurrency(data.price)}
                    </p>
                    <div className='flex'>
                        <div 
                            onClick={() => setEditProduct(true)} 
                            className='w-fit ml-auto p-2 bg-blue-100 hover:bg-blue-600 rounded-full hover:text-white cursor-pointer'
                        >
                            <MdModeEditOutline/>
                        </div>

                        <div 
                            onClick={handleDeleteProduct} 
                            className='w-fit ml-auto p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer'
                        >
                            <MdDelete/>
                        </div>
                    </div>
                </div>
            </div>
            {editProduct && (
                <AdminEditProduct 
                    productData={data} 
                    onClose={() => setEditProduct(false)} 
                    fetchdata={fetchdata}
                />
            )}
        </div>
    );
};

export default AdminProductCard;