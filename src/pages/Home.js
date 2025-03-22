import React from "react";
import win from "../assets/win.png"
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";
import VerticalCard from "../components/VerticalCard";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import ProductGrid from "../components/ProductGrid";

const Home = () => {
    return(
        <div class=" bg-gray-200">

          <BannerProduct/>
          <ProductGrid/>


          <CategoryWiseProductDisplay category={"hogar"} heading={"Productos recomendados"} />

          <HorizontalCardProduct category={"hogar"} heading={"Top's Hogar"}/>
          <HorizontalCardProduct category={"tecnologia"} heading={"Top's Tecnologia"}/>
          <ProductGrid/>


          <HorizontalCardProduct category={"tecnologia"} heading={"Top's Tecnologia"}/>
          <HorizontalCardProduct category={"hogar"} heading={"Top's Hogar"}/>



      </div>
    )
}

export default Home
