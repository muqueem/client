import React, { useEffect, useState } from 'react'
import { getUserSubscription, renewSubscription } from '../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import { getDecryptedData } from '../utils/encryption';

const MySubscription = () => {
    const token = getDecryptedData("token");
    const navigate = useNavigate();

    const [userSub, setUserSub] = useState(null);
    const [plan, setPlan] = useState(null);
    const [showFeatures, setShowFeatures] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSub = async () => {
            if (!token) return;
            try {
                setLoading(true);
                const res = await getUserSubscription(token);
                setPlan(res.planId);
                setUserSub(res);
                console.log(res);
            } catch (error) {
                console.error(error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }

        fetchSub();
    }, [])

    const handleRenew = async () => {
        if (!token) return;
        debugger;
        try {
            setLoading(true);
            navigate(`/checkout/${plan._id}`);
        } catch (error) {
            console.error(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {userSub ? (<div className="flex h-[60vh] justify-center px-6">
                <div className="w-[35%]">
                    <div
                        className={`relative bg-white rounded-2xl shadow-xl border border-gray-200 p-3 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl ring-2 ring-gradient-to-r from-blue-400 to-blue-600 hover:scale-105`} >
                        <div>
                            <span className="absolute top-5 right-5 bg-gradient-to-r border from-blue-400 to-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                Current Plan
                            </span>
                            <h2 className="w-full text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-blue-600 inline-block px-10 py-6 rounded-md mb-4">
                                {plan?.name}
                            </h2>

                            <div className="px-7">
                                <div className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-4">
                                    ${plan?.price}
                                    <span className="text-base font-normal text-gray-500 ml-1">
                                        / {plan?.durationDays} days
                                    </span>
                                </div>

                                {showFeatures && (
                                    <ul className="text-gray-600 space-y-2 mb-6">
                                        {plan?.features?.map((feature, i) => (
                                            <li key={i} className="flex items-start">
                                                <span className="text-green-500 mr-2">✔</span> {feature}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <span onClick={() => setShowFeatures(prev => !prev)} className='cursor-pointer text-md hover:text-[#0083cf] underline'>
                                    {showFeatures ? "Hide Features" : "See Features..."}
                                </span>
                            </div>

                            <div className="flex mt-5 text-gray-600 justify-end">
                                <h3 className=''>Subscription Ends on:</h3>
                                <p className=''>{new Date(userSub?.endDate).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                })}</p>
                            </div>

                            <button
                                onClick={handleRenew}
                                disabled={loading}
                                className="w-full mt-2 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
                            >
                                {loading ? "Processing..." : "Renew"}
                            </button>
                        </div>
                    </div>
                </div>

            </div>) : (
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-3xl font-bold'>You haven't purchased a subscription yet</h1>
                    <button
                        className="w-1/6 mt-10 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                        <Link to="/plans">See plans</Link>
                    </button>
                </div>
            )
            }
        </>
    )
}

export default MySubscription