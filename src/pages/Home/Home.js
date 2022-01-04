import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import Reviews from "../Reviews/Reviews";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://glacial-bastion-21555.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.slice(0, 6).reverse());
        setTopProducts(data.sort((a, b) => b.views - a.views).slice(0, 6));
        setIsLoading(false);
      });
  }, []);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <div className="text-center">
        <Banner></Banner>
        {isLoading ? (
          <div className="flex justify-center align-center">
            <img
              src="https://i.ibb.co/QjZhgZc/load.gif"
              alt="Loading"
              className="w-24"
            />
          </div>
        ) : (
          <>
            <ProductCarousel
              products={products}
              header="New Arrivals"
            ></ProductCarousel>
            <ProductCarousel
              products={topProducts}
              header="Top Views"
            ></ProductCarousel>
          </>
        )}
        <Reviews></Reviews>
      </div>
    </>
  );
};

export default Home;
