import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDecryptedData } from "../utils/encryption";
import apiRequest from "../api/auth";

export default function SuccessPage() {
  const params = useParams();
  const tokenParam = params.token;
  const token = getDecryptedData("token");
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !tokenParam) {
      navigate("/"); // no token → go home
      return;
    }

    const fetchSubscription = async (retries = 3, delay = 500) => {
      for (let i = 0; i < retries; i++) {
        try {
          const res = await apiRequest(
            `/subscription/success/${tokenParam}`,
            "GET",
            null,
            token
          );
          setSubscription(res);
          setLoading(false);
          setError(null);
          return;
        } catch (err) {
          console.log(`Attempt ${i + 1} failed:`, err.message);
          if (i < retries - 1) {
            await new Promise((resolve) => setTimeout(resolve, delay));
          } else {
            setError("Failed to load subscription details. Please try again.");
            setLoading(false);
          }
        }
      }
    };

    fetchSubscription();
  }, [token, tokenParam, navigate]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg animate-pulse">
          Loading...
        </p>
      </div>
    );
    

  // Calculate support duration
  const startDate = new Date(subscription.startDate || Date.now());
  const endDate = new Date(subscription.supportEndDate);
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl border border-gray-300 p-10 max-w-lg text-center">
        <div className="mb-6">
          <svg
            className="mx-auto w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
          Purchase Successful 🎉
        </h1>

        <p className="text-gray-700 text-lg mb-2">
          <span className="font-semibold">Product:</span>{" "}
          {subscription.productId?.name}
        </p>
        <p className="text-gray-700 text-lg mb-2">
          <span className="font-semibold">Plan:</span> {subscription.planName}
        </p>
        <p className="text-gray-700 text-lg mb-2">
          <span className="font-semibold">Support valid until:</span>{" "}
          {endDate.toLocaleDateString()}
        </p>
        <p className="text-gray-700 text-lg mb-6">
          <span className="font-semibold">Support Duration:</span> {diffDays}{" "}
          {diffDays === 1 ? "day" : "days"}
        </p>

        <button
          onClick={() => navigate("/my-account/my-subscription")}
          className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
        >
          My Subscription
        </button>
      </div>
    </div>
  );
}