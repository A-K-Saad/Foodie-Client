import React from "react";
import Banner from "../../components/Banner/Banner";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";

const Home = () => {
  return (
    <>
      <div className="text-center">
        <Banner></Banner>
        <ProductCarousel></ProductCarousel>
      </div>
    </>
  );
};

export default Home;
