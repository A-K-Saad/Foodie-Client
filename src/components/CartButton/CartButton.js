import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const CartButton = ({ cartUpdate }) => {
  const [cart, setCart] = useState(0);
  const { user } = useAuth();
  useEffect(() => {
    if (user?.email) {
      fetch(`https://glacial-bastion-21555.herokuapp.com/carts/${user?.email}`)
        .then((res) => res.json())
        .then((data) => setCart(data));
    } else {
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (!cart) {
        cart = [];
      }
      setCart(cart);
    }
  }, [user?.email, cartUpdate]);

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 m-auto flex items-center">
        <div className="bg-white shadow rounded-l-md p-5 text-center">
          <i className="fas fa-shopping-basket text-2xl text-gray-800"></i>
          <h1 className="font-black text-gray-700">
            {cart.length || 0} {cart.length > 1 ? "Items" : "Item"}
          </h1>
        </div>
      </div>
    </>
  );
};

export default CartButton;
