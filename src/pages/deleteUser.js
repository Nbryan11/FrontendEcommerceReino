import React, { useState } from 'react'

import SummaryApi from "../common"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DeleteUser = () => {
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const dataResponse = await fetch(SummaryApi.deleteUser.url, {
                method: SummaryApi.deleteUser.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            });

            if (!dataResponse.ok) {
                throw new Error(`HTTP error! status: ${dataResponse.status}`);
            }

            const dataApi = await dataResponse.json();

            if (dataApi.success) {
                toast.success("Usuario eliminado exitosamente");
                navigate('/');
            } else {
                toast.error(dataApi.message || "Error al eliminar usuario");
            }
        } catch (error) {
            console.error('Failed to fetch:', error);
            toast.error('Error al eliminar usuario. Por favor, inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="flex justify-center h-screen items-start p-5 mt-10">
            <form onSubmit={handleSubmit} className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Eliminar Cuenta</h2>
                <p className="text-sm text-gray-600 mb-6">
                    Esta acción es irreversible. Una vez eliminada la cuenta, no se podrá recuperar.
                </p>
                <input
                    type="password"
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4 p-3 border rounded w-full"
                    name="password"
                    required
                />
                <button
                    type="submit"
                    className={`bg-blue-500 text-white px-4 py-3 rounded-xl w-full transition duration-300 hover:bg-blue-600 ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Eliminando...' : 'Eliminar Perfil'}
                </button>
            </form>
        </div>
    );
}

export default DeleteUser