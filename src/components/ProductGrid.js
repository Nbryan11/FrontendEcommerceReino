import React from "react";
import { useNavigate } from "react-router-dom";

import celular from "../assets/celular.webp";
import reloj from "../assets/reloj.jpg";
import tablet from "../assets/tablet.png";
import auriculares from "../assets/auriculares.webp";

import cocina from "../assets/cocinaa.jpg";
import dining from "../assets/dining.jpg";
import decor from "../assets/home-decor.jpg";
import smart from "../assets/smart-home.jpg";

import bolso from "../assets/bolso.jpg";
import bolsomano from "../assets/bolso-mano.jpg";
import maleta from "../assets/maleta.jpg";
import accesorio from "../assets/accesorios.jpg";

import brochas from "../assets/brochas.jpg";
import espejo from "../assets/espejo.jpg";
import esponja from "../assets/esponjas2.jpg";
import maquillaje from "../assets/maquillaje.jpg";

const categories = [
  {
    title: "Esenciales de viaje más queridos",
    items: [
      { name: "Mochilas", image: bolso },
      { name: "Maletas", image: maleta },
      { name: "Accesorios", image: accesorio },
      { name: "Bolsos de mano", image: bolsomano },
    ],
    link: "Discover more",
  },
  {
    title: "Tecnología inalámbrica",
    items: [
      { name: "Celular", image: celular, label:"Celulares" },
      { name: "Reloj", image: reloj },
      { name: "Auriculares", image: auriculares },
      { name: "Tabletas", image: tablet },
    ],
    link: "Discover more",
  },
  {
    title: "Hallazgos fantásticos para el hogar",
    items: [
      { name: "Cocina", image: cocina },
      { name: "decoración", image: decor },
      { name: "Comedor", image: dining },
      { name: "gatos", image: smart },
    ],
    link: "See more",
  },
  {
    title: "Mejora tu rutina de belleza",
    items: [
      { name: "Maquillaje", image: maquillaje },
      { name: "Brochas", image: brochas },
      { name: "Esponjas", image: esponja },
      { name: "Espejos", image: espejo },
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
                  alt={item.label}
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

