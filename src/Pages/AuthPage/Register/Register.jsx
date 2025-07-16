import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaBackspace, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";




const Register = () => {
  const { createUser, updateUser, setUser, googleLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const axiosUser = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ Handle email/password registration
  const onSubmit = (data) => {
    createUser(data?.email, data?.password)
      .then((result) => {
        const user = result.user;

        updateUser({ displayName: data?.name, photoURL: data?.photoURL })
          .then(() => {
            const userInfo = {
              name: data?.name,
              email: data?.email,
              image: data?.photoURL,
              address: data?.address,
              role: "user",
              status: "active",
              createdAt: new Date()
            };

            axiosUser
              .post("/users", userInfo)
              .then((res) => {
                if (res.data.insertedId || res.data.acknowledged) {
                  Swal.fire({
                    title: "Register Successfully!",
                    icon: "success",
                  });
                  setUser({
                    ...user,
                    displayName: data.name,
                    photoURL: data.photoURL,
                  });
                  navigate("/");
                }
              })
              .catch((err) => {
                console.error("User DB save error:", err);
                toast.error("Failed to save user data.");
              });
          })
          .catch((error) => {
            console.log(error);
            setUser(user);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error("Register failed: " + errorMessage);
      });

    reset();
  };

  // ✅ Handle Google login + DB save
  const handleGoogleSignup = () => {
    googleLogin()
      .then((res) => {
        const user = res.user;
        console.log(user);
        const userInfo = {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
          address: "Google Account",
          role: "user",
          status: "active",
          createdAt: new Date()
        };

        axiosUser
          .post("/users", userInfo)
          .then(() => {
            Swal.fire({
              title: "Google Register Successfully!",
              icon: "success",
            });
            navigate("/");
          })
          .catch((err) => {
            console.error("Google user save error:", err);
            toast.error("Google user save failed.");
          });
      })
      .catch((err) => {
        toast.error("Google Sign-in failed: " + err.message);
      });
  };

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center px-4 py-8">
      <div className="bg-green-50 shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md">
        <Link to="/"><FaBackspace className="text-red-600 text-3xl cursor-pointer text-right"></FaBackspace></Link>
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
          Create a New Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-black text-black outline-0 focus:border-green-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              {...register("address", { required: "Address is required" })}
              placeholder="Enter your address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-black text-black outline-0 focus:border-green-500"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Picture URL */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Profile Picture URL
            </label>
            <input
              type="text"
              {...register("photoURL", {
                required: "Profile picture URL is required",
              })}
              placeholder="Enter image URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-black text-black outline-0 focus:border-green-500"
            />
            {errors.photoURL && (
              <p className="text-red-500 text-sm mt-1">
                {errors.photoURL.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-black text-black outline-0 focus:border-green-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
                validate: {
                  hasCapital: (value) =>
                    /[A-Z]/.test(value) || "Must have one capital letter",
                  hasSpecial: (value) =>
                    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                    "Must include a special character",
                },
              })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10 placeholder-black text-black outline-0 focus:border-green-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 clear-both cursor-pointer"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* Google Signup */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center border border-green-300 py-2 rounded-lg hover:bg-green-100 cursor-pointer"
        >
          <FaGoogle className="mr-2 text-green-500" />
          <span className="text-black">Continue with Google</span>
        </button>

        {/* Redirect to Login */}
        <p className="text-center text-sm text-gray-700 mt-4">
          Already have an account?{" "}
          <Link
            to="/authLayout/login"
            className="text-green-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
