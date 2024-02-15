import React, { useState } from "react";
import Footer from "../components/Footer";
import SlideShow from "../components/SlideShow";
import FeaturedProducts from "../components/FeaturedProducts";
import Header from "../components/Header";

const Home = () => {
  const [data, setData] = useState([]); // STATE

  return (
    <>
      <div className="homepage-container ">
        <Header  />
        <SlideShow />
        <FeaturedProducts data={data} setData={setData} />
        <Footer />
      </div>
    </>
  );
};

export default Home;
