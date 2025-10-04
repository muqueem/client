import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDecryptedData } from '../utils/encryption';
import { getUserSubscription, renewSupport } from '../api/auth';
import toast from 'react-hot-toast';

const MySubscription = () => {
  const token = getDecryptedData("token");
  const [subscription, setSubscriptions] = useState([]);
  const [plan, setPlan] = useState({});
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await getUserSubscription(token);
        setSubscriptions(res);
        setPlan(res.productId.plans.filter((plan) => plan.name === res.planName)[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptions();
  }, [token]);

  console.log(subscription);
  console.log(plan);

  const handleRenewSupport = async (subscriptionId) => {
    try {
      setLoader(true);
      const res = await renewSupport({ subscriptionId }, token);
      if (res.url) {
        window.location.href = res.url; // Redirect to Stripe Checkout
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoader(false);
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <p className="text-gray-600 text-lg animate-pulse">Loading your subscriptions…</p>
      </div>
    );
  }

  if (!subscription || subscription.length === 0) {
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

  const supportEnd = subscription.supportEndDate
    ? new Date(subscription.supportEndDate).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: '2-digit',
      year: 'numeric'
    })
    : "Lifetime";

  if (loader) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 bg-opacity-60 flex items-center justify-center">
        <span className="loader"></span>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col items-center px-4 sm:px-6 py-10 space-y-10 max-w-4xl mx-auto">
        <div className="relative w-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 sm:p-8 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold">
              {subscription.planName}
            </h2>
            <p className="text-sm mt-1">Plan Status: <span className="font-semibold">{subscription.isActive ? "Active" : "Inactive"}</span></p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Product Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Product:</h3>
              <p className="text-gray-600">{subscription.productId?.name}</p>
            </div>

            {/* Support Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Support Ends:</h4>
                <p className="text-gray-900">{supportEnd}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Renewal Cost:</h4>
                <p className="text-gray-900">
                  {plan.renew
                    ? `${plan.currency} ${plan.renew}`
                    : "No renewal available"}
                </p>
              </div>
            </div>

            {/* Product Description */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">About this EA:</h4>
              <p className="text-gray-600 whitespace-pre-line">{subscription.productId.description}</p>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Key Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {subscription.productId.features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Renew Button */}
            <div className="pt-4">
              <button
                onClick={() => handleRenewSupport(subscription._id)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 text-base"
              >
                Renew Support for ${plan.currency} ${plan.renew}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

};

export default MySubscription;
