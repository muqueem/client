import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { getPlanById, purchaseSubscription } from "../api/auth";
import toast from "react-hot-toast";
import { getDecryptedData } from "../utils/encryption";
import ProtectedRoute from "../components/ProtectedRoute";

const Checkout = () => {
    const { planId } = useParams();
    const navigate = useNavigate();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                setLoading(true);
                const data = await getPlanById(planId);
                setPlan(data);
            } catch (err) {
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPlan();
    }, [planId]);

    const handlePayment = async () => {
        try {
            setLoading(true);
            const token = getDecryptedData("token");
            const res = await purchaseSubscription({ planId }, token);
            toast.success(res.message);
            navigate("/success");
        } catch (err) {
            toast.error(err.message);
            navigate("/cancel");
        } finally {
            setLoading(false);
        }
    };

    if (!plan) return <p className="text-center mt-20">Loading...</p>;

    return (
        <ProtectedRoute>
            <div className="flex flex-col items-center h-[60vh] justify-center px-6">
                <h1 className="text-3xl font-bold mb-4">Checkout</h1>
                <div className="w-[28%]">
                    <div
                        className={`relative bg-white rounded-2xl shadow-xl border border-gray-200 p-3 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl"`} >
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

                                <ul className="text-gray-600 space-y-2">
                                    {plan.features?.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="text-green-500 mr-2">✔</span> {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button
                                onClick={handlePayment}
                                disabled={loading}
                                className="w-full mt-5 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
                            >
                                {loading ? "Processing..." : "Pay Now"}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </ProtectedRoute>
    );
};

export default Checkout;
