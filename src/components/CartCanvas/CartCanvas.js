import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SingleCart from "./SingleCart/SingleCart";

const CartCanvas = ({ cartUpdate }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useAuth();
  const [removeUpdate, setRemoveUpdate] = useState(0);
  useEffect(() => {
    if (user?.email) {
      fetch(`https://glacial-bastion-21555.herokuapp.com/carts/${user?.email}`)
        .then((res) => res.json())
        .then((data) => setCart(data));
    } else {
      let localCart = JSON.parse(localStorage.getItem("cart"));
      if (!localCart) {
        localCart = [];
      }
      setCart(localCart);
    }
  }, [user?.email, cartUpdate, removeUpdate]);

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 m-auto flex items-center z-50">
        <div
          className="bg-white shadow rounded-l-md p-5 text-center cursor-pointer"
          onClick={() => setIsCartOpen(true)}
        >
          <i className="fas fa-shopping-basket text-2xl text-gray-800"></i>
          <h1 className="font-black text-gray-700">
            {cart.length || 0} {cart.length > 1 ? "Items" : "Item"}
          </h1>
        </div>
      </div>

      {/* OffCanvas */}
      <div
        className={`${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } h-screen transform border-l border-gray-200 transition ease-in-out duration-500 fixed inset-y-0 right-0 max-w-full flex overflow-hidden z-60`}
      >
        <div className="w-screen max-w-md flex flex-col bg-white">
          {/* cart header */}
          <div className="px-4 py-4 border-b border-gray-200 flex items-start justify-between">
            <h2
              className="text-lg font-medium text-gray-900"
              id="slide-over-title"
            >
              Cart
            </h2>
            <div className="ml-3 h-7 flex items-center">
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 bg-gray-50 border hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Close panel</span>
                <div className="w-7 h-7 flex items-center justify-center rounded-full text-2xl">
                  <i className="fas fa-times"></i>
                </div>
              </button>
            </div>
          </div>
          {/* cart body */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 noscrollbar">
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                {cart?.map((item, index) => {
                  return (
                    <SingleCart
                      product={item}
                      key={index}
                      index={index}
                      setRemoveUpdate={setRemoveUpdate}
                      isCheckPage={false}
                    ></SingleCart>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* cart footer */}
          <div className="border-t border-gray-200 py-4 px-4 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>
                ${parseFloat(cart?.reduce((a, b) => a + b.price, 0)).toFixed(2)}
              </p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-4">
              <NavLink
                to="/checkout"
                className="flex justify-center items-center px-6 py-2 border border-transparent rounded shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Checkout
              </NavLink>
            </div>
            <div className="mt-4 flex justify-center text-sm text-center text-gray-500">
              <p>
                or{" "}
                <NavLink
                  to="/products"
                  type="button"
                  className="text-indigo-600 font-medium hover:text-indigo-500"
                >
                  Continue Shopping<span aria-hidden="true"> &rarr;</span>
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCanvas;
