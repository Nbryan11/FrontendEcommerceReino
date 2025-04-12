import React from "react";
import { useNavigate } from "react-router-dom";
import celular from "../assets/celular.webp";

import relojMujer from "../assets/relojMujer.jpg";
import relojHombre from "../assets/relojHombre.jpg";
import relojNiña from "../assets/relojNiña.jpg";
import relojNiño from "../assets/relojNiño.jpg";

import portatil from "../assets/portatil.jpg";
import pc from "../assets/pc.jpg";
import disco from "../assets/disco.jpg";
import monitor from "../assets/monitor.jpg";

import piel from "../assets/piel.jpg";
import uñas from "../assets/uñas.jpg";
import cabello from "../assets/cabello.webp";
import perfume from "../assets/perfume.jpg";

import linterna from "../assets/linterna.webp";
import jardineria from "../assets/jardineria.webp";
import cargador from "../assets/cargador.webp";
import taladro from "../assets/taladro.webp";


import brochas from "../assets/brochas.jpg";
import espejo from "../assets/espejo.jpg";
import esponja from "../assets/esponjas2.jpg";
import maquillaje from "../assets/maquillaje.jpg";

const categories = [
  {
    title: "Relojes favoritos",
    items: [
      { name: "Mujeres", image: relojMujer },
      { name: "Hombres", image: relojHombre },
      { name: "Niñas", image: relojNiña },
      { name: "Niños", image: relojNiño },
    ],
    link: "Discover more",
  },
  {
    title: "Mejora tu PC aquí",
    items: [
      { name: "Portátiles", image: portatil },
      { name: "Equipo de PC", image: pc },
      { name: "Discos duros", image: disco },
      { name: "Monitores", image: monitor },
    ],
    link: "Discover more",
  },
  {
    title: "Descubre estos productos para tu cuidado personal",
    items: [
      { name: "Cuidado de la piel", image: piel },
      { name: "Uñas", image: uñas },
      { name: "Accesorios para el cabello", image: cabello },
      { name: "Perfumes", image: perfume },
    ],
    link: "See more",
  },
  {
    title: "Herramientas construcción y accesorios",
    items: [
      { name: "Herramientas", image: taladro },
      { name: "Carros", image: cargador },
      { name: "Linternas", image: linterna },
      { name: "Jardinería", image: jardineria },
    ],
    link: "See more",
  },
];

const ProductGrid = () => {
  const navigate = useNavigate();

  const handleItemClick = (itemName) => {
    navigate(`/search?q=${itemName}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 px-4 bg-gray-200 pt-8 ">
      {categories.map((category, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md ">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">{category.title}</h2>
  
          <div className="grid grid-cols-2 gap-3">
            {category.items.map((item, i) => (
              <div 
                key={i} 
                className="text-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-all"
                onClick={() => handleItemClick(item.name)}
              >
                <img
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.name}
                  className="w-full h-20 object-cover rounded-md hover:scale-105 transition-transform"
                />
                <p className="mt-2 text-sm text-gray-700">{item.name}</p>
              </div>
            ))}
          </div>
  
          <a href="#" className="text-blue-500 mt-4 inline-block hover:underline">
            {category.link}
          </a>
        </div>
      ))}
    </div>
  );
  
  
  
};

export default ProductGrid;
