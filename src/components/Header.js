import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { CiSearch, CiUser } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import SummaryApi from "../common";
import Context from "../context";
import ROLE from "../common/role";
import { toast } from 'react-toastify';


const categories = [
  { name: "Hogar" },
  { name: "Moda" },
  { name: "Tecnologia" },
  { name: "Belleza" },
  { name: "Mascotas" },
  { name: "Herramientas" },
  { name: "Automotriz" },
  { name: "Bebé" },
  { name: "Moda para mujer" },
  { name: "Moda para hombre" },
  { name: "Moda para niño" },
  { name: "Moda para niña" },
  { name: "Deportes" },
  { name: "Juguetes y juegos" },
];


const Header = () => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const searchInput = useLocation();
  const [search, setSearch] = useState(searchInput?.search?.split("=")[1] || "");
  const context = useContext(Context);
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    navigate(value ? `/search?q=${value}` : `/`);
  };

  const deleteCookies = () => {
    // Aquí debes especificar el nombre de las cookies que quieres eliminar
    const cookies = document.cookie.split(";");
  
    cookies.forEach((cookie) => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    });
  };

  const handleLogout = async () => {
    deleteCookies();

    const fetchData = await fetch(SummaryApi.logOut.url, {
      method: SummaryApi.logOut.method,
      credentials: 'include'
    });
  
    const data = await fetchData.json();
  
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/login"); // 👈 Redirige inmediatamente
    }
  
    if (data.error) {
      toast.error(data.message);
    }
  };
  

  const handleCategoryClick = (category) => {
    const query = encodeURIComponent(category);
    navigate(`/search?q=${query}`);
    setCategoriesOpen(false);
  };

  return (
    <>
      <header className="bg-[#211155] text-white z-50 relative">
        <div className="relative flex items-center px-3 py-4 justify-between">
          {/* Menú hamburguesa y logo */}
          <div className="flex items-center gap-2 z-10">
            <button
              onClick={() => setCategoriesOpen(true)}
              className="text-white text-2xl"
            >
              &#9776;
            </button>
            <Link to={"/"}>
              <Logo parentHeight="40px" />
            </Link>
          </div>

          {/* Barra de búsqueda */}
          <div className="w-full flex justify-center md:absolute md:left-1/2 md:-translate-x-1/2 md:w-auto md:max-w-2xl">
            <div className="flex w-full md:w-[32rem] h-12 px-2">
              <input
                type="text"
                placeholder="Buscar en tu tienda"
                className="flex-1 px-3 text-black rounded-l-md text-base outline-none h-full"
                onChange={handleSearch}
                value={search}
              />
              <button
                onClick={() => navigate(search ? `/search?q=${search}` : "/")}
                className="bg-[#3f62c2] px-4 flex items-center justify-center rounded-r-md h-full"
              >
                <CiSearch className="text-xl text-black" />
              </button>
            </div>
          </div>

          {/* Perfil */}
          <div className="relative flex items-center gap-4">
            {user?._id ? (
              <div className="relative">
                <div
                  className="text-3xl cursor-pointer bg-gray-800 p-2 rounded-full"
                  onClick={() => setMenuDisplay((prev) => !prev)}
                >
                  {user?.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <CiUser />
                  )}
                </div>

                {/* Menú de opciones */}
                {menuDisplay && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2 z-50">
                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to="/admin-panel/all-products"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setMenuDisplay(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    {user?.role === ROLE.TECHNICAL && (
                      <Link
                        to="/technical-panel/tasks"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setMenuDisplay(false)}
                      >
                        Technical Panel
                      </Link>
                    )}
                    {user?.role === ROLE.GENERAL && (
                      <Link
                        to="/clientPanel/information"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setMenuDisplay(false)}
                      >
                        My Profile
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Overlay flotante de categorías */}
      {categoriesOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50 flex">
          <div className="w-80 bg-white h-full p-4 overflow-y-auto relative">
            {/* Botón cerrar */}
            <button
              onClick={() => setCategoriesOpen(false)}
              className="absolute top-2 right-2 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Categorías</h2>
            <ul>
              {categories.map((cat, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCategoryClick(cat.name)}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
