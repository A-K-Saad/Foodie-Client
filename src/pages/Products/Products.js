import React, { useEffect, useState } from "react";
import { BsAppIndicator } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Products = () => {
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);
  const [isMenuOver, setIsMenuOver] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://glacial-bastion-21555.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setProducts(data);
      });
  }, []);

  useEffect(() => {
    if (category === "All") {
      fetch("https://glacial-bastion-21555.herokuapp.com/products")
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);

          setProducts(data);
        });
    } else {
      fetch(
        `https://glacial-bastion-21555.herokuapp.com/products/category/${category}`
      )
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.log(err));
    }
  }, [category]);

  if (isLoading) {
    return (
      <div className="flex justify-center align-center">
        <img
          src="https://i.ibb.co/QjZhgZc/load.gif"
          alt="Loading"
          className="w-24"
        />
      </div>
    );
  }

  return (
    <>
      <div className="2xl:container 2xl:mx-auto sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="md:py-12 lg:px-20 md:px-6 py-9 px-4">
          <p className="text-sm leading-3 text-gray-400 font-normal mb-2">
            Groceries - {category}
          </p>
          <div className="flex justify-between items-center mb-4">
            <h2 className="lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 font-semibold">
              Foodie Mart
            </h2>

            {/* <!-- filters Button --> */}
            <button
              onClick={() => setOpenCategoryDropdown(!openCategoryDropdown)}
              onBlur={() => !isMenuOver && setOpenCategoryDropdown(false)}
              className="flex relative items-center space-x-2 text-gray-800 hover:opacity-50"
            >
              <BsAppIndicator className="text-xl" />
              <p className="lg:text-xl text-lg lg:leading-6 leading-5 font-medium ">
                {category} <i className="fas fa-chevron-down"></i>
              </p>
            </button>
            {/* category dropdown */}
            {openCategoryDropdown && (
              <div
                className="origin-top-right z-40 absolute right-10 top-24 mt-2 w-52 rounded-md shadow-lg py-1 bg-white"
                onMouseOver={() => setIsMenuOver(true)}
                onMouseOut={() => setIsMenuOver(false)}
              >
                <div className="divide-y divide-gray-200">
                  <button
                    className="flex items-center gap-2 px-4 py-4 text-sm text-gray-700 w-full text-left hover:bg-gray-50"
                    onClick={() => setCategory("All")}
                  >
                    All
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-4 text-sm text-gray-700 w-full text-left hover:bg-gray-50"
                    onClick={() => setCategory("Fruits")}
                  >
                    Fruits
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-4 text-sm text-gray-700 w-full text-left hover:bg-gray-50"
                    onClick={() => setCategory("Vegetables")}
                  >
                    Vegetables
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-4 text-sm text-gray-700 w-full text-left hover:bg-gray-50"
                    onClick={() => setCategory("Delicatessens")}
                  >
                    Delicatessens
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-4 text-sm text-gray-700 w-full text-left hover:bg-gray-50"
                    onClick={() => setCategory("Beverage")}
                  >
                    Beverage
                  </button>
                </div>
              </div>
            )}
          </div>
          <p className="text-xl dark:text-gray-400 leading-5 text-gray-600 font-medium">
            {products.length || 0} Products
          </p>
        </div>
      </div>

      {/* products */}
      <div>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="py-7 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product, index) => {
              return (
                <div key={index}>
                  <NavLink to={`/products/${product._id}`}>
                    <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 h-56">
                      <img
                        src={product.photo}
                        alt={product.name}
                        className="max-h-full m-auto"
                      />
                    </div>
                  </NavLink>
                  <div className="flex justify-between mt-2">
                    <h1>{product.name.slice(0, 15)}</h1>
                    <h1>${product.price}</h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
