import React from "react";
import win from "../assets/win.png"
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";
import VerticalCard from "../components/VerticalCard";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import ProductGrid from "../components/ProductGrid";
import ProductGridTwo from "../components/ProductGridTwo";


const Home = () => {
    return(
        <div class=" bg-gray-200">

          <ProductGrid/>



          <HorizontalCardProduct category={"hogar"} heading={"Top's Hogar"}/>
          <HorizontalCardProduct category={"Tecnologia"} heading={"Top's Tecnologia"}/>
          <HorizontalCardProduct category={"Moda para mujer"} heading={"Top's Moda mujer"}/>
          <HorizontalCardProduct category={"Moda para hombre"} heading={"Top's Moda hombre"}/>


          <ProductGridTwo/>


          <HorizontalCardProduct category={"Mascotas"} heading={"Top's Mascotas"}/>
          <HorizontalCardProduct category={"Belleza"} heading={"Top's Belleza"}/>
          <HorizontalCardProduct category={"Herramientas"} heading={"Top's Herramientas"}/>
          <HorizontalCardProduct category={"Deportes"} heading={"Top's Deportes"}/>
          <HorizontalCardProduct category={"Moda para niño"} heading={"Top's Moda niño"}/>
          <HorizontalCardProduct category={"Moda para niña"} heading={"Top's Moda niña"}/>
          <HorizontalCardProduct category={"Juguetes y juegos"} heading={"Top's Juguetes"}/>




      </div>
    )
}

export default Home
