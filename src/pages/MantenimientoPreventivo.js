import { useState } from "react";
import SummaryApi from "../common";

const MantenimientoPreventivo = () =>{

    const [cantidadComputadoras, setCantidadComputadoras] = useState(0);
    const precioPorMantenimiento = 25000;
    const costoTotal = cantidadComputadoras * precioPorMantenimiento;

    const [data, setData] = useState({
        descripcion: "",
        fecha: "",
        hora: "",
        direccion: "",
        tipo_computadoras: "",
        marca_computadoras: "",
        cantidad_computadoras: 0,
        otros_detalles: ""

    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });

        if (name === "cantidad_computadoras") {
            setCantidadComputadoras(Number(value));
        }
    };


    const handleSubmit = async(e) =>{
        e.preventDefault()

        try {
            const response = await fetch(SummaryApi.mantenimientoPreventivo.url, {
                method: SummaryApi.mantenimientoPreventivo.method,
                credentials : 'include',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you're storing the JWT in localStorage
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                alert('Solicitud de mantenimiento creada con éxito');
                // Reset form
                setData({
                    descripcion: "",
                    fecha: "",
                    hora: "",
                    direccion: "",
                    tipo_computadoras: "",
                    marca_computadoras: "",
                    cantidad_computadoras: 0,
                    otros_detalles: ""
                });
                setCantidadComputadoras(0);
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }

    }

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Solicitar Mantenimiento Preventivo</h2>
                <p className="mb-6 text-gray-600">El mantenimiento preventivo incluye limpieza, revisión de hardware y software, actualizaciones y más.</p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción del Servicio</label>
                        <textarea id="descripcion"  required value={data.descripcion} onChange={handleChange} name="descripcion" rows="4" 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    </div>
                    <div>
                        <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Preferencia de Fecha</label>
                        <input type="date" id="fecha" required value={data.fecha} onChange={handleChange} name="fecha" 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="hora" className="block text-sm font-medium text-gray-700">Preferencia de Hora</label>
                        <input type="time" id="hora" required value={data.hora} onChange={handleChange} name="hora" 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">Detalles del Sitio</label>
                        <input type="text" id="direccion" value={data.direccion} onChange={handleChange} name="direccion" required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="tipo_computadoras" className="block text-sm font-medium text-gray-700">Tipo de Computadoras</label>
                        <input type="text" id="tipo_computadoras" value={data.tipo_computadoras} onChange={handleChange} name="tipo_computadoras" required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="marca_computadoras" className="block text-sm font-medium text-gray-700">Marca de las Computadoras</label>
                        <input type="text" id="marca_computadoras" value={data.marca_computadoras} onChange={handleChange} name="marca_computadoras" required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="cantidad_computadoras" className="block text-sm font-medium text-gray-700">Cantidad de Computadoras</label>
                        <input type="number" id="cantidad_computadoras" name="cantidad_computadoras" required value={data.cantidad_computadoras} onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="otros_detalles" className="block text-sm font-medium text-gray-700">Otros Detalles Necesarios</label>
                        <textarea id="otros_detalles" value={data.otros_detalles} onChange={handleChange} name="otros_detalles" rows="4"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    </div>
                    <div id="costo_total" className="text-lg font-semibold text-gray-800">
                        Costo Total: ${costoTotal} pesos
                    </div>
                    <div>
                        <button type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Agendar Cita
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MantenimientoPreventivo