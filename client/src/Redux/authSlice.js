import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../Helper/axiosInstance";

// const initialState = {
//   isLoggedIn: localStorage.getItem("isLoggedIn") || false,
//   data: JSON.parse(localStorage.getItem("data")) || {},
//   role: localStorage.getItem("role") || "",
// };
const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  data: localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : {},
  role: localStorage.getItem("role") || "",
};

//const parsedData = JSON.parse(data);
// function to handle signup
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {

    console.log("creating the account: ");
    let res = axiosInstance.post("user/register", data);

    console.log("res(under create account): ",res)

    toast.promise(res, {
      loading: "Wait! Creating your account",
      success: (data) => {
        console.log("data: ", data);
        return data?.data?.message;
      },
      error: "Failed to create account",
    });

    // getting response resolved here
    res = await res;
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// function to handle login
export const login = createAsyncThunk("auth/login", async (data) => {
  try {
     console.log("Login Request Data:", data);
    let res = axiosInstance.post("/user/login", data);
    console.log("Login response:", res.data);
     
    await toast.promise(res, {
      loading: "Loading...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to log in",
    });

    // getting response resolved here
    res = await res;
    return res.data;
  } catch (error) {
    toast.error(error.message);
  }
});

// function to handle logout
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    let res = axiosInstance.post("/user/logout");

    await toast.promise(res, {
      loading: "Loading...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to log out",
    });

    // getting response resolved here
    res = await res;
    return res.data;
  } catch (error) {
    toast.error(error.message);
  }
});

// function to fetch user data
export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
   const res = await axiosInstance.get("/user/me");
console.log("User Data:", res.data);
    return res?.data;
  } catch (error) {
    toast.error(error.message);
  }
});

// function to change user password
export const changePassword = createAsyncThunk(
  "/auth/changePassword",
  async (userPassword) => {
    try {
      let res = axiosInstance.post("/user/change-password", userPassword);

      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to change password",
      });

      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to handle forget password
export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (email) => {
    try {
      let res =  axiosInstance.post("/user/reset", { email });

      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to send verification email",
      });

      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to update user profile
export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async (data) => {
    try {
      let res = axiosInstance.put(`/user/update/${data[0]}`, data[1]);

      toast.promise(res, {
        loading: "Updating...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to update profile",
      });
      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to reset the password
export const resetPassword = createAsyncThunk("/user/reset", async (data) => {
  try {
    let res = await axiosInstance.post(`/user/reset/${data.resetToken}`, {
      password: data.password,
    });

    toast.promise(res, {
      loading: "Resetting...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to reset password",
    });
    // getting response resolved here
    res = await res;
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // for user login
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })
      // for user logout
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.data = {};
      })
      // for user details
      .addCase(getUserData.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      });
  },
});

//export const {} = authSlice.actions;
export default authSlice.reducer;
