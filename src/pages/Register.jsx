import React, { useState } from "react";
import toast from "react-hot-toast";
import { registerUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { setEncryptedData } from "../utils/encryption";
import { ArrowLeft } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
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

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const data = await registerUser(formData);
      setEncryptedData("token", data.token);
      setEncryptedData("user", data.user);
      toast.success("Registration successful");
      setFormData({ name: "", email: "", password: "" });
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-black">
      {loading && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-500">
          <span className="loader"></span>
        </div>
      )}
      <div className="bg-white/80 w-full backdrop-blur-md border-b border-gray-200 absolute top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link to="/">
            <button
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </Link>
        </div>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Create an Account</h1>
        <p className="text-gray-600 text-lg">Sign up to get started with your journey</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="container bg-white rounded-2xl shadow-xl border border-gray-100 p-5 md:p-8 w-full max-w-xl space-y-6"
      >
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="h-6 w-6 text-gray-400" />
            </div>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Email */}
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

        {/* Password */}
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

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {loading ? "Registering..." : <span className="flex items-center justify-center gap-3">Register <FaArrowRightLong /></span>}
        </button>
      </form>

      {/* Switch to login */}
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <button
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
