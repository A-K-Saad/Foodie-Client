import React, { useEffect, useState } from "react";
import Ripple from "material-ripple-effects";
import Progress from "../../../components/RatingForm/Progress/Progress";
import RatingForm from "../../../components/RatingForm/RatingForm";
import "./ProductReviews.css";
import useAuth from "../../../hooks/useAuth";

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const { user, isAdmin } = useAuth();
  const ripple = new Ripple();

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://glacial-bastion-21555.herokuapp.com/ratings/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
    fetch("https://glacial-bastion-21555.herokuapp.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      });
  }, [productId, updateId]);

  const deleteReview = (id) => {
    fetch("https://glacial-bastion-21555.herokuapp.com/ratings", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setUpdateId(Math.random() * 10000);
      });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center align-center">
        <img
          src="https://i.ibb.co/QjZhgZc/load.gif"
          alt="Loading"
          className="w-10"
        />
      </div>
    );
  }

  return (
    <>
      <div className="text-left p-2 md:p-5">
        <Progress reviews={reviews}></Progress>
        <br />
        <div className="py-5">
          <hr />
          {reviews?.map((review) => {
            const reviewUser = users?.find(
              (user) => user.email === review.email
            );
            const unrated = [];
            const rated = [];
            for (let i = 0; i < review.rates; i++) {
              rated.push(i);
            }
            for (let i = 0; i < 5 - review.rates; i++) {
              unrated.push(i);
            }
            return (
              <div key={review._id} className="pt-5 relative">
                {user?.email === review.email ||
                  (isAdmin && (
                    <div className="absolute top-5 right-5 text-lg bg-gray-100 text-gray-400 w-10 h-10 rounded-full">
                      <button
                        className="flex items-center justify-center w-full h-full rounded-full"
                        onMouseUp={(e) => ripple.create(e, "dark")}
                        onClick={() => deleteReview(review._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))}
                <div className="flex items-center space-x-5">
                  <div className="w-10 h-10 flex items-center justify-center overflow-hidden border rounded-full">
                    <img src={reviewUser?.avatar} alt="Avatar" />
                  </div>
                  <div>
                    <h1 className="text-lg">{review?.name.slice(0, 10)}.</h1>
                    <h1>
                      {reviewUser?.email.replace(
                        /(\w{3})[\w.-]+@([\w.]+\w)/,
                        "$1***@$2"
                      )}
                    </h1>
                  </div>
                </div>
                {rated.map((i) => {
                  return (
                    <i key={i} className="fas fa-star mx-1 text-yellow-400"></i>
                  );
                })}
                {unrated.map((i) => {
                  return (
                    <i key={i} className="fas fa-star mx-1 text-gray-400"></i>
                  );
                })}
                <div className="p-5 text-gray-400">
                  <p className="border-l-2 pl-5 py-2 whitespace-pre-line">
                    {review.message}
                  </p>
                  <br />
                  {review.image && (
                    <div
                      className="w-56 cursor-pointer left-0 top-0 z-50 bg-gray-800 bg-opacity-75 flex items-center justify-center rounded-lg"
                      onClick={(e) => {
                        e.target.classList.remove(
                          "fixed",
                          "w-full",
                          "h-full",
                          "p-4"
                        );
                      }}
                    >
                      <img
                        src={review.image}
                        alt="Review"
                        className="w-96 border rounded"
                        onClick={(e) => {
                          e.target.parentNode.classList.add(
                            "fixed",
                            "w-full",
                            "h-full",
                            "p-4"
                          );
                        }}
                      />
                    </div>
                  )}
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
      <RatingForm droneId={productId} setUpdateId={setUpdateId}></RatingForm>
    </>
  );
};

export default ProductReviews;
