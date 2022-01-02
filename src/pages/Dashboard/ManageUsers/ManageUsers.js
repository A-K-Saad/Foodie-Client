import Ripple from "material-ripple-effects";
import React, { useState, useEffect } from "react";
import Alert from "../../../hooks/Alert";
import useAuth from "../../../hooks/useAuth";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [success, setSuccess] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [email, setEmail] = useState("");
  const { user } = useAuth();
  const { sweetAlert } = Alert();
  const ripple = new Ripple();

  useEffect(() => {
    fetch("https://glacial-bastion-21555.herokuapp.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [adminEmail]);

  const handleAdminSubmit = (e) => {
    e.preventDefault();

    const existsInUser = users?.find((user) => user.email === email);
    if (!existsInUser) {
      sweetAlert("error", "OOPS!", "User does not exist!", false);
      return;
    }

    fetch("https://glacial-bastion-21555.herokuapp.com/users/admin", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ requester: user.email, request: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          setSuccess(true);
          setAdminEmail(email);
        }
      })
      .catch((error) => sweetAlert("error", "OOPS!", error.message, false));
    e.target.reset();
  };
  if (success) {
    sweetAlert("success", "Success!", "User has been made an admin!", false);
    setSuccess(false);
  }

  return (
    <div className="h-full w-full">
      <div className="flex flex-col items-center justify-center w-full p-5">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-start">
            <span className="pr-3 text-lg font-medium text-neutral-600 bg-gray-50 py-4">
              Make an Admin
            </span>
          </div>
        </div>
        <div className="w-full">
          <form
            className="w-full max-w-lg m-auto p-6 bg-white shadow-sm"
            onSubmit={handleAdminSubmit}
          >
            <div className="flex flex-wrap -mx-3 mb-6 justify-center">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Email:
                </label>
                <input
                  className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight outline-none focus:shadow-md shadow-sm"
                  id="grid-first-name"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onMouseUp={(e) => ripple.create(e, "light")}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 text-center flex items-center justify-center m-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Make Admin
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-start">
            <span className="pr-3 text-lg font-medium text-neutral-600 bg-gray-50 py-4">
              All Users
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-4">
          {users?.map((user) => (
            <div key={user._id}>
              <div className="bg-white shadow-md rounded p-2">
                <div className="w-12 relative">
                  <div className="rounded-full w-10 h-10 border border-gray-300 overflow-hidden">
                    <img
                      src={user.avatar}
                      onError={(e) =>
                        (e.target.src = "https://i.ibb.co/qgbdqZ3/male.png")
                      }
                      alt={user.name}
                      className="max-w-none h-full"
                    />
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 bottom-0 left-7 ${
                      user.role === "admin" ? "absolute" : "hidden"
                    }`}
                    fill="lightgreen"
                    viewBox="0 0 24 24"
                    stroke="white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    ></path>
                  </svg>
                </div>
                <div className="mt-3">
                  <h4 className="text-md">{user.displayName}</h4>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
