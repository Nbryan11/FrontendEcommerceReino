import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'


const HistoryShopping = () => {
    const [allHistory, setAllHistory] = useState([])
    const fetchHistory = async() =>{
        const fetchData = await fetch(SummaryApi.getHistoryShopping.url,{
            method: SummaryApi.getHistoryShopping.method,
            credentials: 'include'
        })

        const dataResponse = await fetchData.json()
        console.log(dataResponse)
        if(dataResponse.success){
            setAllHistory(dataResponse.data)
          }
      
          if(dataResponse.error){
            toast.error(dataResponse.message)
          }
    }
    useEffect(() => {
        fetchHistory()
    }, [])
    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Purchase History</h1>
            {allHistory.length > 0 ? (
                allHistory.map((order) => (
                    <div key={order._id} className="bg-white shadow-md rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-2">Order ID: {order._id}</h2>
                        <p className="text-gray-600 mb-1">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p className="text-gray-600 mb-1">Total Quantity: {order.totalQty}</p>
                        <p className="text-gray-600 mb-4">Total Price: ${order.totalPrice}</p>
                        <h3 className="text-lg font-semibold mb-2">Products:</h3>
                        <ul className="space-y-4">
                            {order.products.map((product) => (
                                <li key={product.productId._id} className="flex items-center space-x-4">
                                    {product.productId.productImage && product.productId.productImage.length > 0 && (
                                        <img 
                                            src={product.productId.productImage[0]} 
                                            alt={product.productId.productName} 
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    )}
                                    <div>
                                        <p className="font-semibold">{product.productId.productName}</p>
                                        <p className="text-gray-600">Brand: {product.productId.brandName}</p>
                                        <p className="text-gray-600">Category: {product.productId.category}</p>
                                        <p className="text-gray-600">Description: {product.productId.description}</p>
                                        <p className="text-gray-600">Price: ${product.productId.price}</p>
                                        <p className="text-gray-600">Selling Price: ${product.sellingPrice}</p>
                                        <p className="text-gray-600">Quantity: {product.quantity}</p>
                                        <p className="text-gray-600">License Key: {product.licenseKey}</p>

                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p className="text-gray-600">No purchase history available.</p>
            )}
        </div>
    )
}

export default HistoryShopping