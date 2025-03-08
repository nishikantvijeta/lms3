import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { getUserData } from "../../Redux/authSlice";
import { cancelCourseBundle } from "../../Redux/razorpaySlice";

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.data);

  // function to handle cancel subscription of course
  const handleCourseCancelSubscription = () => {
    dispatch(cancelCourseBundle()).then(() => {
      dispatch(getUserData());
    });
  };

  useEffect(() => {
    dispatch(getUserData()); // Fetch user details on mount
  }, [dispatch]);

  return (
    <Layout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-80 shadow-[0_0_10px_black]">
          {/* User Avatar */}
          <img
            className="w-40 m-auto rounded-full border border-black"
            src={userData?.avatar?.secure_url || "/default-avatar.jpg"}
            alt="User Profile Preview"
          />

          {/* User Name */}
          <h3 className="text-xl font-semibold text-center capitalize">
            {userData?.fullName || "User"}
          </h3>

          {/* User Details */}
          <div className="grid grid-cols-2">
            <p>Email :</p>
            <p>{userData?.email || "N/A"}</p>
            <p>Role :</p>
            <p>{userData?.role || "N/A"}</p>
            <p>Subscription :</p>
            <p>
              {userData?.subscription?.status
                ? userData.subscription.status === "active"
                  ? "Active"
                  : "Inactive"
                : "No Subscription"}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between gap-2">
            <Link
              to={userData?.email === "test@gmail.com" ? "/denied" : "/changepassword"}
              className="w-1/2 bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              <button>Change Password</button>
            </Link>

            <Link
              to={userData?.email === "test@gmail.com" ? "/denied" : "/user/editprofile"}
              className="w-1/2 border border-yellow-600 hover:border-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              <button>Edit Profile</button>
            </Link>
          </div>

          {/* Cancel Subscription Button */}
          {userData?.subscription?.status === "active" && (
            <button
              onClick={handleCourseCancelSubscription}
              className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

