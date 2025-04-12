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

          <BannerProduct/>
          <ProductGrid/>



          <HorizontalCardProduct category={"hogar"} heading={"Top's Hogar"}/>
          <HorizontalCardProduct category={"Tecnologia"} heading={"Top's Tecnologia"}/>
          <ProductGridTwo/>


          <HorizontalCardProduct category={"Mascotas"} heading={"Top's Mascotas"}/>
          <HorizontalCardProduct category={"Tecnologia"} heading={"Top's Belleza"}/>



      </div>
    )
}

export default Home
