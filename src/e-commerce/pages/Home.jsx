import React, { useState } from "react";
import Footer from "../components/Footer";
import SlideShow from "../components/SlideShow";
import FeaturedProducts from "../components/FeaturedProducts";
import Header from "../components/Header";
import { BasketProvider } from "../../context/BasketContext";

const Home = () => {
  const [data, setData] = useState([]);
 
  // const [basket, setBasket] = useState({ productId: 0, productCount: 0 });

  return (
    <>
      <div className="homePage_container ">
        <BasketProvider>
          <Header />
          <SlideShow />
          <FeaturedProducts data={data} setData={setData} />
        </BasketProvider>
        <Footer />
      </div>
    </>
  );
};

export default Home;
