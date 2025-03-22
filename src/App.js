import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice';
function App() {

  const dispatch = useDispatch()

  //variable que guarda la cantidad de objetos guardados en el carrito
  const [cartProductCount, setCartProductCount] = useState(0)
//funcion que da Context.Provider
  const fetchUserDetails = async () => {
    
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    })

    const dataApi = await dataResponse.json()

    //si dataApi tiene el valor de true en succes lo cual significa que el token se creo y trajo la informacion de vuelta del token, lo decodifico
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }

  }

  //funcion que trae de la base de datos la cantidad de objetos que tiene el usuario en el carrito de compras
  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include'
    })

    const dataApi = await dataResponse.json()

    console.log("dataApi",dataApi)
    setCartProductCount(dataApi?.data?.count)
  }
  useEffect(() => {
    /**user details */
    fetchUserDetails()

    /**user details cart product */
    fetchUserAddToCart()
  }, [])
  return (
    <>
      <Context.Provider value={{
        //el provider de la estas variables y funciones a todos los elementos como el header, main, outlet que toma diferentes vistas y al footer
        fetchUserDetails,
        cartProductCount, //count cart add product
        fetchUserAddToCart
      }}>
        <ToastContainer 
        position='top-center'
        />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
