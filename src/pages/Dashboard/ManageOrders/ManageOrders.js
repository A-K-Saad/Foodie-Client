import React, { useEffect, useState } from "react";
import SingleOrder from "../../../components/SingleOrder/SingleOrder";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [updateOrderId, setUpdateOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://foodie-mart-aks.onrender.com/orders")
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setOrders(data);
        setUpdateOrderId("");
      });
  }, [updateOrderId]);

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
  if (!isLoading && orders.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center text-center">
        <i className="fas fa-box-open text-9xl text-gray-500"></i>
        <h1 className="text-2xl text-gray-800">No Orders Here</h1>
        <p className="text-xl">Add Product to checkout!</p>
      </div>
    );
  }

  return (
    // <div className="h-full w-full">
    //   <div className="md:p-9">
    //     <div className="flex items-center justify-center h-full w-full">
    <div className="w-full m-auto p-1 md:p-8">
      <div className="table rounded-lg w-full shadow-md  bg-white">
        <div className="grid grid-cols-4 py-4">
          <div className="text-left md:pl-6">Recipient</div>
          <div className="text-center">Price</div>
          <div className="text-center">Status</div>
          <div className="text-right md:pr-6">Action</div>
        </div>
        <hr />
        {orders?.map((order) => {
          return (
            <SingleOrder
              key={order._id}
              order={order}
              setUpdateOrderId={setUpdateOrderId}
              allOrdersPage={true}
              orders={orders}
              setOrders={setOrders}
            ></SingleOrder>
          );
        })}
      </div>
    </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ManageOrders;
