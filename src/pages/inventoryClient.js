import { useEffect, useState } from "react"
import SummaryApi from "../common"
import UploadComputer from "./uploadComputer"
import ClientComputerCard from "./clientComputerCard"

const InventoryClient = () =>{
    const [openUploadProduct, setOpenUploadComputer] = useState(false)
    const [allProduct, setAllProduct] = useState([])

    const fetchAllProduct = async() =>{
      const response = await fetch(SummaryApi.getComputer.url, {
        method: SummaryApi.getComputer.method,
        credentials: 'include', // Incluye credenciales si es necesario para autenticar la solicitud
        headers: {
            "content-type": "application/json"
        }
    });
      const dataResponse = await response.json()

      setAllProduct(dataResponse?.data || [])
    }

    useEffect(()=>{
      fetchAllProduct()
    },[])

    return (
      <div>
        <div  className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Computers</h2>
          <button  className='border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all py-1 px-3 rounded-full'onClick={()=>setOpenUploadComputer(true)}>Upload Computer</button>
        </div>

        {/***se muestran todos los productos guardados en la base de datos */}
        <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190)] bg-slate-100 overflow-y-scroll'>
        {
          allProduct.map((product, index)=>{
            return(
              //si hay productos en allProduct llamamos al componente AdminProductCard y lo mostramos
              <ClientComputerCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
              
            )
          })
        }
        </div>
        {
          openUploadProduct && (
            <UploadComputer onClose={()=> setOpenUploadComputer(false)} fetchData={fetchAllProduct}/>
          )
        }
        
      </div>
    )
}

export default InventoryClient