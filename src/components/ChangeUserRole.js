import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const ChangeUserRole = ({
    name,
    email,
    userId,
    role,
    onClose,
    callFunc,
}) => {
    const [userRole, setUserRole] = useState(role)

    const handleOnChangeSelect = (e) =>{
        setUserRole(e.target.value)
        console.log(e.target.value)
    }

     const updateUserRole = async() =>{
        const fetchResponse = await fetch(SummaryApi.updateUser.url,{
            method : SummaryApi.updateUser.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                userId : userId,
                role : userRole
            })
        })

        const responseData = await fetchResponse.json()

        if(responseData.success){
            toast.success(responseData.message)
            //funcion definida en AllUsers
            onClose()
            //se vuelve a llamar la funcion que trae todos los usuarios de la base de datos, con el fin de actualizar datos de la tabla cuando se actualiza un usuario
            callFunc()
        }

        console.log("rol actualizado",responseData)
     }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
        <div  className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
            <button className='block ml-auto' onClick={onClose}>
            <IoMdClose/>
            </button>
       <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
       <p>Name : {name}</p>
       <p>Email : {email}</p>
       

    <div className='flex items-center justify-between my-4'>
    <p>ROLE</p>
       <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
        {
            Object.values(ROLE).map(el =>{
                return(
                    <option value={el} key={el}>{el}</option>
                )
            })
        }
       </select>
    </div>
        <button className='w-fit mx-auto block  py-2 px-3 rounded-full bg-blue-500 hover:text-white' onClick={updateUserRole}>Change role</button>
        </div>
    </div>
  )
}

export default ChangeUserRole