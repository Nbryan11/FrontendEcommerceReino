import React, { useState } from 'react'
import loginIcons from '../assets/user.png'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirnPassword] = useState(false)
  const colombianPhoneRegex = /^(3\d{9}|[1-9]\d{7,9})$/;

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
    phone: "",
    documentType: "CC",
    document: ""
  })

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault()

    if (!colombianPhoneRegex.test(data.phone)) {
      toast.error("Por favor ingrese un número de teléfono válido de Colombia");
      return;
    }


    if(data.password === data.confirmPassword){
      const dataResponse = await fetch(SummaryApi.SignUp.url,{
        method : SummaryApi.SignUp.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
  
      const dataApi = await dataResponse.json()
      if(dataApi.success){
        toast.success(dataApi.message)
        navigate("/login")
      }

      if(dataApi.error){
        toast.error(dataApi.message)
      }
      
      console.log("data", dataApi)
    }else{
      toast.error("Por favor revise que las contraseñas sean iguales")

    }

  }

  const handleUploadPic = async(e) =>{
    const file = e.target.files[0]
    const imagePic = await imageTobase64(file)
    setData((preve)=>{
      return{
        ...preve,
        profilePic : imagePic
      }
    })
  }

  return (
    <section id='login'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
              <img src={data.profilePic || loginIcons} alt='login icons' />
            </div>

            <form>
              <label>
                <div className='text-xs bg-opacity-80 bg-slate-200 pb-5 cursor-pointer pt-2 text-center absolute bottom-0 w-full'>
                  Sube una foto
                </div>
                <input type='file' className='hidden' onChange={handleUploadPic}/>
              </label>

            </form>
          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

            <div className='grid'>
              <label>Name: </label>
              <div className='bg-slate-100 p-2'>
                <input type='text'
                  placeholder='ingrese su nombre'
                  className='w-full h-full outline-none bg-transparent'
                  value={data.name}
                  required
                  onChange={handleOnChange}
                  name='name' />
              </div>
            </div>

            <div className='grid'>
              <label>Email: </label>
              <div className='bg-slate-100 p-2'>
                <input type='email'
                  placeholder='ingrese el email'
                  className='w-full h-full outline-none bg-transparent'
                  onChange={handleOnChange}
                  value={data.email}
                  required
                  name='email' />
              </div>
            </div>

            <div className='grid'>
              <label>phone: </label>
              <div className='bg-slate-100 p-2'>
                <input type='text'
                  placeholder='ingrese el phone'
                  className='w-full h-full outline-none bg-transparent'
                  onChange={handleOnChange}
                  value={data.phone}
                  required
                  name='phone' />
              </div>
            </div>

            <div className='grid'>
              <label>Tipo de Documento: </label>
              <div className='bg-slate-100 p-2'>
                <select
                  name='documentType'
                  value={data.documentType}
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent'
                >
                  <option value='CC'>CEDULA DE CIUDADANIA</option>
                  <option value='NIT'>NIT</option>

                </select>
              </div>
            </div>

            <div className='grid'>
              <label>numero de documento: </label>
              <div className='bg-slate-100 p-2'>
                <input type='text'
                  placeholder='ingrese el numero de documento'
                  className='w-full h-full outline-none bg-transparent'
                  onChange={handleOnChange}
                  value={data.document}
                  required
                  name='document' />
              </div>
            </div>

            <div>
              <label>Password: </label>
              <div className='bg-slate-100 p-2 flex'>
                <input type={showPassword ? "text" : 'password'}
                  placeholder='ingrese la contraseña'
                  onChange={handleOnChange}
                  required
                  name='password'
                  value={data.password}
                  className='w-full h-full outline-none bg-transparent' />
                <div className='cursor-pointer' onClick={() => setShowPassword((preve) => !preve)}>
                  <span>
                    {
                      showPassword ? (
                        <FaEyeSlash />
                      )
                        :
                        (
                          <FaEye />
                        )
                    }

                  </span>
                </div>
              </div>

            </div>

            <div>
              <label>Confirmar password: </label>
              <div className='bg-slate-100 p-2 flex'>
                <input type={showConfirmPassword ? "text" : 'password'}
                  placeholder='ingrese la contraseña'
                  onChange={handleOnChange}
                  value={data.confirmPassword}
                  name='confirmPassword'
                  required
                  className='w-full h-full outline-none bg-transparent' />
                <div className='cursor-pointer' onClick={() => setShowConfirnPassword((preve) => !preve)}>
                  <span>
                    {
                      showConfirmPassword ? (
                        <FaEyeSlash />
                      )
                        :
                        (
                          <FaEye />
                        )
                    }

                  </span>
                </div>
              </div>

            </div>

            <button className='bg-blue-600 hover:bg-white-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign up</button>
          </form>

          <p className='my-4'>¿Ya tienes una cuenta? <Link to={"/login"} className='text-blue-600 hover:underline'>Login</Link></p>

        </div>
      </div>
    </section>
  )
}

export default SignUp