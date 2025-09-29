// import React, { useState, useEffect } from "react";
// import { getPlans, getUserSubscription, verifyUser } from "../api/auth";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { getDecryptedData } from "../utils/encryption";
// 
// const productNames = {
//   dualforceengineea: "Dual Force Engine EA",
//   flashedgescalperxea: "FlashEdge Scalper X EA",
//   quantumatrgridea: "Quantum ATR Grid EA",
//   quantumfvgexecuteorea: "Quantum FVG Executor EA",
//   sessionsniperxea: "Session Sniper X EA",
// };
// 
// const Plans = () => {
//   const token = getDecryptedData("token");
//   const navigate = useNavigate();
// 
//   const [selectedPlanId, setSelectedPlanId] = useState(null);
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [userSub, setUserSub] = useState(null);
//   const [isLoggedin, setIsLoggedin] = useState(false);
//   const [planType, setPlanType] = useState("Monthly");
// 
//   useEffect(() => {
//     const loadData = async () => {
//       const res = await getPlans();
//       setPlans(res);
// 
//       if (!token) return;
//       try {
//         setLoading(true);
//         const [subscriptionData, loggedIn] = await Promise.all([
//           token ? getUserSubscription(token) : null,
//           token ? verifyUser(token) : null,
//         ]);
//         setUserSub(subscriptionData);
//         setIsLoggedin(loggedIn);
// 
//         // Default tab based on subscription
//         if (subscriptionData?.planId?.name) {
//           const planName = subscriptionData.planId.name.toLowerCase();
//           if (planName.includes("annual")) setPlanType("Annual");
//           else if (planName.includes("quarterly")) setPlanType("Quarterly");
//           else setPlanType("Monthly");
//         }
//       } catch (error) {
//         console.error(error);
//         toast.error(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadData();
//   }, [token]);
// 
//   const handleSelectedPlanId = (planId) => {
//     setSelectedPlanId(planId === selectedPlanId ? null : planId);
//   };
// 
//   const handlePurchase = async () => {
//     if (!isLoggedin) return toast.error("Please login to purchase any Plan");
//     if (userSub) return toast.error("You already have an active subscription.");
//     if (!selectedPlanId) return toast.error("Please select a plan to purchase");
// 
//     try {
//       navigate(`/checkout/${selectedPlanId}`);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
// 
//   const filteredPlans = plans.filter((p) =>
//     planType === "Monthly"
//       ? p.name.toLowerCase().includes("monthly")
//       : planType === "Quarterly"
//         ? p.name.toLowerCase().includes("quarterly")
//         : p.name.toLowerCase().includes("annual")
//   );
// 
//   return (
//     <>
//       {loading && (
//         <div className="absolute inset-0 flex items-center justify-center z-50 transition-opacity duration-500">
//           <span className="loader"></span>
//         </div>
//       )}
// 
//       <section className="w-full bg-[#0083cf] text-white py-10">
//         <div className="text-center max-w-3xl mx-auto">
//           <h1 className="text-3xl md:text-5xl font-bold mb-6">
//             Subscription Plans
//           </h1>
//           <p className="text-lg md:text-xl text-blue-100">
//             Choose the plan that’s right for you. Flexible, affordable and
//             tailored to your trading needs.
//           </p>
//         </div>
//       </section>
// 
//       <div className="container relative flex flex-col justify-center items-center text-black">
// 
//         <div className="flex gap-4 my-8">
//           {["Monthly", "Quarterly", "Annual"].map((type) => (
//             <button
//               key={type}
//               onClick={() => setPlanType(type)}
//               className={`px-6 py-2 rounded-lg font-semibold transition ${planType === type
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                 }`}
//             >
//               {type}
//             </button>
//           ))}
//         </div>
// 
//         {/* Plans Grid */}
//         <div className="max-w-7xl w-full py-6">
//           <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredPlans.map((plan) => {
//               const isCurrentPlan =
//                 userSub && userSub.planId?._id === plan._id;
// 
//               return (
//                 <div
//                   onClick={() => handleSelectedPlanId(plan._id)}
//                   key={plan._id}
//                   className={`relative bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer ${selectedPlanId === plan._id ? "ring-2 ring-blue-500" : ""
//                     }`}
//                 >
//                   {/* Current Plan Badge */}
//                   {isCurrentPlan && (
//                     <span className="absolute top-5 right-5 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
//                       Current Plan
//                     </span>
//                   )}
// 
//                   {/* Selected Badge */}
//                   {selectedPlanId === plan._id &&
//                     !userSub &&
//                     isLoggedin && (
//                       <IoMdCheckmarkCircleOutline className="absolute top-6 right-6 text-3xl text-blue-500" />
//                     )}
// 
//                   {/* Product Name */}
//                   <p className="text-sm font-semibold text-gray-500 mb-2">
//                     {productNames[plan.productSlug] || plan.productSlug}
//                   </p>
// 
//                   {/* Plan Title */}
//                   <h3 className="text-xl font-bold text-white bg-gradient-to-r from-blue-400 to-blue-600 inline-block px-6 py-3 rounded-lg mb-4">
//                     {plan.name}
//                   </h3>
// 
//                   {/* Price */}
//                   <div className="px-1">
//                     <div className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-3">
//                       ${plan.price}
//                       <span className="text-base font-normal text-gray-500 ml-1">
//                         / {plan.durationDays} days
//                       </span>
//                     </div>
// 
//                     {/* Features */}
//                     <ul className="text-gray-700 space-y-2 mb-4">
//                       {plan.features?.map((feature, i) => (
//                         <li key={i} className="flex items-start">
//                           <span className="text-green-500 mr-2">✔</span>{" "}
//                           {feature}
//                         </li>
//                       ))}
//                     </ul>
// 
//                     {/* Metadata */}
//                     <p className="text-xs text-gray-400">
//                       Added: {new Date(plan.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
// 
//         {/* Checkout Button */}
//         {filteredPlans.length > 0 && <div className="w-[90%] md:w-[30%] lg:w-[20%] pb-12">
//           <button
//             onClick={handlePurchase}
//             className={`w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-300 ${userSub || !isLoggedin || !selectedPlanId
//                 ? "cursor-not-allowed from-gray-400 to-gray-400 hover:from-gray-400 hover:to-gray-400"
//                 : ""
//               }`}
//           >
//             <span className="flex items-center justify-center gap-3">
//               Continue to Checkout <FaArrowRightLong />
//             </span>
//           </button>
//         </div>}
// 
//         {!loading && filteredPlans.length === 0 && (
//           <p className="text-gray-500 text-center mt-8">
//             No {planType} plans available at the moment.
//           </p>
//         )}
//       </div>
//     </>
//   );
// };
// 
// export default Plans;
