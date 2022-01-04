import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SingleCart from "../../components/CartCanvas/SingleCart/SingleCart";
import Alert from "../../hooks/Alert";
import useAuth from "../../hooks/useAuth";
import UseRazorPay from "../../hooks/useRazorPay";

const Checkout = ({ cartUpdate }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();
  const [removeUpdate, setRemoveUpdate] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const { fireToast } = Alert();
  const { loadRazorpay } = UseRazorPay();
  const history = useHistory();

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
  }, [user?.email, removeUpdate, cartUpdate]);

  const placeOrder = () => {
    fetch(`https://glacial-bastion-21555.herokuapp.com/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
        address: address,
        paymentId: paymentId,
        email: user?.email,
        price: cart?.reduce((a, b) => a + b.price, 0) + cart.length * 5,
        cart: cart,
        status: "Pending",
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setPaymentId("");
        fireToast("success", "Order Placed Successfully!");
        fetch(
          `https://glacial-bastion-21555.herokuapp.com/carts/${user?.email}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .catch((err) => console.log(err));
        history.push("/dashboard/my-orders");
      })
      .catch(() => fireToast("error", "Something Went Wrong!"));
  };

  return (
    <>
      <div className="px-5 md:px-10 lg:px-32 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-xl px-5 bg-white">
            <h1 className="mt-4 text-2xl">Order Summary</h1>
            <div className="h-96 overflow-y-auto">
              {cart?.length > 0 ? (
                cart?.map((item, index) => {
                  return (
                    <SingleCart
                      product={item}
                      key={index}
                      index={index}
                      setRemoveUpdate={setRemoveUpdate}
                      isCheckPage={true}
                    ></SingleCart>
                  );
                })
              ) : (
                <h1>Nothing Added To The Cart!</h1>
              )}
            </div>
            <hr />
            <div className="py-4 px-2">
              <div className="flex justify-between py-1">
                <span>Subtotal:</span>
                <span>${cart?.reduce((a, b) => a + b.price, 0)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Shipping:</span>
                <span>${cart.length * 5}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Total:</span>
                <span>
                  ${cart?.reduce((a, b) => a + b.price, 0) + cart.length * 5}
                </span>
              </div>
            </div>
          </div>
          <form
            className="px-4 flex flex-col justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              loadRazorpay(
                cart?.reduce((a, b) => a + b.price, 0) + cart.length * 5,
                setPaymentId,
                placeOrder
              );
            }}
          >
            <label className="block text-sm font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
            />
            <label
              className="block text-sm font-bold mb-2 mt-4"
              htmlFor="phone"
            >
              Phone:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              placeholder="Enter Your Phone Number"
              onChange={(e) => setPhone(e.target.value)}
            />
            <label
              className="block text-sm font-bold mb-2 mt-4"
              htmlFor="address"
            >
              Address:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="Enter Your Address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <button
              className="bg-indigo-400 hover:bg-indigo-500 rounded-full px-4 w-full py-2 mt-6 text-white transition-all"
              type="submit"
            >
              <i className="fas fa-credit-card mr-3"></i> Pay
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
