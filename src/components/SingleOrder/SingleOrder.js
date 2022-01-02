import Ripple from "material-ripple-effects";
import React from "react";
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

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 text-sm">
        <div className="flex items-start flex-col py-2 md:py-6 px-6">
          <span className="text-indigo-600">{order.name}</span>
          <span className="text-gray-500">{order.email}</span>
          {allOrdersPage && (
            <span className="text-blue-600">
              <i className="fas fa-map-marker-alt mr-2"></i>
              {order.address}
            </span>
          )}
        </div>
        <div className="text-center flex items-center justify-center overflow-hidden flex-col">
          <NavLink
            onMouseUp={(e) => ripple.create(e, "light")}
            to={`/purchase/${order.productId}`}
            className="text-indigo-600"
          >
            #{order.productId}
          </NavLink>
          Price: ${order.price}
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
