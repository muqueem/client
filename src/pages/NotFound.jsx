import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center py-20 px-5 h-[90vh]">
      <h1 className="text-8xl font-bold text-red-600 mb-5">404</h1>
      <p className="text-lg text-[#555] mb-8">Oops! The page you are looking for does not exist.</p>
      <Link className="py-2.5 px-5 bg-[#0083cf] text-white rounded-md text-lg" to="/">Go Back</Link>
    </div>
  );
};

export default NotFound;
