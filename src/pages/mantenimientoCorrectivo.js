import React, { useState, useEffect } from 'react';
import SummaryApi from '../common';

const MantenimientoCorrectivo = () => {
    const [data, setData] = useState({
        descripcion: '',
        fecha: '',
        hora: '',
        direccion: '',
        sintomas: '',
        accion_previa: '',
        frecuencia: '',
        prioridad: 'baja',
        problema: ''
    });

    const [computadoras, setComputadoras] = useState([]);
    const [equiposRegistrados, setEquiposRegistrados] = useState([]);
    const [equipoSeleccionado, setEquipoSeleccionado] = useState('');

    useEffect(() => {
        const fetchEquiposRegistrados = async () => {
            try {
                const response = await fetch(SummaryApi.getComputer.url, {
                    method: SummaryApi.getComputer.method,
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const dataResponse = await response.json();
                setEquiposRegistrados(dataResponse?.data || []);
            } catch (error) {
                console.error('Error fetching equipos registrados:', error);
            }
        };

        fetchEquiposRegistrados();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleEquipoSeleccionadoChange = (e) => {
        const selectedId = e.target.value;
        setEquipoSeleccionado(selectedId);

        const equipo = equiposRegistrados.find(e => e._id === selectedId);
        if (equipo) {
            setData((prevData) => ({
                ...prevData,
                tipo_computadoras: equipo.tipoComputadora,
                marca_computadoras: equipo.marca,
                modelo_computadoras: equipo.modelo,
                serial_computadoras: equipo._id
            }));
        }
    };

    const handleAddComputadora = () => {
        if (equipoSeleccionado !== '') {
            const equipo = equiposRegistrados.find(e => e._id === equipoSeleccionado);
            if (equipo) {
                const computadoraAgregada = {
                    tipo_computadoras: equipo.tipoComputadora,
                    marca_computadoras: equipo.marca,
                    modelo_computadoras: equipo.modelo,
                    serial_computadoras: equipo._id,
                    problema: data.descripcion
                };
                setComputadoras(prevComputadoras => [...prevComputadoras, computadoraAgregada]);
            }
        }

        setData((prevData) => ({
            ...prevData,
            tipo_computadoras: '',
            marca_computadoras: '',
            modelo_computadoras: '',
            serial_computadoras: '',
            descripcion: ''
        }));

        setEquipoSeleccionado('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(SummaryApi.createMantenimientoCorrectivo.url, {
                method: SummaryApi.createMantenimientoCorrectivo.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...data, computadoras })
            });
            const result = await response.json();
            if (result.success) {
                alert('Solicitud de mantenimiento creada con éxito');
                setData({
                    descripcion: '',
                    fecha: '',
                    hora: '',
                    direccion: '',
                    sintomas: '',
                    accion_previa: '',
                    frecuencia: '',
                    prioridad: 'baja',
                    problema: ''
                });
                setComputadoras([]); // Limpiar la lista de computadoras
            } else {
                console.error('Error al enviar la solicitud:', result.message);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen mt-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Solicitar Mantenimiento Correctivo</h2>
                <p className="mb-6 text-gray-600">El mantenimiento correctivo incluye diagnóstico y reparación de fallas en hardware y software.</p>
                <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
                    <div className="col-span-2">
                        <label htmlFor="equipoSeleccionado" className="block text-sm font-medium text-gray-700">Seleccionar Computador Registrado</label>
                        <select id="equipoSeleccionado" value={equipoSeleccionado} onChange={handleEquipoSeleccionadoChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="">Seleccione un equipo</option>
                            {equiposRegistrados.map((equipo) => (
                                <option key={equipo._id} value={equipo._id}>
                                    {`Tipo: ${equipo.tipoComputadora}, Marca: ${equipo.marca}, Modelo: ${equipo.modelo}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción del Problema</label>
                        <textarea id="descripcion"  value={data.descripcion} onChange={handleChange} name="descripcion" rows="4"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    </div>
                    <div>
                        <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha</label>
                        <input type="date" id="fecha"  value={data.fecha} onChange={handleChange} name="fecha"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>

                    <div>
                        <label htmlFor="hora" className="block text-sm font-medium text-gray-700">Hora</label>
                        <input type="time" id="hora"  value={data.hora} onChange={handleChange} name="hora"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">Dirección</label>
                        <input type="text" id="direccion"  value={data.direccion} onChange={handleChange} name="direccion"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>

                    <div>
                        <label htmlFor="sintomas" className="block text-sm font-medium text-gray-700">Síntomas</label>
                        <textarea id="sintomas"  value={data.sintomas} onChange={handleChange} name="sintomas" rows="4"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    </div>

                    <div>
                        <label htmlFor="accion_previa" className="block text-sm font-medium text-gray-700">Acción Previa</label>
                        <textarea id="accion_previa"  value={data.accion_previa} onChange={handleChange} name="accion_previa" rows="4"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    </div>

                    <div>
                        <label htmlFor="frecuencia" className="block text-sm font-medium text-gray-700">Frecuencia del Problema</label>
                        <input type="text" id="frecuencia"  value={data.frecuencia} onChange={handleChange} name="frecuencia"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>

                    <div>
                        <label htmlFor="prioridad" className="block text-sm font-medium text-gray-700">Prioridad</label>
                        <select id="prioridad"  value={data.prioridad} onChange={handleChange} name="prioridad"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="baja">Baja</option>
                            <option value="media">Media</option>
                            <option value="alta">Alta</option>
                        </select>
                    </div>

                    <div className="col-span-2">
                        <button type="button" onClick={handleAddComputadora} className="mt-2 bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Añadir Computadora</button>
                    </div>

                    <div className="col-span-2">
                        <h3 className="text-lg font-medium text-gray-700">Lista de Computadoras</h3>
                        <ul className="list-disc pl-5 mt-2">
                            {computadoras.map((computadora, index) => (
                                <li key={index}>
                                    {`Tipo: ${computadora.tipo_computadoras}, Marca: ${computadora.marca_computadoras}, Modelo: ${computadora.modelo_computadoras}, Serial: ${computadora.serial_computadoras}, Problema: ${computadora.problema}`}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-2">
                        <button type="submit" className="mt-6 bg-green-500 text-white p-2 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">Solicitar Mantenimiento Correctivo</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MantenimientoCorrectivo;
