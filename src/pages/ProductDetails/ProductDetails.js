import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Alert from "../../hooks/Alert";
import useAuth from "../../hooks/useAuth";

const ProductDetails = ({ setCartUpdate }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(product?.price * quantity);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { fireToast } = Alert();

  useEffect(() => {
    fetch(`https://glacial-bastion-21555.herokuapp.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setProduct(data);
      });
  }, [productId]);

  useEffect(() => {
    setPrice(parseFloat(product.price) * parseInt(quantity));
  }, [quantity, product.price]);

  const handleAddToCart = () => {
    if (user?.email) {
      fetch("https://glacial-bastion-21555.herokuapp.com/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email,
          productId: productId,
          quantity: quantity,
          price: parseFloat(parseFloat(price).toFixed(2)),
        }),
      })
        .then((res) => res.json())
        .then(() => {
          setQuantity(1);
          setPrice(product.price);
          setCartUpdate(Math.random() * 2788);
          fireToast("success", "Added To Cart!");
        })
        .catch(() => fireToast("error", "Something Went Wrong!"));
    } else {
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (!cart) {
        cart = [];
      }
      cart.push({
        productId: productId,
        quantity: quantity,
        price: parseFloat(parseFloat(price).toFixed(2)),
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      setQuantity(1);
      setPrice(product.price * 1);
      setCartUpdate(Math.random() * 9283);
      fireToast("success", "Added To Cart!");
    }
  };
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
    <section className="text-gray-600 overflow-hidden">
      <div className="container px-5 py-10 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div
            alt="aci"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded-lg bg-gray-100 flex items-center justify-center"
          >
            <img
              src={product.photo}
              alt={product.name}
              className="max-w-full w-60"
            />
          </div>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 flex flex-col justify-center">
            <h1 className="text-gray-900 mb-8 text-3xl title-font font-medium">
              {product.name}
            </h1>
            <p className="leading-relaxed">{product.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              {/* counter */}
              <div className="h-10 w-full">
                <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                  <button
                    className=" bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-full w-20 rounded-l cursor-pointer outline-none"
                    onClick={() =>
                      quantity !== 1 && setQuantity(parseInt(quantity) - 1)
                    }
                    type="button"
                  >
                    <span className="m-auto text-2xl font-thin">&minus;</span>
                  </button>
                  <input
                    type="number"
                    className="focus:outline-none text-center w-full bg-gray-100 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                    name="quantity"
                    value={quantity}
                    min="1"
                    onChange={(e) => setQuantity(e.target.value)}
                  ></input>
                  <button
                    className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-full w-20 rounded-r cursor-pointer"
                    onClick={() => setQuantity(parseInt(quantity) + 1)}
                    type="button"
                  >
                    <span className="m-auto text-2xl font-thin">&#43;</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <span className="font-medium text-2xl text-gray-900">
                ${price ? parseFloat(price).toFixed(2) : product.price}
              </span>
              <button
                className="ml-auto text-white bg-indigo-400 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-500 rounded"
                onClick={handleAddToCart}
                type="button"
              >
                <i className="fas fa-shopping-cart"></i> Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
