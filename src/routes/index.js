import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import Demo from '../pages/Demoo'
import DemoPost from '../pages/DemoPost';
import ProductDetails from '../pages/ProductDetails';
import Serviceform from '../pages/serviceForm';
import ProfileClient from '../pages/ProfileClient';
import Cart from '../pages/Cart';
import ClientPanel from '../pages/clientPanel';
import InformationClient from '../pages/information';
import HistoryShopping from '../pages/historyShopping';
import SearchProduct from '../pages/SearchProduct';
import Reports from '../pages/Reports';
import MantenimientoPreventivo from '../pages/MantenimientoPreventivo';
import TecnicoPanel from '../pages/TecnicoPanel';
import TasksTecnico from '../pages/TaskTecnico';
import DeleteUser from '../pages/deleteUser';
import AllSupports from '../pages/allSupports';
import MantenimientoCorrectivo from '../pages/mantenimientoCorrectivo';
import InventoryClient from '../pages/inventoryClient';
import TasksTecnicoCorrectivo from '../pages/taskTecnicoCorrectivo';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "sign-up",
        element: <SignUp />
      },
      {
        path: "product-category/:categoryName",
        element: <CategoryProduct/>
      },
      {
        path: "demo",
        element: <Demo/>
      },
      
      {
        path: "demo-post",
        element: <DemoPost/>
      },
      {
        path: "/product/:id",
        element: <ProductDetails/>
      },
      {
        path: "search",
        element: <SearchProduct/>
      },  
      {
        path: "service-form",
        element: <Serviceform/>
      },
      {
        path: "my-profile",
        element: <ProfileClient/>
      },
      {
        path: "mantenimiento-preventivo",
        element: <MantenimientoPreventivo/>
      },
      {
        path: "mantenimiento-correctivo",
        element: <MantenimientoCorrectivo/>
      },

      
      
      
      
      
      {
        path: "cart",
        element: <Cart/>
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path : "all-users",
            element: <AllUsers/>
          },
          {
            path: "all-products",
            element: <AllProducts />
          },
          {
            path: "reports",
            element: <Reports/>
          }
        ]
      },
      {
        path: "clientPanel",
        element: <ClientPanel />,
        children: [
          {
            path : "information",
            element: <InformationClient/>
          },
          {
            path: "history-shopping",
            element: <HistoryShopping/>
          },
          {
            path:"delete-user",
            element: <DeleteUser/>
          },
          ,
          {
            path:"all-support",
            element: <AllSupports/>
          },
          {
            path: "inventory-client",
            element: <InventoryClient/>
          },
        ]
      },
      {
        path: "technical-panel",
        element: <TecnicoPanel/>,
        children: [
          {
            path: "tasks",
            element: <TasksTecnico/>
          },
          {
            path: "tasksCorrectivo",
            element: <TasksTecnicoCorrectivo/>
          }

        ]
      }
    ]

  }
]);

export default router;