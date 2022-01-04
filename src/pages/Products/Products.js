import React, { useState } from "react";

const Products = () => {
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);
  return (
    <>
      <div className="2xl:container 2xl:mx-auto sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="md:py-12 lg:px-20 md:px-6 py-9 px-4">
          <p className="text-sm leading-3 text-gray-400 font-normal mb-2">
            Groceries - All
          </p>
          <div className="flex justify-between items-center mb-4">
            <h2 className="lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 font-semibold">
              All Categories
            </h2>

            {/* <!-- filters Button --> */}
            <button
              onClick={() => setOpenCategoryDropdown(!openCategoryDropdown)}
              className="flex relative items-center space-x-2 text-gray-800 hover:opacity-50"
            >
              {/* <BsAppIndicator className="text-xl" /> */}
              <p className="lg:text-xl text-lg lg:leading-6 leading-5 font-medium ">
                Categories
              </p>
            </button>
            {/* category dropdown */}
            {openCategoryDropdown && (
              <div className="origin-top-right z-40 absolute right-10 top-24 mt-2 w-52 rounded-md shadow-lg py-1 bg-white">
                <div className="divide-y divide-gray-200">
                  <button className="flex items-center gap-2 px-4 py-4 text-sm text-gray-700 w-full text-left hover:bg-gray-50">
                    Fruits
                  </button>
                  <button className="flex items-center gap-2 px-4 py-4 text-sm text-gray-700 w-full text-left hover:bg-gray-50">
                    Vegitables
                  </button>
                  <button className="flex items-center gap-2 px-4 py-4 text-sm text-gray-700 w-full text-left hover:bg-gray-50">
                    Deli
                  </button>
                  <button className="flex items-center gap-2 px-4 py-4 text-sm text-gray-700 w-full text-left hover:bg-gray-50">
                    Beverage
                  </button>
                </div>
              </div>
            )}
          </div>
          <p className="text-xl dark:text-gray-400 leading-5 text-gray-600 font-medium">
            09 items
          </p>
        </div>
      </div>

      {/* products */}
      <div className="bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {/* single product */}
            <div className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                  alt="Front of men&#039;s Basic Tee in black."
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                      ></span>
                      Basic Tee
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Black</p>
                </div>
                <p className="text-sm font-medium text-gray-900">$35</p>
              </div>
            </div>
            {/* single product */}
            <div className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                  alt="Front of men&#039;s Basic Tee in black."
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                      ></span>
                      Basic Tee
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Black</p>
                </div>
                <p className="text-sm font-medium text-gray-900">$35</p>
              </div>
            </div>
            {/* add more product */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
