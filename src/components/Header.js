import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { CiUser } from "react-icons/ci";
  import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import { GiAutoRepair } from "react-icons/gi";
import Context from '../context';




const Header = () => {
  //traemos el valor del objeto guardado en userSlice que hace parte del store de redux para los estados de un objeto
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const searchInput = useLocation()
  const [search, setSearch] = useState(searchInput?.search?.split("=")[1])
  
  console.log("searchInput", searchInput  )

  //usamos el context que definimos en el provider en el app.js
  const context = useContext(Context)
  const navigate =  useNavigate()

  //funcion para borrar las cookies y cerrar sesion
  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logOut.url, {
      method: SummaryApi.logOut.method,
      credentials: 'include'
    })

    const data = await fetchData.json()

    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
    }

    if (data.error) {
      toast.error(data.message)
    }
  }

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)
    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate(`/`)
    }
  }

  return (

    <header className='h-16 shadow-md  border-slate-300 'style={{ backgroundColor: "black" }}>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className='h-full'>
          <Link to={"/"}>
            <Logo parentHeight="100%" s />
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-xl  border-2 rounded-full focus-within:shadow-lg pl-4 bg-white'>
        <input type='text' placeholder='busca un producto' className='w-full outline-none' onChange={handleSearch} value={search}/>
          
          <div className='text-lg min-w-[50px] h-8 bg-black flex items-center justify-center rounded-r-full text-white'>
            <CiSearch />
          </div>
        </div>

        <div className='flex items-center gap-4'>

          <div className='relative flex justify-center'>
            <div className='text-3xl cursor-pointer' onClick={() => setMenuDisplay(preve => !preve)}>
              {
                user?._id && (
                  user?.profilePic ? (
                    <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                  ) : (
                    <CiUser className='bg-white' />
                  )
                )
              }

            </div>

            {
              user?.role === ROLE.GENERAL && (
                <Link to={"/service-form"} className='text-3xl '><GiAutoRepair /></Link>
              )
            }
            {
              //menu display se activa cuando le damos clicl a la imagen CiUser
              menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                  <nav>
                    {
                      //SI USUARIO EN ROLE TIENE COMO VALOR A ADMIN MOSTRAMOS LA OPCION DE PANEL ADMIN
                      user?.role === ROLE.ADMIN && (
                        <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>admin panel</Link>
                      )


                    }

                    {
                      // SI USUARIO EN ROLE TIENE COMO VALOR A TECHNICAL MOSTRAMOS LA OPCION DE PANEL TECHNICAL
                      user?.role === ROLE.TECHNICAL && (
                        <Link to={"/technical-panel/tasks"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>technical panel</Link>
                      )
                    }

                    {
                      // SI USUARIO EN ROLE TIENE COMO VALOR A TECHNICAL MOSTRAMOS LA OPCION DE PANEL TECHNICAL
                      user?.role === ROLE.GENERAL && (
                        <Link to={"/clientPanel/information"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>my profile</Link>
                      )
                    }


                  </nav>
                </div>
              )



            }

          </div>

          {
            user?._id && (
              <Link to={"/cart"} className='text-2xl relative bg-white'>
                <span class=''><FaShoppingCart /></span>


                <div className='bg-blue-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                  <p className='text-sm'>{context?.cartProductCount}</p>
                </div>



              </Link>
            )
          }


          <div>
            {
              user?._id ? (
                <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-yellow-600 hover:bg-gray-700'>Log out</button>
              ) : (
                <Link to={"login"} className='px-3 py-1 rounded-full text-white bg-[#ad8a1f] hover:bg-gray-700'>Login</Link>
              )
            }
          </div>
        </div>

      </div>
    </header>
  )
}

export default Header