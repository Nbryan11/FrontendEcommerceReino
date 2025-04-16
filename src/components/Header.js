import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { CiSearch } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const searchInput = useLocation();
  const [search, setSearch] = useState(
    searchInput?.search?.split("=")[1] || ""
  );
  const context = useContext(Context);
  const navigate = useNavigate();

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
      <header className="bg-[#0f1111] text-white z-50 relative">
        <div className="relative flex items-center px-3 py-4">
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

          {/* Barra de búsqueda responsive */}
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
                className="bg-[#febd69] px-4 flex items-center justify-center rounded-r-md h-full"
              >
                <CiSearch className="text-xl text-black" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay flotante para categorías */}
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
