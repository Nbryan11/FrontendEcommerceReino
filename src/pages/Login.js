import React, { useContext, useState } from 'react'
import loginIcons from '../assets/user.png'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [data,setData] = useState({
        email : "",
        password : ""
    })
    const navigate = useNavigate()
    //usa el contexto del provider definido en app.js
    const {fetchUserDetails, fetchUserAddToCart} = useContext(Context)

    //funcion para asignar valores a las variables, tomando los datos de los inpunt
    const handleOnChange = (e) =>{
        const { name , value } = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()
        const dataResponse = await fetch(SummaryApi.SignIn.url,{
            method : SummaryApi.SignIn.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

            const dataApi = await dataResponse.json()

            if(dataApi.success){
                toast.success(dataApi.message)
                navigate('/')
                fetchUserDetails()
                fetchUserAddToCart()

            }
        
    }

    console.log("data login", data)
    return (
        <section id='login'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt='login icons' />
                    </div>

                    <form className='pt-6'onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email: </label>
                            <div className='bg-slate-100 p-2'>
                            <input type='email' 
                            placeholder='ingrese el email' 
                            className='w-full h-full outline-none bg-transparent' 
                            onChange={handleOnChange} 
                            value={data.email}
                            name='email'/>
                            </div>
                        </div>

                        <div>
                            <label>Password: </label>
                            <div className='bg-slate-100 p-2 flex'>
                            <input type={showPassword ? "text" : 'password'}
                             placeholder='ingrese la contraseña' 
                             onChange={handleOnChange}
                             name='password'
                             value={data.password}
                             className='w-full h-full outline-none bg-transparent'/>
                            <div className='cursor-pointer' onClick={()=> setShowPassword((preve)=>!preve)}>
                                <span>
                                    {
                                        showPassword ? (
                                            <FaEyeSlash/>
                                        )
                                        :
                                        (
                                            <FaEye/>
                                        )
                                    }
                                    
                                </span>
                            </div>
                            </div>
                            <Link to={'/forgot-password'}  className='block w-fit ml-auto hover:underline hover:text-blue-600'>
                                Forgot password
                            </Link>
                        </div>

                        <button className='bg-blue-600 hover:bg-white-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
                    </form>

                    <p className='my-4'>¿No tienes una cuenta? <Link to={"/sign-up"} className='text-blue-600 hover:underline'>Sign Up</Link></p>

                </div>
            </div>
        </section>
    )
}

export default Login