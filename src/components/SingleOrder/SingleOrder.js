import Ripple from "material-ripple-effects";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import Alert from "../../hooks/Alert";

const SingleOrder = ({
  order,
  setUpdateOrderId,
  allOrdersPage,
  orders,
  setOrders,
}) => {
  const ripple = new Ripple();
  const { fireToast } = Alert();
  const [isPopup, setIsPopup] = useState(false);

  const updateStatus = (orderId, status) => {
    fetch("https://glacial-bastion-21555.herokuapp.com/orders/", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ orderId: orderId, status: status }),
    })
      .then((res) => res.json())
      .then(() => setUpdateOrderId(orderId));
  };
  const deleteOrder = (orderId) => {
    fetch("https://glacial-bastion-21555.herokuapp.com/orders", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ _id: orderId }),
    })
      .then((res) => res.json())
      .then(() => {
        setUpdateOrderId(orderId);
        const filteredOrders = orders.filter((order) => order._id !== orderId);
        setOrders(filteredOrders);
        fireToast("success", "Removed Order!");
      })
      .catch(() => fireToast("error", "OOPS!"));
  };

  const confirmAlert = async (_id) => {
    return Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrder(_id);
        setUpdateOrderId(Math.random() * 10000);
      }
    });
  };

  const SingleCart = ({ item }) => {
    const [productDetials, setProductDetials] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      fetch(
        `https://glacial-bastion-21555.herokuapp.com/products/${item.productId}`
      )
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          setProductDetials(data);
        })
        .catch((err) => console.log(err));
    }, [item.productId]);

    if (isLoading) {
      return (
        <div className="flex justify-center align-center">
          <img
            src="https://i.ibb.co/QjZhgZc/load.gif"
            alt="Loading..."
            className="w-20"
          />
        </div>
      );
    }

    return (
      <>
        <div className="flex gap-20 p-3 w-96 justify-center items-center text-center">
          <div>
            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden flex items-center justify-center">
              <img
                src={productDetials?.photo}
                alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                className="max-w-full max-h-full"
              />
            </div>
          </div>
          <div className="text-right">
            <h1>{productDetials.name}</h1>
            <h1>Qty: {item.quantity}</h1>
            <h1>${item.price}</h1>
          </div>
        </div>
        <hr />
      </>
    );
  };

  return (
    <>
      {isPopup && (
        <div className=" absolute top-0 left-0 m-auto w-full h-full bg-gray-900 bg-opacity-75 p-3 md:p-8 z-50">
          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg relative">
            <i
              className="fas fa-times-circle absolute top-5 right-5 text-2xl cursor-pointer"
              onClick={() => setIsPopup(!isPopup)}
            ></i>
            <div className="flex flex-col max-h-full overflow-y-auto m-auto">
              {order.cart.map((item, index) => {
                return <SingleCart item={item} key={index}></SingleCart>;
              })}
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 text-sm">
        <div className="flex items-start flex-col py-2 md:py-6 px-6">
          <span className="text-indigo-600">{order.name}</span>
          <span className="text-gray-500">{order.email}</span>
          {allOrdersPage && (
            <>
              <span className="text-blue-600">
                <i className="fas fa-map-marker-alt mr-2"></i>
                {order.address}
              </span>
              <span className="text-gray-500">
                <i className="fas fa-phone-alt mr-2"></i>
                {order.phone}
              </span>
            </>
          )}
          <button
            className="bg-indigo-200 hover:bg-indigo-300 text-indigo-700 px-3 py-1 rounded-full mt-3"
            onClick={() => setIsPopup(!isPopup)}
          >
            Details
          </button>
        </div>
        <div className="text-center flex items-center justify-center overflow-hidden flex-col">
          <NavLink
            onMouseUp={(e) => ripple.create(e, "light")}
            to={`/purchase/${order.productId}`}
            className="text-indigo-600"
          ></NavLink>
          ${order.price}
        </div>
        <div className="text-center flex items-center justify-center">
          <span
            className={`px-3 py-1 rounded-full ${
              order.status === "Rejected"
                ? "bg-red-200 text-red-700"
                : order.status === "Shipped"
                ? "bg-green-200 text-green-700"
                : "bg-indigo-200 text-indigo-600 "
            }`}
          >
            {order.status}
          </span>
        </div>
        <div className="text-center flex items-center justify-end py-2 md:py-6 px-6">
          <div className="flex items-center space-x-2 text-2xl">
            {allOrdersPage && (
              <>
                <i
                  className="fas fa-check-circle text-green-500 cursor-pointer"
                  onClick={() => updateStatus(order._id, "Shipped")}
                ></i>
                <i
                  className="fas fa-shipping-fast text-indigo-400 cursor-pointer"
                  onClick={() => updateStatus(order._id, "Pending")}
                ></i>
                <i
                  className="fas fa-times-circle text-red-500 cursor-pointer"
                  onClick={() => updateStatus(order._id, "Rejected")}
                ></i>
              </>
            )}
            <button
              onMouseUp={(e) => ripple.create(e, "light")}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-xl rounded"
              onClick={() => confirmAlert(order._id)}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default SingleOrder;
