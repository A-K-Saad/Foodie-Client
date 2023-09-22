import Ripple from "material-ripple-effects";
import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  let { url } = useRouteMatch();
  const { isAdmin } = useAuth();
  const ripple = new Ripple();

  return (
    <>
      {/* Sidebar starts */}
      {/* Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] */}
      <div
        className={`md:w-1/5 absolute md:relative z-40 bg-white shadow md:h-full transition-all transition-500 flex-col justify-between md:flex min-h-screen ${
          isMenuOpen
            ? "flex w-auto translate-x-0 md:translate-x-0"
            : "md:translate-x-0 -translate-x-full"
        }`}
      >
        <div className="overflow-y-auto h-screen">
          <div className="flex align-center justify-between md:justify-center w-full px-2 md:px-0">
            <NavLink
              exact
              to="/"
              onMouseUp={(e) => ripple.create(e, "light")}
              className="h-16 flex items-center justify-center py-9"
            >
              <img
                src="https://i.ibb.co/CtM2sZx/foodie.png"
                alt="Foodie"
                className="w-20 md:w-28"
              />
            </NavLink>
            <button
              className="inline-block md:hidden mr-3"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-times text-2xl text-gray-600"></i>
            </button>
          </div>
          <hr />
          <ul className="mt-6">
            <NavLink
              onMouseUp={(e) => ripple.create(e, "light")}
              exact
              to={`${url}`}
              className="flex w-full justify-between text-gray-600 hover:text-blue-700 hover:bg-blue-100 cursor-pointer items-center py-3 pl-4 pr-5 md:px-8 text-md"
              activeClassName="text-blue-700 bg-blue-100"
            >
              <div className="flex items-center">
                <i className="fab fa-dropbox w-6"></i>
                <span className="ml-2">Dashboard</span>
              </div>
            </NavLink>
            {isAdmin && (
              <>
                <NavLink
                  exact
                  onMouseUp={(e) => ripple.create(e, "light")}
                  to={`${url}/manage-products`}
                  className="flex w-full justify-between text-gray-600 hover:text-blue-700 hover:bg-blue-100 cursor-pointer items-center py-3 pl-4 pr-5 md:px-8 text-md"
                  activeClassName="text-blue-700 bg-blue-100"
                >
                  <div className="flex items-center">
                    <i className="far fa-folder-open w-6"></i>
                    <span className="ml-2">Manage Products</span>
                  </div>
                </NavLink>
                <NavLink
                  onMouseUp={(e) => ripple.create(e, "light")}
                  exact
                  to={`${url}/manage-orders`}
                  className="flex w-full justify-between text-gray-600 hover:text-blue-700 hover:bg-blue-100 cursor-pointer items-center py-3 pl-4 pr-5 md:px-8 text-md"
                  activeClassName="text-blue-700 bg-blue-100"
                >
                  <div className="flex items-center">
                    <i className="fas fa-pallet w-6"></i>
                    <span className="ml-2">Manage Orders</span>
                  </div>
                </NavLink>
                <NavLink
                  onMouseUp={(e) => ripple.create(e, "light")}
                  exact
                  to={`${url}/manage-users`}
                  className="flex w-full justify-between text-gray-600 hover:text-blue-700 hover:bg-blue-100 cursor-pointer items-center py-3 pl-4 pr-5 md:px-8 text-md"
                  activeClassName="text-blue-700 bg-blue-100"
                >
                  <div className="flex items-center">
                    <i className="fas fa-user-shield w-6"></i>
                    <span className="ml-2">Manage Users</span>
                  </div>
                </NavLink>
                <NavLink
                  onMouseUp={(e) => ripple.create(e, "light")}
                  exact
                  to={`${url}/add-product`}
                  className="flex w-full justify-between text-gray-600 hover:text-blue-700 hover:bg-blue-100 cursor-pointer items-center py-3 pl-4 pr-5 md:px-8 text-md"
                  activeClassName="text-blue-700 bg-blue-100"
                >
                  <div className="flex items-center">
                    <i className="fas fa-plus-square w-6"></i>
                    <span className="ml-2">Add Product</span>
                  </div>
                </NavLink>
              </>
            )}
            <NavLink
              exact
              onMouseUp={(e) => ripple.create(e, "light")}
              to={`${url}/my-orders`}
              className="flex w-full justify-between text-gray-600 hover:text-blue-700 hover:bg-blue-100 cursor-pointer items-center py-3 pl-4 pr-5 md:px-8 text-md"
              activeClassName="text-blue-700 bg-blue-100"
            >
              <div className="flex items-center">
                <i className="fas fa-box-open w-6"></i>
                <span className="ml-2">My Orders</span>
              </div>
            </NavLink>
            {!isAdmin && (
              <>
                <NavLink
                  exact
                  onMouseUp={(e) => ripple.create(e, "light")}
                  to={`${url}/add-review`}
                  className="flex w-full justify-between text-gray-600 hover:text-blue-700 hover:bg-blue-100 cursor-pointer items-center py-3 pl-4 pr-5 md:px-8 text-md"
                  activeClassName="text-blue-700 bg-blue-100"
                >
                  <div className="flex items-center">
                    <i className="fas fa-comment-dots w-6"></i>
                    <span className="ml-2">Add A Review</span>
                  </div>
                </NavLink>
              </>
            )}
            <NavLink
              exact
              onMouseUp={(e) => ripple.create(e, "light")}
              to={`${url}/overview`}
              className="flex w-full justify-between text-gray-600 hover:text-blue-700 hover:bg-blue-100 cursor-pointer items-center py-3 pl-4 pr-5 md:px-8 text-md"
              activeClassName="text-blue-700 bg-blue-100"
            >
              <div className="flex items-center">
                <i className="fas fa-info-circle w-6"></i>
                <span className="ml-2">Overview</span>
              </div>
            </NavLink>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
