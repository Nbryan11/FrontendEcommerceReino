import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

const TasksTecnico = () => {
    const [tareas, setTareas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtroEstado, setFiltroEstado] = useState('pendiente'); // Estado por defecto: pendiente
    const [editandoTareaId, setEditandoTareaId] = useState(null);
    const [editandoFecha, setEditandoFecha] = useState('');
    const [editandoHora, setEditandoHora] = useState('');
    const [editandoEstado, setEditandoEstado] = useState('');

    useEffect(() => {
        

        fetchTareas();
    }, [filtroEstado]); // Se ejecutará cada vez que cambie filtroEstado

    const fetchTareas = async () => {
        try {
            const response = await fetch(`${SummaryApi.tareasTecnico.url}?estado=${filtroEstado}`, {
                method: SummaryApi.tareasTecnico.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const result = await response.json();
            if (result.success) {
                setTareas(result.data);
            } else {
                console.error(result.message);
            }
        } catch (err) {
            console.error("Error fetching tareas:", err);
        } finally {
            setLoading(false);
        }
    };
    const handleFiltroEstado = (estado) => {
        setFiltroEstado(estado);
    };

    const handleEditClick = (tareaId) => {
        const tareaToUpdate = tareas.find(tarea => tarea._id === tareaId);
        if (!tareaToUpdate) return;

        setEditandoTareaId(tareaId);
        setEditandoFecha(new Date(tareaToUpdate.fecha).toISOString().slice(0, 10));
        setEditandoHora(tareaToUpdate.hora);
        setEditandoEstado(tareaToUpdate.estado);
    };

    const handleCancelEdit = () => {
        setEditandoTareaId(null);
        setEditandoFecha('');
        setEditandoHora('');
        setEditandoEstado('');
    };

    const handleEdit = async (tareaId) => {
        try {
            const tareaToUpdate = tareas.find(tarea => tarea._id === tareaId);
            if (!tareaToUpdate) return;

            const payload = {
                fecha: editandoFecha,
                hora: editandoHora || tareaToUpdate.hora,
                estado: editandoEstado || tareaToUpdate.estado
            };

            const response = await fetch(`${SummaryApi.actualizarTarea.url}/${tareaId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            if (result.success) {
                // Actualizar la tarea localmente
                setTareas(prevTareas => prevTareas.map(tarea => tarea._id === tareaId ? { ...tarea, ...payload } : tarea));
                handleCancelEdit(); // Finalizar modo de edición
                fetchTareas()
                
            } else {
                console.error(result.message);
            }
        } catch (err) {
            console.error("Error al actualizar la tarea:", err);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Panel de Tareas del Técnico</h2>

            {/* Botones de filtro */}
            <div className="mb-4 space-x-1 flex">
                <button
                    className={`flex-1 px-4 py-2 rounded-md focus:outline-none bg-white ${filtroEstado === 'pendiente' ? 'text-blue-500' : 'text-black hover:text-blue-500'}`}
                    onClick={() => handleFiltroEstado('pendiente')}
                >
                    Pendientes
                </button>
                <button
                    className={`flex-1 px-4 py-2 rounded-md focus:outline-none bg-white ${filtroEstado === 'en proceso' ? 'text-yellow-500' : 'text-black hover:text-yellow-500'}`}
                    onClick={() => handleFiltroEstado('en proceso')}
                >
                    En Proceso
                </button>
                <button
                    className={`flex-1 px-4 py-2 rounded-md focus:outline-none bg-white ${filtroEstado === 'completado' ? 'text-green-500' : 'text-black hover:text-green-500'}`}
                    onClick={() => handleFiltroEstado('completado')}
                >
                    Completados
                </button>

                <button
                    className={`flex-1 px-4 py-2 rounded-md focus:outline-none bg-white ${filtroEstado === 'cancelado' ? 'text-red-500' : 'text-black hover:text-red-500'}`}
                    onClick={() => handleFiltroEstado('cancelado')}
                >
                    Cancelados
                </button>
            </div>

            {tareas.length === 0 ? (
                <p className="text-gray-600">No hay tareas según el filtro seleccionado.</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {tareas.map(tarea => (
                        <li key={tarea._id} className="py-4">
                            <div className="space-y-2 bg-white shadow-md rounded-md p-4">
                                <p className="text-lg font-semibold text-gray-800">Descripción: {tarea.descripcion}</p>
                                <p className="text-sm text-gray-600">Fecha: {new Date(tarea.fecha).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-600">Hora: {tarea.hora}</p>
                                <p className="text-sm text-gray-600">Dirección: {tarea.direccion}</p>
                                <p className="text-sm text-gray-600">Tipo computadora: {tarea.tipo_computadoras}</p>
                                <p className="text-sm text-gray-600">Marca: {tarea.marca_computadoras}</p>
                                <p className="text-sm text-gray-600">Cantidad: {tarea.cantidad_computadoras}</p>
                                <p className="text-sm text-gray-600">Mas detalles: {tarea.otros_detalles}</p>
                                <p className="text-sm text-gray-600">Estado: {tarea.estado}</p>

                                {editandoTareaId === tarea._id ? (
                                    <div className="flex items-center space-x-2">
                                        
                                        <select
                                            className="border border-gray-300 rounded-md p-1"
                                            value={editandoEstado}
                                            onChange={(e) => setEditandoEstado(e.target.value)}
                                        >
                                            <option value="pendiente">Pendiente</option>
                                            <option value="en proceso">En Proceso</option>
                                            <option value="completado">Completado</option>
                                        </select>
                                        <button
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                                            onClick={() => handleEdit(tarea._id)}
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
                                            onClick={handleCancelEdit}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex">
                                        <div className="p-2 mr-1 bg-blue-100 hover:bg-blue-600 rounded-full hover:text-white cursor-pointer" onClick={() => handleEditClick(tarea._id)}>
                                            <MdModeEditOutline />
                                        </div>
                                        <div className="p-2 bg-blue-100 hover:bg-blue-600 rounded-full hover:text-white cursor-pointer">
                                            <MdDeleteForever />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TasksTecnico;
