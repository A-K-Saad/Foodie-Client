import React, { useEffect, useState } from "react";
import SingleOrder from "../../../components/SingleOrder/SingleOrder";
import useAuth from "../../../hooks/useAuth";

const MyOrders = () => {
  const { user } = useAuth();
  const [myOrders, setMyOrders] = useState([]);
  const [updateOrderId, setUpdateOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://glacial-bastion-21555.herokuapp.com/my-orders/${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setUpdateOrderId("");
        setMyOrders(data);
      });
  }, [user, updateOrderId]);

  if (isLoading) {
    return (
      <div className="flex justify-center align-center absolute">
        <img
          src="https://i.ibb.co/QjZhgZc/load.gif"
          alt="Loading..."
          className="w-24"
        />
      </div>
    );
  }
  if (!isLoading && myOrders.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center text-center">
        <i className="fas fa-box-open text-9xl text-gray-500"></i>
        <h1 className="text-2xl text-gray-800">No Orders Here</h1>
        <p className="text-xl">Add Product to checkout!</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full m-auto md:px-8">
        <div className="table rounded-lg w-full shadow-md">
          <div className="grid grid-cols-4 py-4">
            <div className="text-left md:pl-6">Recipient</div>
            <div className="text-center">Price</div>
            <div className="text-center">Status</div>
            <div className="text-right md:pr-6">Action</div>
          </div>
          <hr />
          {myOrders?.map((order) => {
            return (
              <SingleOrder
                key={order._id}
                order={order}
                setUpdateOrderId={setUpdateOrderId}
                orders={myOrders}
                setOrders={setMyOrders}
              ></SingleOrder>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
