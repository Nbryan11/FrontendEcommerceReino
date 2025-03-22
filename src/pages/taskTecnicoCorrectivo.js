
import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { MdModeEditOutline, MdDeleteForever } from 'react-icons/md';

const TasksTecnicoCorrectivo = () => {
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
            const response = await fetch(`${SummaryApi.tareasCorrectivo.url}?estado=${filtroEstado}`, {
                method: SummaryApi.tareasCorrectivo.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

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
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de que el token es válido
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            if (result.success) {
                setTareas(prevTareas => prevTareas.map(tarea => tarea._id === tareaId ? { ...tarea, ...payload } : tarea));
                handleCancelEdit(); // Finalizar modo de edición
                fetchTareas();
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tareas Correctivas del Técnico</h2>

            {/* Botones de filtro estado */}
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
                                <div className="flex space-x-2 mt-2">
                                    <button
                                        onClick={() => handleEditClick(tarea._id)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded-md flex items-center space-x-1"
                                    >
                                        <MdModeEditOutline /> <span>Editar</span>
                                    </button>
                                    
                                </div>
                                {editandoTareaId === tarea._id && (
                                    <div className="mt-4">
                                        <input
                                            type="date"
                                            value={editandoFecha}
                                            onChange={(e) => setEditandoFecha(e.target.value)}
                                            className="block mb-2 p-2 border border-gray-300 rounded-md"
                                        />
                                        <input
                                            type="text"
                                            value={editandoHora}
                                            onChange={(e) => setEditandoHora(e.target.value)}
                                            placeholder="Hora"
                                            className="block mb-2 p-2 border border-gray-300 rounded-md"
                                        />
                                        <select
                                            value={editandoEstado}
                                            onChange={(e) => setEditandoEstado(e.target.value)}
                                            className="block mb-2 p-2 border border-gray-300 rounded-md"
                                        >
                                            <option value="pendiente">Pendiente</option>
                                            <option value="en proceso">En Proceso</option>
                                            <option value="completado">Completado</option>
                                            <option value="cancelado">Cancelado</option>
                                        </select>
                                        <button
                                            onClick={() => handleEdit(tarea._id)}
                                            className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="px-4 py-2 bg-gray-500 text-white rounded-md"
                                        >
                                            Cancelar
                                        </button>
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

export default TasksTecnicoCorrectivo;
