import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDecryptedData } from '../utils/encryption';
import { getUserSubscriptions, renewSupport } from '../api/auth';
import toast from 'react-hot-toast';

const MySubscription = () => {
  const token = getDecryptedData("token");
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await getUserSubscriptions(token);
        setSubscriptions(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptions();
  }, [token]);

  const handleRenewSupport = async (subscriptionId) => {
    if (!token) return;
    try {
      const res = await renewSupport({ subscriptionId }, token);
      setSubscriptions(res.subscription);
      console.log(res);
      toast.success(res.message);
    } catch (err) {
      console.error(err);
      toast.error("Failed to renew support ❌");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <p className="text-gray-600 text-lg animate-pulse">Loading your subscriptions…</p>
      </div>
    );
  }

  if (!subscriptions || subscriptions.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-16 px-4 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          You haven't purchased a subscription yet
        </h1>
        <Link
          to="/products"
          className="w-full max-w-xs mt-4 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base"
        >
          See Products
        </Link>
      </div>
    );
  }

  const supportEnd = subscriptions.supportEndDate
    ? new Date(subscriptions.supportEndDate).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: '2-digit',
      year: 'numeric'
    })
    : "Lifetime";

  return (
    <div className="flex flex-col items-center sm:px-6 py-10 space-y-6">
      <div
        key={subscriptions._id}
        className="w-full max-w-md relative bg-white rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6 flex flex-col transition-all duration-300 hover:shadow-2xl"
      >
        <span className="absolute top-4 right-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full">
          Current Plan
        </span>

        <h2 className="text-xl sm:text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-blue-600 inline-block px-6 sm:px-10 py-4 sm:py-6 rounded-md mb-4">
          {subscriptions.planName}
        </h2>

        <div className="px-2 sm:px-6">
          <p className="text-lg font-semibold text-gray-700">
            Product: {subscriptions.productId?.name}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 text-gray-600 text-sm sm:text-base">
            <h3 className="font-medium">Support Ends on:</h3>
            <p className="font-semibold">{supportEnd}</p>
          </div>
        </div>

        <button
          onClick={() => handleRenewSupport(subscriptions._id)}
          className="w-full mt-4 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base"
        >
          Renew Support
        </button>
      </div>
    </div>
  );
};

export default MySubscription;
