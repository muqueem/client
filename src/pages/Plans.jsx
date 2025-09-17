import React, { useState, useEffect } from "react";
import { getPlans, getUserSubscription, verifyUser } from "../api/auth";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { getDecryptedData } from "../utils/encryption";

const Plans = () => {
  const token = getDecryptedData("token");
  const navigate = useNavigate();

  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userSub, setUserSub] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const res = await getPlans();
      setPlans(res)
      if (!token) return;
      try {
        setLoading(true);
        const [subscriptionData, loggedIn] = await Promise.all([
          token ? getUserSubscription(token) : null,
          token ? verifyUser(token) : null
        ]);
        setUserSub(subscriptionData);
        setIsLoggedin(loggedIn);
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [token]);

  const handleSelectedPlanId = (planId) => {
    if (planId === selectedPlanId) setSelectedPlanId(null);
    else {setSelectedPlanId(planId)};
  }

  const handlePurchase = async () => {
    if (!isLoggedin) {
      toast.error("Please login to purchase any Plan");
      return;
    }
    if (userSub) {
      toast.error("You already have an active subscription.");
      return;
    }
    if (!selectedPlanId) {
      toast.error("Please select a plan to purchase");
      return;
    }
    try {
      navigate(`/checkout/${selectedPlanId}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 transition-opacity duration-500">
          <span className="loader"></span>
        </div>
      )}
      <div className="relative flex flex-col justify-center items-center text-black">
        <section className="w-full bg-[#0083cf] text-white py-5">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Subscription Plans
            </h1>
            <p className="text-xl text-blue-100">
              Choose the plan that's right for you. Flexible plans for every need. Upgrade or purchase anytime.
            </p>
          </div>
        </section>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl w-full py-12">
          {plans.map((plan) => {
            const isCurrentPlan = userSub && userSub.planId?._id === plan._id;

            return (
              <div
                onClick={() => handleSelectedPlanId(plan._id)}
                key={plan._id}
                className={`relative bg-white rounded-2xl shadow-xl border hover:scale-105 border-gray-200 p-3 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl ${selectedPlanId === plan._id ? "ring-2 ring-gradient-to-r from-blue-400 to-blue-600" : ""
                  }`}
              >
                {isCurrentPlan && (
                  <span className="absolute top-5 right-5 bg-gradient-to-r border from-blue-400 to-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Current Plan
                  </span>
                )}
                {selectedPlanId === plan._id && !userSub && isLoggedin && (
                  <IoMdCheckmarkCircleOutline className="absolute top-6 right-6 text-3xl text-white" />
                )}

                <div>
                  <h2 className="w-full text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-blue-600 inline-block px-10 py-6 rounded-md mb-4">
                    {plan.name}
                  </h2>

                  <div className="px-7">
                    <div className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-4">
                      ${plan.price}
                      <span className="text-base font-normal text-gray-500 ml-1">
                        / {plan.durationDays} days
                      </span>
                    </div>

                    <ul className="text-gray-600 space-y-2 mb-6">
                      {plan.features?.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-500 mr-2">✔</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-[20%]">
          <button onClick={handlePurchase} className={`w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-300 ${userSub || !isLoggedin || !selectedPlanId ? "cursor-no-drop from-gray-500 to-gray-500 hover:from-gray-500 hover:to-gray-500" : ""}`}>
            <span className="flex items-center justify-center gap-3">Continue to Checkout <FaArrowRightLong /></span>
          </button>
        </div>

        {!loading && plans.length === 0 && (
          <p className="text-gray-500 text-center mt-8">No plans available at the moment.</p>
        )}
      </div>
    </>
  );
};

export default Plans;
