import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaBackspace } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const LoginPage = () => {
  const { loginUser, googleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = "DashEstate | Login";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // 🔐 Implement login logic here (Firebase/Auth)
    loginUser(data.email, data.password)
      .then((result) => {
        Swal.fire({
          title: "Successfully Login!",
          icon: "success",
          draggable: true,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error("Login fail" + error.code);
      });
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // 🔐 Handle Google login here
    googleLogin()
      .then((res) => {
        const user = res.user;
        const userInfo = {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
          address: "Google Account",
          role: "user",
          status: "active",
          createdAt: new Date(),
          firebaseUid: user?.uid,
        };

        axiosPublic
          .post("/users", userInfo)
          .then(() => {
            Swal.fire({
              title: "Google Login Successfully...!",
              icon: "success",
              draggable: true,
            });
            navigate(`${location.state ? location.state : "/"}`);
          })
          .catch((err) => {
            console.error("Google user save error:", err);
            toast.error("Google user save failed.");
          });
      })
      .catch((err) => {
        toast.error("Google Login fail " + err.message);
      });
  };

  return (
    <div className="min-h-screen bg-orange-50/80 flex items-center justify-center px-4">
      <div className="bg-orange-50 shadow-xl rounded-2xl p-8 w-full max-w-md">
        <Link to="/">
          <FaBackspace className="text-orange-500 text-3xl cursor-pointer"></FaBackspace>
        </Link>
        <h2 className="text-2xl font-bold mb-6 text-center text-[#1b2a4f]">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 outline-0 focus:border-orange-500"
              placeholder="you@example.com"
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
                minLength: {
                  value: 6,
                  message: "Must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-0 focus:border-orange-500 pr-10 text-black"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-600 hover:text-gray-800 focus:outline-none"
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
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-[#1b2a4f] transition cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border hover:border-0 border-orange-500 py-2 rounded-lg hover:bg-[#1b2a4f47] transition text-black cursor-pointer"
        >
          <FaGoogle className="mr-2 text-orange-500" />
          Continue with Google
        </button>

        {/* Redirect to Register */}
        <p className="text-center text-sm text-gray-700 mt-4">
          Don't have an account?{" "}
          <Link
            to="/authLayout/register"
            className="text-orange-500 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
