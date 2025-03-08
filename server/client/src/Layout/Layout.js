import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for checking user logged in or not
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  // for dispaying the options, according to user role
  const role = useSelector((state) => state?.auth?.role);

  // function to hide the drawer on close button click
  const hideDrawer = () => {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    // collapsing the drawer-side width to zero
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = 0;
  };

  // function for changing the drawer width on menu button click
  const changeWidth = () => {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  };

  // function to handle logout
  const handleLogout = async (event) => {
    event.preventDefault();

    // calling logout action
    const res = await dispatch(logout());

    // redirect to home page if true
    if (res?.payload?.success) navigate("/");
  };

  return (
    <div className="min-h-[90vh]">
      {/* adding the daisy ui drawer */}
      <div className="drawer absolute z-50 left-0 w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-white m-4"
            />
          </label>
        </div>

        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 sm:w-80 bg-base-100 text-base-content relative">
            {/* close button for drawer */}
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>

            <li>
              <Link to={"/"}>Home</Link>
            </li>

            {/* displaying dashboard, if user is logged in */}
            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
              </li>
            )}

            <li>
              <Link to={"/courses"}>All Courses</Link>
            </li>

            <li>
              <Link to={"/contact"}>Contact Us</Link>
            </li>

            <li>
              <Link to={"/about"}>About Us</Link>
            </li>

            {/* creating the bottom part of drawer */}
            {/* if user is not logged in */}
            {!isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex items-center justify-center">
                  <button className="btn-primary px-4 py-1 font-semibold rounded-md w-full">
                    <Link to={"/login"}>Login</Link>
                  </button>
                  <button className="btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                    <Link to={"/signup"}>Signup</Link>
                  </button>
                </div>
              </li>
            )}

            {/* if user is logged in */}
            {isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex items-center justify-center">
                  <button className="btn-primary px-4 py-1 font-semibold rounded-md w-full">
                    <Link to={"/user/profile"}>Profile</Link>
                  </button>
                  <button className="btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                    <Link onClick={handleLogout}>Logout</Link>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {children}

      {/* adding the footer content */}
      <Footer />
    </div>
  );
};

export default Layout;
