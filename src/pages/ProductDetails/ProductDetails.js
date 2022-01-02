import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`https://glacial-bastion-21555.herokuapp.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [productId]);

  return (
    <section className="text-gray-600 overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div
            alt="aci"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded-lg bg-gray-100 flex items-center justify-center"
          >
            <img src={product.photo} alt={product.name} />
          </div>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
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
                    onClick={() => quantity !== 1 && setQuantity(quantity - 1)}
                  >
                    <span className="m-auto text-2xl font-thin">&minus;</span>
                  </button>
                  <input
                    type="number"
                    className="focus:outline-none text-center w-full bg-gray-100 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                    name="custom-input-number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  ></input>
                  <button
                    className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-300 h-full w-20 rounded-r cursor-pointer"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <span className="m-auto text-2xl font-thin">&#43;</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <span className="font-medium text-2xl text-gray-900">
                ${parseFloat(product.price * quantity).toFixed(2)}
              </span>
              <button className="ml-auto text-white bg-indigo-400 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-500 rounded">
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
