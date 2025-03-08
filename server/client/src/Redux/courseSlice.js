// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";
// import axiosInstance from "../Helper/axiosInstance";

// const initialState = {
//   coursesData: [],
// };

// // function to get all courses
// export const getAllCourses = createAsyncThunk("/course/get", async () => {
//   try {
//     const res = axiosInstance.get("/courses");

//     toast.promise(res, {
//       loading: "Loading courses data...",
//       success: "Courses loaded successfully",
//       error: "Failed to get courses",
//     });

//     const response = await res;

//     return response.data.courses;
//   } catch (error) {
//     toast.error(error?.response?.data?.message);
//   }
// });

// // function to create a new course
// export const createNewCourse = createAsyncThunk(
//   "/get/courses",
//   async (data) => {
//     try {
//       // creating the form data from user data
//       let formData = new FormData();
//       formData.append("title", data?.title);
//       formData.append("description", data?.description);
//       formData.append("category", data?.category);
//       formData.append("createdBy", data?.createdBy);
//       formData.append("thumbnail", data?.thumbnail);

//       const res = axiosInstance.post("/courses", formData);

//       toast.promise(res, {
//         loading: "Creating the course...",
//         success: "Course created successfully",
//         error: "Failed to create course",
//       });

//       const response = await res;
//       return response.data;
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     }
//   }
// );

// // function to delete the course
// export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
//   try {
//     const res = axiosInstance.delete(`courses/${id}`);

//     toast.promise(res, {
//       loading: "Deleting the course...",
//       success: "Courses deleted successfully",
//       error: "Failed to delete course",
//     });

//     const response = await res;

//     return response.data;
//   } catch (error) {
//     toast.error(error?.response?.data?.message);
//   }
// });

// // function to update the course details
// export const updateCourse = createAsyncThunk("/course/update", async (data) => {
//   try {
//     // creating the form data from user data
//     const formData = new FormData();
//     formData.append("title", data.title);
//     formData.append("category", data.category);
//     formData.append("createdBy", data.createdBy);
//     formData.append("description", data.description);
//     // backend is not allowing change of thumbnail
//     // if (data.thumbnail) {
//     //   formData.append("thumbnail", data.thumbnail);
//     // }

//     const res = axiosInstance.put(`/courses/${data.id}`, {
//       title: data.title,
//       category: data.category,
//       createdBy: data.createdBy,
//       description: data.description,
//     });

//     toast.promise(res, {
//       loading: "Updating the course...",
//       success: "Course updated successfully",
//       error: "Failed to update course",
//     });

//     const response = await res;
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     toast.error(error?.response?.data?.message);
//   }
// });

// const courseSlice = createSlice({
//   name: "course",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(getAllCourses.fulfilled, (state, action) => {
//       if (action.payload) {
//         state.coursesData = [...action.payload];
//       }
//     });
//   },
// });

// //export const {} = courseSlice.actions;
// export default courseSlice.reducer;





import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../Helper/axiosInstance";

const initialState = {
  coursesData: [],
};

// function to get all courses
export const getAllCourses = createAsyncThunk("/course/get", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/courses");

    await toast.promise(Promise.resolve(res), {
      loading: "Loading courses data...",
      success: "Courses loaded successfully",
      error: "Failed to get courses",
    });

    return res.data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to get courses");
    return thunkAPI.rejectWithValue(error?.response?.data?.message || "Something went wrong");
  }
});

// function to create a new course
export const createNewCourse = createAsyncThunk("/course/create", async (data, thunkAPI) => {
  try {
    let formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("category", data?.category);
    formData.append("createdBy", data?.createdBy);
    formData.append("thumbnail", data?.thumbnail);

    const res = await axiosInstance.post("/courses", formData);

    await toast.promise(Promise.resolve(res), {
      loading: "Creating the course...",
      success: "Course created successfully",
      error: "Failed to create course",
    });

    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to create course");
    return thunkAPI.rejectWithValue(error?.response?.data?.message || "Something went wrong");
  }
});

// function to delete the course
export const deleteCourse = createAsyncThunk("/course/delete", async (id, thunkAPI) => {
  try {
    const res = await axiosInstance.delete(`/courses/${id}`);

    await toast.promise(Promise.resolve(res), {
      loading: "Deleting the course...",
      success: "Course deleted successfully",
      error: "Failed to delete course",
    });

    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete course");
    return thunkAPI.rejectWithValue(error?.response?.data?.message || "Something went wrong");
  }
});

// function to update the course details
export const updateCourse = createAsyncThunk("/course/update", async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.put(`/courses/${data.id}`, {
      title: data.title,
      category: data.category,
      createdBy: data.createdBy,
      description: data.description,
    });

    await toast.promise(Promise.resolve(res), {
      loading: "Updating the course...",
      success: "Course updated successfully",
      error: "Failed to update course",
    });

    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to update course");
    return thunkAPI.rejectWithValue(error?.response?.data?.message || "Something went wrong");
  }
});

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        state.coursesData = [...action.payload];
      }
    });
  },
});

export default courseSlice.reducer;
