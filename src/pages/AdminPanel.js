import React, { useEffect, useState } from 'react'
import { CiUser } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';


const AdminPanel = () => {

    //traemos la informacion de usuario que tenemos guardada, esto no lo proporciona redux store y userSlice en la carpeta store
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN){
            navigate("/")
        }
    })

    return (
        <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
            <aside className='bg-white min-h-full  w-full  max-w-60  customShadow'>
                <div className='h-32 bg-blue-50 flex justify-center items-center flex-col'>
                    <div className='text-5xl cursor-pointer relative flex justify-center '>
                        {
                            user?.profilePic ? (
                                <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
                            ) : (
                                <CiUser />
                            )

                        }

                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>

                {/***navigation panel*/}        
                <div>
                <nav className='grid p-4'>
                        <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All users</Link>
                        <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>All product</Link>
                        <Link to={"reports"} className='px-2 py-1 hover:bg-slate-100'>Reports</Link>

                </nav>
                </div>
            </aside>
            
            {/***el outlet toma los valores de las ramas hijas aca tomara el de all-users o el de all-products */}
            <main className='w-full h-full p-2'>
                
                <Outlet/>
            </main>
        </div>
    )
}

export default AdminPanel