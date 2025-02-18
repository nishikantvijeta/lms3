import React, { useState } from "react";
import { toast } from "react-hot-toast";
//import axiosInstance from "../Helper/axiosInstance";
import Layout from "../Layout/Layout";

const Contact = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });
 // const [loading, setLoading] = useState(false);
  // function to handle the input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInput({ ...userInput, [name]: value });
  };

  // function to send form data to backend
  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   // check for empty fields
  //   if (!userInput.email || !userInput.name || !userInput.message) {
  //     toast.error("All fields are mandatory");
  //     return;
  //   }

  //   // email validation using regex
  //   if (
  //     !userInput.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
  //   ) {
  //     toast.error("Invalid email id");
  //     return;
  //   }

  //   try {
  //     const res = await axiosInstance.post("/contact", { ...userInput });
  //     toast.promise(res, {
  //       loading: "Submitting your message...",
  //       success: "Form submitted successfully",
  //       error: "Failed to submit the form",
  //     });
  //     const response = await res;

  //     // clearing the input fields after successfull submission of form
  //     if (response?.data?.success) {
  //       setUserInput({
  //         name: "",
  //         email: "",
  //         message: "",
  //       });
  //     }
  //   } catch (error) {
  //     toast.error("Operation failed...");
  //   }
  // };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("All fields are mandatory");
      return;
    }
  
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbwmn-kDblo7_Ng4xpM4mo5drl_e3p4arG6JAPJ1-uyk_c37LP0jzRj3aumODb5lF983aQ/exec";
  
    const formData = new FormData();
    formData.append("name", userInput.name);
    formData.append("email", userInput.email);
    formData.append("message", userInput.message);
  
    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        toast.success("Message sent successfully!");
        setUserInput({ name: "", email: "", message: "" });
  
        // Show success message for 3 seconds
        setTimeout(() => {
          toast.dismiss();
        }, 3000);
      } else {
        toast.error("Failed to send message!");
      }
    } catch (error) {
      toast.error("Error! " + error.message);
      console.error("Error!", error);
    }
  };
  
  

  return (
    <Layout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]"
        >
          <h1 className="text-3xl font-semibold">Contact Form</h1>
          <div className="flex flex-col w-full gap-1">
            <label className="text-xl font-semibold" htmlFor="name">
              Name
            </label>
            <input
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={userInput.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label className="text-xl font-semibold" htmlFor="email">
              Email
            </label>
            <input
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="email"
              type="email"
              name="email"
              placeholder="Enter the email"
              value={userInput.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label className="text-xl font-semibold" htmlFor="message">
              Message
            </label>
            <textarea
              className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
              name="message"
              id="message"
              placeholder="Enter your message"
              value={userInput.message}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Contact;
