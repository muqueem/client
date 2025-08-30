import React, { useState } from "react";
import toast from 'react-hot-toast';
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { setEncryptedData } from "../utils/encryption";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const data = await loginUser(formData);
      setEncryptedData("token", data.token);
      setEncryptedData("user", data.user);
      toast.success("Login successful!");
      setFormData({ email: "", password: "" });
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen text-black">
      {loading && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-500">
          <span className="loader"></span>
        </div>
      )}

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Welcome back</h1>
        <p className="text-gray-600 text-lg">Sign in to your account to continue</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 w-full max-w-xl space-y-6"
      >
        <div>
          <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdEmail className="h-6 w-6 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-lg font-semibold text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoMdLock className="h-6 w-6 text-gray-400" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? (
                <FaRegEyeSlash className="h-6 w-6 text-gray-400 hover:text-gray-600 transition-colors" />
              ) : (
                <FaRegEye className="h-6 w-6 text-gray-400 hover:text-gray-600 transition-colors" />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline cursor-pointer"
            onClick={() => console.log("Navigate to forgot password")}
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {loading ? "Logging in..." : <span className="flex items-center justify-center gap-3">Login <FaArrowRightLong /></span>}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <button
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 hover:underline"
            onClick={() => navigate("/register")}
          >
            Create account
          </button>
        </p>
      </div>

      <div className="mt-6 text-center">
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
          <button
            className="hover:text-gray-700 transition-colors duration-200"
            onClick={() => console.log("Navigate to privacy policy")}
          >
            Privacy Policy
          </button>
          <span>•</span>
          <button
            className="hover:text-gray-700 transition-colors duration-200"
            onClick={() => console.log("Navigate to terms")}
          >
            Terms of Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
