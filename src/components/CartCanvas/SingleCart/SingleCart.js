import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Alert from "../../../hooks/Alert";
import useAuth from "../../../hooks/useAuth";

const SingleCart = ({ product, index, setRemoveUpdate, isCheckPage }) => {
  const [productDetials, setProductDetials] = useState({});
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(product.quantity);
  const { fireToast } = Alert();

  useEffect(() => {
    fetch(
      `https://glacial-bastion-21555.herokuapp.com/products/${product.productId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProductDetials(data);
      })
      .catch((err) => console.log(err));
  }, [product.productId]);

  const updateQuantity = () => {
    if (user?.email) {
      fetch(
        `https://glacial-bastion-21555.herokuapp.com/carts/${product._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: quantity + 1,
            price: parseFloat(productDetials.price * (quantity + 1)),
          }),
        }
      )
        .then((res) => res.json())
        .catch(() => fireToast("error", "Something went wrong!"));
    } else {
      let cart = JSON.parse(localStorage.getItem("cart"));
      cart[index].quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    setRemoveUpdate(Math.random() * 3908);
  };

  const deleteCart = () => {
    if (user?.email) {
      // delete the specified cart
      fetch(
        ` https://glacial-bastion-21555.herokuapp.com/carts/${product._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json)
        .then(() => setRemoveUpdate(Math.random() * 2788))
        .catch(() => fireToast("error", "Something Went Wrong!"));
    } else {
      const cart = JSON.parse(localStorage.getItem("cart"));
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      setRemoveUpdate(Math.random() * 3823);
    }
  };

  return (
    <>
      <li className="py-6 flex">
        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden flex items-center justify-center">
          <img
            src={productDetials?.photo}
            alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
            className="max-w-full max-h-full"
          />
        </div>

        <div className="ml-4 flex-1 flex flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <NavLink to={`/products/${product.productId}`}>
                  {productDetials?.name}
                </NavLink>
              </h3>
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={deleteCart}
              >
                <i className="fa fa-trash text-lg"></i>
              </button>
            </div>
          </div>
          <div className="flex-1 flex items-end justify-between text-sm">
            <p className="ml-4">
              ${parseFloat(productDetials?.price * quantity).toFixed(2)}
            </p>
            {!isCheckPage ? (
              <div className="flex">
                <button
                  className=" bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-full w-20 rounded-l cursor-pointer outline-none w-8"
                  onClick={() => {
                    quantity !== 1 && setQuantity(parseInt(quantity) - 1);
                    updateQuantity();
                  }}
                  type="button"
                >
                  <span className="m-auto text-2xl font-thin">&minus;</span>
                </button>
                <input
                  type="number"
                  className="focus:outline-none text-center w-10 bg-gray-100 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                  name="quantity"
                  value={quantity}
                  min="1"
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    updateQuantity();
                  }}
                ></input>
                <button
                  className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-full w-20 rounded-r cursor-pointer w-8"
                  onClick={() => {
                    setQuantity(parseInt(quantity) + 1);
                    updateQuantity();
                  }}
                  type="button"
                >
                  <span className="m-auto text-2xl font-thin">&#43;</span>
                </button>
              </div>
            ) : (
              <div>Quantity: {quantity}</div>
            )}
          </div>
        </div>
      </li>
      <hr />
    </>
  );
};

export default SingleCart;
