  // IMPORTS MANTENIDOS COMO LOS TIENES
  import React, { useContext, useState } from "react";
  import Logo from "./Logo";
  import { CiUser, CiSearch } from "react-icons/ci";
  import { FaShoppingCart } from "react-icons/fa";
  import { Link, useLocation, useNavigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import SummaryApi from "../common";
  import { toast } from "react-toastify";
  import { setUserDetails } from "../store/userSlice";
  import ROLE from "../common/role";
  import Context from "../context";

  const categories = [
    { name: "Hogar" },
    { name: "Moda" },
    { name: "Tecnologia" },
    { name: "Belleza" },
    { name: "Mascotas" },
    { name: "Herramientas" },
  ];

  const Header = () => {
    const user = useSelector((state) => state?.user?.user);
    const dispatch = useDispatch();
    const [menuDisplay, setMenuDisplay] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const searchInput = useLocation();
    const [search, setSearch] = useState(searchInput?.search?.split("=")[1] || "");
    const context = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = async () => {
      const fetchData = await fetch(SummaryApi.logOut.url, {
        method: SummaryApi.logOut.method,
        credentials: "include",
      });

      const data = await fetchData.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
      } else {
        toast.error(data.message);
      }
    };

    const handleSearch = (e) => {
      const { value } = e.target;
      setSearch(value);
      navigate(value ? `/search?q=${value}` : `/`);
    };

    const handleCategoryClick = (category) => {
      const query = encodeURIComponent(category);
      navigate(`/search?q=${query}`);
      setCategoriesOpen(false);
    };

    return (
      <>
        <header className="h-16 shadow-md border-slate-300 bg-[#000] z-50 relative">
          <div className="h-full container mx-auto flex items-center px-4 justify-between">
            {/* Logo */}
            <div className="h-full">
              <Link to={"/"}>
                <Logo parentHeight="100%" />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex items-center w-full max-w-2xl mx-4">
              <div className="flex w-full">
                <select
                  className="bg-gray-200 text-sm text-black px-2 border-r border-gray-300 rounded-l-md outline-none"
                  onChange={(e) => handleCategoryClick(e.target.value)}
                >
                  <option value="">Todos</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Buscar en tu tienda virtual"
                  className="w-full p-2 text-sm outline-none"
                  onChange={handleSearch}
                  value={search}
                />

                <button
                  onClick={() => navigate(search ? `/search?q=${search}` : "/")}
                  className="bg-[#daa520] px-4 rounded-r-md hover:bg-yellow-500 flex items-center justify-center"
                >
                  <CiSearch className="text-xl text-black" />
                </button>
              </div>
            </div>

            {/* Right-Side */}
            <div className="flex items-center gap-4">
              {/* Categorías botón */}
              <button
                className="px-4 py-2 bg-white text-black rounded-full shadow hover:bg-gray-100"
                onClick={() => setCategoriesOpen(true)}
              >
                Categorías
              </button>

              {/* User Icon */}
              <div className="relative flex justify-center">
                <div
                  className="text-3xl cursor-pointer"
                  onClick={() => setMenuDisplay((prev) => !prev)}
                >
                  {user?._id &&
                    (user?.profilePic ? (
                      <img
                        src={user?.profilePic}
                        className="w-10 h-10 rounded-full"
                        alt={user?.name}
                      />
                    ) : (
                      <CiUser className="bg-white" />
                    ))}
                </div>
                {menuDisplay && (
                  <div className="absolute bg-white top-12 right-0 w-48 shadow-lg rounded p-2 z-50">
                    <nav>
                      {user?.role === ROLE.ADMIN && (
                        <Link to={"/admin-panel/all-products"} className="block hover:bg-slate-100 p-2">
                          Admin Panel
                        </Link>
                      )}
                      {user?.role === ROLE.TECHNICAL && (
                        <Link to={"/technical-panel/tasks"} className="block hover:bg-slate-100 p-2">
                          Technical Panel
                        </Link>
                      )}
                      {user?.role === ROLE.GENERAL && (
                        <Link to={"/clientPanel/information"} className="block hover:bg-slate-100 p-2">
                          My Profile
                        </Link>
                      )}
                      {!user?.role && (
                        <p className="text-gray-500">No hay opciones disponibles.</p>
                      )}
                    </nav>
                  </div>
                )}
              </div>

              {/* Cart */}
              {user?._id && (
                <Link to={"/cart"} className="text-2xl relative bg-white hover:opacity-90">
                  <FaShoppingCart />
                  <div className="bg-blue-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                    <p className="text-sm">{context?.cartProductCount}</p>
                  </div>
                </Link>
              )}

              {/* Login/Logout */}
              <div>
                {user?._id ? (
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 rounded-full text-white bg-[#daa520] hover:bg-gray-700"
                  >
                    Log out
                  </button>
                ) : (
                  <Link to={"login"} className="px-3 py-1 rounded-full text-white bg-[#daa520] hover:bg-gray-700">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Overlay flotante para categorías */}
        {categoriesOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50 flex">
            <div className="w-80 bg-white h-full p-4 overflow-y-auto relative">
              {/* Cerrar */}
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
