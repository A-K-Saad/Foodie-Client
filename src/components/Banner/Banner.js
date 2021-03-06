import React from "react";

const Banner = () => {
  return (
    <>
      <section className="min-h-screen bg-white z-10">
        <div>
          {/* <!-- banner --> */}
          <div className="relative">
            <div className="mx-auto px-2 py-2 lg:px-8 lg:py-8">
              <div className="relative shadow-xl rounded-2xl overflow-hidden py-28 md:py-20">
                <div className="absolute inset-0">
                  <img
                    className="h-full w-full object-cover"
                    src="https://www.supermarketnews.com/sites/supermarketnews.com/files/styles/article_featured_retina/public/Featured%20Image%201500X800_0.png?itok=ItTtKQil"
                    alt="People working on laptops"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900"></div>
                </div>
                <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                  <h1 className="text-center text-5xl font-bold tracking-tight lg:text-7xl">
                    <span className="block text-white">
                      Serving Fresh Ingredients
                    </span>
                    <span className="block text-4xl lg:text-5xl mt-4 font-light text-green-100">
                      your way everyday!
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- cards--> */}
          <div className="md:-mt-24 -mt-28">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto px-2 lg:px-6">
                <dl className="rounded-2xl overflow-hidden bg-white shadow-lg divide-y md:divide-y-0 md:divide-x divide-x divide-gray-100 grid grid-cols-2 md:grid-cols-4">
                  <div className="flex flex-col p-6 text-center">
                    <dt className="order-2 mt-2 text-xl leading-6 font-bold text-gray-700">
                      Vegitables
                    </dt>
                    <dd className="order-1 text-5xl mx-auto font-extrabold text-indigo-600">
                      <img
                        className="h-16 w-16 my-4"
                        src="https://zaib.sandbox.etdevs.com/grocery-delivery/wp-content/uploads/sites/18/2021/05/grocery-delivery-icon-01.png"
                        alt="Tuple"
                      />
                    </dd>
                    {/* <dd className="order-3 mt-4 text-gray-500 px-1">
                    Fresh vegitables daily for good health
                  </dd> */}
                  </div>
                  <div className="flex flex-col  p-6 text-center">
                    <dt className="order-2 mt-2 text-xl leading-6 font-bold text-gray-700">
                      Fruits
                    </dt>
                    <dd className="order-1 text-5xl mx-auto font-extrabold text-indigo-600">
                      <img
                        className="h-16 w-16 my-4"
                        src="https://zaib.sandbox.etdevs.com/grocery-delivery/wp-content/uploads/sites/18/2021/05/grocery-delivery-icon-04.png"
                        alt="Tuple"
                      />
                    </dd>
                    {/* <dd className="order-3 mt-4 text-gray-500 px-1">
                    Fresh fruits available to your door 24/7
                  </dd> */}
                  </div>
                  <div className="flex flex-col  p-6 text-center">
                    <dt className="order-2 mt-2 text-xl leading-6 font-bold text-gray-700">
                      Delicatessens
                    </dt>
                    <dd className="order-1 text-5xl mx-auto font-extrabold text-indigo-600">
                      <img
                        className="h-16 w-16 my-4"
                        src="https://zaib.sandbox.etdevs.com/grocery-delivery/wp-content/uploads/sites/18/2021/05/grocery-delivery-icon-02.png"
                        alt="Tuple"
                      />
                    </dd>
                    {/* <dd className="order-3 mt-4 text-gray-500 px-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </dd> */}
                  </div>
                  <div className="flex flex-col  p-6 text-center">
                    <dt className="order-2 mt-2 text-xl leading-6 font-bold text-gray-700">
                      Beverages
                    </dt>
                    <dd className="order-1 text-5xl mx-auto font-extrabold text-indigo-600">
                      <img
                        className="h-16 w-16 my-4"
                        src="https://zaib.sandbox.etdevs.com/grocery-delivery/wp-content/uploads/sites/18/2021/05/grocery-delivery-icon-03.png"
                        alt="Tuple"
                      />
                    </dd>
                    {/* <dd className="order-3 mt-4 text-gray-500 px-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </dd> */}
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
