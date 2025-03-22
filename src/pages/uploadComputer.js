import React, { useState } from 'react'
import { MdClose } from "react-icons/md";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from '../components/DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';



const UploadComputer = ({
    //se traer de la clase padre que lo llama para cerrar la ventana
    onClose,
    fetchData
}) => {
    const [data, setData] = useState({
        tipoComputadora: "",
        marca: "",
        modelo: "",
        productImage: [],

    })
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState("")

    //funcion utilizada para tomar los valores de los inpunt y guardarlos en data mediante setData()
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })

    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]

        const uploadImageCloudinary = await uploadImage(file)

        //guardar mas imagenes al array productImage
        setData((preve) => {
            return {
                ...preve,
                productImage: [...preve.productImage, uploadImageCloudinary.url]
            }
        })
    }

    //funcion para eliminar una imagen precargada en el panel de uploadProduct
    const handleDeleteProductImage = async (index) => {

        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...newProductImage]
            }
        })

    }

    {/***submit upload product */ }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(SummaryApi.uploadComputer.url, {
            method: SummaryApi.uploadComputer.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)

        })
        const responseData = await response.json()

        if (responseData.success) {
            toast.success(responseData?.message)
            onClose()
            fetchData()
        }

        if (responseData.error) {
            toast.error(responseData?.message)
        }
    }
    return (
        <div className='fixed w-full h-full bg-slate-500 bg-opacity-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'></h2>
                    Upload Computer
                    <div className='w-fit ml-auto text-2xl hover:text-blue-600 cursor-pointer' onClick={onClose}>
                        <MdClose />
                    </div>

                </div>
                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                    <label htmlFor="prioridad" className="block text-sm font-medium text-gray-700">Tipo de computadora</label>
                    <select id="tipoComputadora" value={data.tipoComputadora} onChange={handleOnChange} name="tipoComputadora" required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="mesa">Mesa</option>
                        <option value="portatil">Portatil</option>
                        <option value="todo en uno">Todo en uno</option>
                    </select>

                    <label htmlFor='brandName' className='mt-3'>Marca: </label>
                    <input type='text'
                        id='marca'
                        required
                        placeholder='ingrese la marca'
                        name='marca'
                        value={data.marca}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                    />



                    <label htmlFor='category' className='mt-3'>Modelo :</label>
                    <input type='text'
                        id='modelo'
                        required
                        placeholder='ingrese la marca'
                        name='modelo'
                        value={data.modelo}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                    />
                    <label htmlFor='productImage' className='mt-3'>Computer Image :</label>
                    <label htmlFor='uploadImageInput'>

                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload Computer Image</p>
                                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
                            </div>

                        </div>
                    </label>


                    <div>
                        {
                            data?.productImage[0] ? (
                                <div className='flex items-center gap-2'>
                                    {
                                        data.productImage.map((el, index) => {
                                            return (
                                                <div className='relative group'>
                                                    <img src={el} alt={el} width={80} height={100} className='bg-slate-100 cursor-pointer' onClick={() => {
                                                        setOpenFullScreenImage(true)
                                                        setFullScreenImage(el)
                                                    }} />
                                                    <div onClick={() => handleDeleteProductImage(index)} className='cursor-pointer absolute bottom-0 right-0 p-1 text-white bg-blue-600 rounded-full hidden group-hover:block   '>
                                                        <MdDelete />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <p className='text-blue-600 text-xs'>upload product</p>
                            )
                        }
                    </div>
                    <label htmlFor='price'>Numero serie: </label>
                    <input type='number'
                        id='serie'
                        placeholder='ingrese numero de serie'
                        name='serie'
                        value={data.serie}
                        onChange={handleOnChange}
                        required
                        className='p-2 bg-slate-100 border rounded'
                    />


                    <button className='px-3 py-2 bg-blue-600 text-white mb-10 hover:bg-blue-700'>Upload Computer</button>
                </form>
            </div>
            {
                /**mostrar la imagen completa */
            }
            {
                openFullScreenImage && (
                    <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />

                )
            }
        </div>
    )
}

export default UploadComputer