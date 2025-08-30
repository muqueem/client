import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const Success = () => (
  <div className="flex justify-center items-center h-[70vh]">
    <div
      className={`relative bg-white rounded-2xl shadow-xl border border-gray-200 p-8 flex flex-col justify-between items-center transition-all duration-300 hover:shadow-2xl`}
    >
      <FaCheckCircle className="text-7xl text-green-600 mb-5" />
      <h1 className="text-4xl font-bold text-[#0083cf] mb-4">
        Payment Successful!
      </h1>
      <p className="text-gray-700 mb-6">
        Your subscription has been activated.
      </p>
      <Link
        to="/my-account/my-subscription"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all"
      >
        My Subscription
      </Link>
    </div>
  </div>
);

export default Success;
