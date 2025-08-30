import React from "react";
import { Link } from "react-router-dom";
import { TbXboxX } from "react-icons/tb";

const Success = () => (
    <div className="flex justify-center items-center h-[70vh]">
        <div
            className={`relative bg-white rounded-2xl shadow-xl border border-gray-200 p-8 flex flex-col justify-between items-center transition-all duration-300 hover:shadow-2xl`} >
            <TbXboxX className="text-7xl text-red-600 mb-5" />
            <h1 className="text-4xl font-bold text-[#0083cf] mb-4">Payment Cancelled</h1>
            <p className="text-gray-700 mb-6">You did not complete the payment..</p>
            <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all">
                Home
            </Link>
        </div>
    </div>
);

export default Success;
