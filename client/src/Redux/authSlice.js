import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

// ✅ Login Function
export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    console.log("🔑 Attempting Login with Data:", data);

    let res = axiosInstance.post("/user/login", data);
    await toast.promise(res, {
      loading: "Logging in...",
      success: (data) => data?.data?.message,
      error: "Failed to log in",
    });

    res = await res;
    console.log("✅ Login Success:", res.data);

    // Store token & user details
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("data", JSON.stringify(res.data.user));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", res.data.user.role);

    return res.data;
  } catch (error) {
    console.error("❌ Login Failed:", error?.response?.data?.message || error.message);
    toast.error(error.message);
    throw error;
  }
});

// ✅ Fetch User Data Function
export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("📝 Fetching User Data...");
    console.log("🔍 Stored Token:", token);

    if (!token) {
      console.warn("⚠️ No Token Found! User might not be logged in.");
      throw new Error("No authentication token found");
    }

    const res = await axiosInstance.get("/user/me");
    console.log("👤 User Data:", res?.data);
    return res?.data;
  } catch (error) {
    console.error("❌ Fetch User Failed:", error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || "Unauthorized request");
    throw error;
  }
});

// ✅ Logout Function
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    console.log("🚪 Logging Out...");
    let res = axiosInstance.post("/user/logout");

    await toast.promise(res, {
      loading: "Logging out...",
      success: (data) => data?.data?.message,
      error: "Failed to log out",
    });

    res = await res;
    console.log("✅ Logout Successful:", res.data);

    // Clear localStorage
    localStorage.clear();
    console.log("🗑️ Local Storage Cleared!");

    return res.data;
  } catch (error) {
    console.error("❌ Logout Failed:", error.message);
    toast.error(error.message);
    throw error;
  }
});

// ✅ Initial State
const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  user: JSON.parse(localStorage.getItem("data")) || null,
  loading: false,
  error: null,
};

// ✅ Create Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login Reducers
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Fetch User Data Reducers
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Logout Reducers
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
