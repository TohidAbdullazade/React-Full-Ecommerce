import React, { useEffect } from "react";
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import SlideShow from "../../../components/SlideShow";

const Home = () => {
 
  return (
    <>
    <div className="homePage_container ">
    
     <Header/>
    <SlideShow/>
     <Footer/>
    </div>
    </>
  );
};

export default Home;
