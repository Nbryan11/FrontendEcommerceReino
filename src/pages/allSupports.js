import { useEffect, useState } from "react"
import SummaryApi from "../common"

const AllSupports = () =>{
    const [allSupport, setAllSupport] = useState([])

    const fetchAllSupports = async() =>{
        const response = await fetch(SummaryApi.allSupport.url,{
            method: SummaryApi.allSupport.method,
            credentials: 'include',

        })

        const dataResponse = await response.json()
        setAllSupport(dataResponse?.data || [])


    }
    useEffect(()=>{
        fetchAllSupports()
    },[])
    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <h2 className="text-3xl font-bold text-center mb-8">Todas las solicitudes de soporte técnico</h2>
            <div className="container mx-auto px-4">
                {allSupport.length > 0 ? (
                    allSupport.map((support, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6 mb-6">
                            <h3 className="text-2xl font-semibold mb-2">{support.descripcion}</h3>
                            <p><span className="font-bold">Fecha:</span> {new Date(support.fecha).toLocaleDateString()}</p>
                            <p><span className="font-bold">Hora:</span> {support.hora}</p>
                            <p><span className="font-bold">Dirección:</span> {support.direccion}</p>
                            <p><span className="font-bold">Tipo de computadoras:</span> {support.tipo_computadoras}</p>
                            <p><span className="font-bold">Marca de computadoras:</span> {support.marca_computadoras}</p>
                            <p><span className="font-bold">Cantidad de computadoras:</span> {support.cantidad_computadoras}</p>
                            <p><span className="font-bold">Otros detalles:</span> {support.otros_detalles}</p>
                            <p><span className="font-bold">Estado:</span> {support.estado}</p>

                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No hay solicitudes de soporte técnico.</p>
                )}
            </div>
        </div>
    );
}

export default AllSupports