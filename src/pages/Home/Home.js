import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import Reviews from "../Reviews/Reviews";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { ShowProducts } from "../Products/Products";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://foodie-mart-aks.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, []);

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
            {/* <ProductCarousel
              products={products}
              header="New Arrivals"
            ></ProductCarousel> */}
            {/* <ProductCarousel
              products={topProducts}
              header="Popular"
            ></ProductCarousel> */}
            <div className="mt-14 px-3 md:px-10">
              {["Beverage", "Delicatessens", "Fruits", "Vegetables"].map(
                (t) => {
                  return (
                    <ShowProducts
                      key={t}
                      products={products?.filter((p) => p.category === t)}
                      title={t}
                    />
                  );
                }
              )}
            </div>
          </>
        )}
        <Reviews></Reviews>
      </div>
    </>
  );
};

export default Home;
