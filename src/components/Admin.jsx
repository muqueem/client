import React, { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import { Users, Calendar, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { getAllSubscriptions } from "../api/auth";
import { getDecryptedData } from "../utils/encryption";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const token = getDecryptedData("token");
  const user = getDecryptedData("user") || "null";
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    if (!token || !user?.isAdmin) {
      toast.error("Access denied");
      return;
    }

    const fetchSubscriptions = async () => {
      try {
        setLoading(true);
        const data = await getAllSubscriptions(token);
        setSubscriptions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        toast.error(error?.message || "Failed to load subscriptions");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  console.log(subscriptions);

  if (!token || !user?.isAdmin) return navigate("/");

  // Stats
  const stats = useMemo(() => {
    const total = subscriptions.length;
    const active = subscriptions.filter(sub => sub.isActive).length;
    const expired = subscriptions.filter(sub => !sub.isActive).length;
    const revenue = subscriptions.reduce(
      (sum, sub) => sum + (sub.productId?.plans?.[0]?.price || 0),
      0
    );
    return { total, active, expired, revenue };
  }, [subscriptions]);

  const filteredSubscriptions = useMemo(() => {
    if (activeFilter === "all") return subscriptions;
    if (activeFilter === "active") return subscriptions.filter(sub => sub.isActive);
    if (activeFilter === "expired") return subscriptions.filter(sub => !sub.isActive);
    return subscriptions;
  }, [subscriptions, activeFilter]);

  return (
    <div className="min-h-screen pb-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Stats - Responsive Grid */}
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 lg:mb-10">
          <StatCard title="Total Users" value={stats.total} icon={<Users />} />
          <StatCard title="Active" value={stats.active} icon={<TrendingUp />} highlight="emerald" />
          <StatCard title="Expired" value={stats.expired} icon={<AlertCircle />} highlight="red" />
          <StatCard 
            title="Revenue" 
            value={`$${stats.revenue.toLocaleString()}`} 
            icon={<DollarSign />} 
            highlight="purple" 
            className="col-span-2 lg:col-span-1"
          />
        </div>

        {/* Filters - Mobile Optimized */}
        <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8">
          {["all", "active", "expired"].map((filter) => {
            const count =
              filter === "all"
                ? subscriptions.length
                : filter === "active"
                ? subscriptions.filter(sub => sub.isActive).length
                : subscriptions.filter(sub => !sub.isActive).length;

            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 capitalize whitespace-nowrap ${
                  activeFilter === filter
                    ? "bg-gray-900 text-white shadow-lg scale-105"
                    : "bg-white/70 text-gray-700 hover:bg-white/90 hover:shadow-md"
                }`}
              >
                {filter} {filter !== "all" && <span className="hidden sm:inline">({count})</span>}
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <p className="text-lg sm:text-xl text-gray-600 font-medium">Loading subscriptions...</p>
          </div>
        ) : filteredSubscriptions.length === 0 ? (
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl sm:text-2xl text-gray-500 font-medium">No subscriptions found</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View (hidden on mobile) */}
            <div className="hidden lg:block bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Calendar className="w-7 h-7" />
                  Subscription Overview ({filteredSubscriptions.length})
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50/80">
                    <tr>
                      <th className="py-4 px-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">User</th>
                      <th className="py-4 px-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Product</th>
                      <th className="py-4 px-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Plan</th>
                      <th className="py-4 px-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Price</th>
                      <th className="py-4 px-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Support</th>
                      <th className="py-4 px-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredSubscriptions.map((sub, index) => (
                      <tr key={sub._id} className="hover:bg-blue-50/50 transition-all duration-200">
                        {/* User */}
                        <td className="py-6 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                              {sub.userId?.name?.charAt(0) || "U"}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900 text-lg truncate">{sub.userId?.name}</p>
                              <p className="text-gray-500 text-sm truncate">{sub.userId?.email}</p>
                            </div>
                          </div>
                        </td>

                        {/* Product */}
                        <td className="py-6 px-6">{sub.productId?.name}</td>

                        {/* Plan */}
                        <td className="py-6 px-6">{sub.planName}</td>

                        {/* Price */}
                        <td className="py-6 px-6">
                          <span className="text-xl font-bold text-green-600">
                            ${sub.productId?.plans?.[0]?.price?.toLocaleString() || "N/A"}
                          </span>
                        </td>

                        {/* Duration */}
                        <td className="py-6 px-6">
                          <div className="text-sm text-gray-600">
                            <p className="font-medium">
                              {new Date(sub.purchaseDate).toLocaleDateString("en-IN", {
                                day: "numeric", month: "short", year: "numeric"
                              })}
                            </p>
                            <p className="text-xs text-gray-400">to</p>
                            <p className="font-medium">
                              {new Date(sub.supportEndDate).toLocaleDateString("en-IN", {
                                day: "numeric", month: "short", year: "numeric"
                              })}
                            </p>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-6 px-6">
                          <span
                            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                              sub.isActive
                                ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
                                : "bg-gradient-to-r from-red-400 to-red-600"
                            } text-white shadow-lg`}
                          >
                            {sub.isActive ? "✓ Active" : "✕ Expired"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden space-y-4">
              <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 px-4 sm:px-6 py-4 sm:py-5 rounded-2xl shadow-xl">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                  Subscriptions ({filteredSubscriptions.length})
                </h2>
              </div>

              {filteredSubscriptions.map((sub, index) => (
                <div
                  key={sub._id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 overflow-hidden"
                >
                  {/* User Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-4 sm:px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0">
                        {sub.userId?.name?.charAt(0) || "U"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-gray-900 text-base sm:text-lg truncate">{sub.userId?.name}</p>
                        <p className="text-gray-500 text-xs sm:text-sm truncate">{sub.userId?.email}</p>
                      </div>
                      <span
                        className={`flex-shrink-0 inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${
                          sub.isActive
                            ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
                            : "bg-gradient-to-r from-red-400 to-red-600"
                        } text-white shadow-lg`}
                      >
                        {sub.isActive ? "✓" : "✕"}
                      </span>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Product</p>
                        <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">{sub.productId?.name}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Plan</p>
                        <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">{sub.planName}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Price</p>
                        <p className="text-lg sm:text-xl font-bold text-green-600">
                          ${sub.productId?.plans?.[0]?.price?.toLocaleString() || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Status</p>
                        <p className={`text-sm sm:text-base font-bold ${sub.isActive ? "text-emerald-600" : "text-red-600"}`}>
                          {sub.isActive ? "Active" : "Expired"}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 sm:pt-4 border-t border-gray-200">
                      <p className="text-xs sm:text-sm text-gray-500 font-medium mb-2">Support Period</p>
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div>
                          <p className="text-gray-400 text-xs">From</p>
                          <p className="font-semibold text-gray-700">
                            {new Date(sub.purchaseDate).toLocaleDateString("en-IN", {
                              day: "numeric", month: "short", year: "numeric"
                            })}
                          </p>
                        </div>
                        <div className="text-gray-300">→</div>
                        <div className="text-right">
                          <p className="text-gray-400 text-xs">To</p>
                          <p className="font-semibold text-gray-700">
                            {new Date(sub.supportEndDate).toLocaleDateString("en-IN", {
                              day: "numeric", month: "short", year: "numeric"
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, highlight, className = "" }) => {
  const bg = {
    default: "bg-gradient-to-br from-blue-400 to-blue-600",
    emerald: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    red: "bg-gradient-to-br from-red-400 to-red-600",
    purple: "bg-gradient-to-br from-purple-400 to-purple-600",
  }[highlight || "default"];

  return (
    <div className={`bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wider truncate">{title}</p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1 sm:mt-2 truncate">{value}</p>
        </div>
        <div className={`${bg} p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0 ml-2`}>
          {React.cloneElement(icon, { className: "w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" })}
        </div>
      </div>
    </div>
  );
};

export default Admin;