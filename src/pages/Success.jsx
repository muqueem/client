import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";  // useParams instead of useLocation
import { FaCheckCircle } from "react-icons/fa";
import { getSubscriptionByToken } from "../api/auth";

const Success = () => {
  const { token } = useParams();  // Get token from URL param
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError("No session ID provided.");
      setLoading(false);
      return;
    }

    const fetchSubscription = async () => {
      try {
        const data = await getSubscriptionByToken(token); // token = sessionId
        setSubscription(data);
      } catch (err) {
        setError(err.message || "Failed to verify subscription.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [token]);


  if (loading) {
    return <div>Loading your subscription details...</div>;
  }

  if (error) {
    return (
      <div>
        <p className="text-red-600 mb-4">{error}</p>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 p-8 flex flex-col justify-between items-center transition-all duration-300 hover:shadow-2xl">
        <FaCheckCircle className="text-7xl text-green-600 mb-5" />
        <h1 className="text-4xl font-bold text-[#0083cf] mb-4">Payment Successful!</h1>
        <p className="text-gray-700 mb-6">
          Your subscription for <strong>{subscription?.productId?.name}</strong> ({subscription?.planName}) has been activated.
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
};

export default Success;
