import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SummaryApi from '../common'
import { toast } from 'react-toastify';


const InformationClient = () => {

    const user = useSelector(state => state?.user?.user)

    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        document: ""
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })

    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const response = await fetch(SummaryApi.updateUserProfile.url,{
            method: SummaryApi.updateUserProfile.method,
            credentials: 'include',
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(data)
        })
        const responseData = await response.json()
        
        if(responseData.success){
            toast.success(responseData?.message)
            // Actualizar el estado local del formulario con los nuevos datos del usuario
            setData ({
                name: responseData.data.name || "",
                email: responseData.data.email || "",
                phone: responseData.data.phone || "",
                document: responseData.data.document || ""
            });

            window.location.reload();


        }

       

        if(responseData.error){
            toast.error(responseData?.message)
        }
    }

    useEffect(() => {
        if (user) {
          setData({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            document: user.document || ""
          });
        }
      }, [user]);

    return (
        <div className="flex justify-center p-5 mt-10">
      <form className="grid grid-cols-2 gap-6 w-full max-w-lg bg-white p-6 rounded-lg shadow-md "  onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor='name' className='mb-2 font-bold'>Name:</label>
          <input
            type='text'
            id='name'
            required
            placeholder='Enter name'
            name='name'
            value={data.name}
            onChange={handleOnChange}
            className='p-2 bg-gray-100 border border-gray-300 rounded'
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor='email' className='mb-2 font-bold'>Email:</label>
          <input
            type='text'
            id='email'
            required
            placeholder='Enter email'
            name='email'
            value={data.email}
            onChange={handleOnChange}
            className='p-2 bg-gray-100 border border-gray-300 rounded'
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor='phone' className='mb-2 font-bold'>Phone:</label>
          <input
            type='text'
            id='phone'
            required
            placeholder='Enter phone'
            name='phone'
            value={data.phone}
            onChange={handleOnChange}
            className='p-2 bg-gray-100 border border-gray-300 rounded'
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor='document' className='mb-2 font-bold'>Document:</label>
          <input
            type='text'
            id='document'
            required
            placeholder='Enter document'
            name='document'
            value={data.document}
            onChange={handleOnChange}
            className='p-2 bg-gray-100 border border-gray-300 rounded'
          />
        </div>

        <div className="flex flex-col col-span-2">
          <button className='w-full px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded'>
            Update Profile 
          </button>
        </div>
      </form>
    </div>
    )
}

export default InformationClient  