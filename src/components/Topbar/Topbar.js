import Ripple from "material-ripple-effects";
import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { HiMenuAlt1 } from "react-icons/hi";

const Topbar = ({ setIsMenuOpen }) => {
  const { user, logOut, primaryAvatar, primaryName } = useAuth();
  const ripple = new Ripple();

  return (
    <>
      <div className="flex justify-between items-center bg-white shadow-sm p-3 top-0">
        <button
          onMouseUp={(e) => ripple.create(e, "light")}
          className="border px-2 py-1 text-xl rounded text-gray-600 md:hidden"
          onClick={() => setIsMenuOpen(true)}
        >
          <HiMenuAlt1 className="leading-0" />
        </button>
        <div className="flex flex-col">
          <p className="text-gray-300 text-sm md:text-base">Welcome</p>
          <p className="text-sm text-red-500 md:text-xl">
            {user?.displayName || primaryName}
          </p>
        </div>
        <div className="flex items-center">
          <NavLink
            onMouseUp={(e) => ripple.create(e, "light")}
            to="/login"
            className="inline-block py-1 md:py-2 px-4 mx-2 rounded-full text-white transition-colors duration-150 bg-red-500 focus:shadow-outline hover:bg-red-600 border border-transparent"
            onClick={logOut}
          >
            <i className="fas fa-sign-out-alt"></i>{" "}
            <span className="hidden md:inline">Sign Out</span>
          </NavLink>
          <div className="overflow-hidden rounded-full p-0 w-10 h-10 border border-gray-300">
            <img
              src={
                user?.photoURL ||
                primaryAvatar ||
                "https://i.ibb.co/qgbdqZ3/male.png"
              }
              onError={(e) => {
                e.target.src = "https://i.ibb.co/qgbdqZ3/male.png";
              }}
              alt="Avatar"
              className="max-w-none md:h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
