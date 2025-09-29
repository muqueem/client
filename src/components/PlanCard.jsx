import { Check, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getDecryptedData } from "../utils/encryption";
import { purchaseSubscription, verifyUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function PlanCard({ plan, productId, isPopular = true }) {
    const token = getDecryptedData("token");
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [isLoggedin, setIsLoggedin] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            if (!token) { setIsLoggedin(false); return };
            try {
                await verifyUser(token);
                setIsLoggedin(true);
            } catch (error) {
                console.error(error);
                setIsLoggedin(false);
            }
        }

        checkAuth();
    }, [token]);

    const handlePurchase = async () => {
        if (!isLoggedin) return toast.error("Please login to purchase any Plan");
        try {
            const res = await purchaseSubscription(
                { productId, planName: plan.name },
                token
            )
            toast.success(res.message);
            navigate(`/success/${res.successToken}`);
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div
            className={`relative p-6 rounded-2xl transition-all duration-300 cursor-pointer transform ${isHovered ? 'scale-105 shadow-2xl' : 'shadow-lg'
                } ${isPopular
                    ? 'bg-gradient-to-br from-blue-600 to-purple-700 text-white border-2 border-blue-400'
                    : 'bg-white border border-gray-200 hover:border-blue-300'
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        Most Popular
                    </span>
                </div>
            )}

            <div className="text-center">
                <h3 className={`text-xl font-bold mb-2 ${isPopular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                </h3>
                <div className="mb-4">
                    <span className={`text-4xl font-bold ${isPopular ? 'text-white' : 'text-gray-900'}`}>
                        {plan.currency}{plan.price}
                    </span>
                    <span className={`text-sm ${isPopular ? 'text-blue-100' : 'text-gray-500'}`}>
                        /{plan.duration.replace('per ', '')}
                    </span>
                </div>
            </div>

            <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                    <li key={i} className={`flex items-start gap-3 ${isPopular ? 'text-blue-50' : 'text-gray-700'}`}>
                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isPopular ? 'text-green-300' : 'text-green-500'}`} />
                        <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                ))}
            </ul>

            <button onClick={handlePurchase} className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${isPopular
                ? 'bg-white text-blue-600 hover:bg-blue-50 shadow-lg'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg'
                }`}>
                Buy Now
            </button>
        </div>
    );
}