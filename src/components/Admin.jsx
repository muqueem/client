import React, { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import { Users, Calendar, DollarSign, TrendingUp, Shield, AlertCircle } from "lucide-react";
import { getAllSubscriptions } from "../api/auth";
import { getDecryptedData } from "../utils/encryption";

const Admin = () => {
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

  if (!token || !user?.isAdmin) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 font-semibold text-xl">
        Unauthorized Access
      </div>
    );
  }

  // Derived stats (memoized)
  const stats = useMemo(() => {
    const total = subscriptions.length;
    const active = subscriptions.filter(sub => sub.status === "active").length;
    const expired = subscriptions.filter(sub => sub.status === "expired").length;
    const revenue = subscriptions.reduce((sum, sub) => sum + (sub.planId?.price || 0), 0);
    return { total, active, expired, revenue };
  }, [subscriptions]);

  const filteredSubscriptions = useMemo(() => {
    return activeFilter === "all"
      ? subscriptions
      : subscriptions.filter(sub => sub.status === activeFilter);
  }, [subscriptions, activeFilter]);

  const getStatusConfig = (status) => {
    switch (status) {
      case "active":
        return { gradient: "bg-gradient-to-r from-emerald-400 to-emerald-600", icon: "✓" };
      case "expired":
        return { gradient: "bg-gradient-to-r from-red-400 to-red-600", icon: "✕" };
      case "cancelled":
        return { gradient: "bg-gradient-to-r from-gray-400 to-gray-600", icon: "⊘" };
      default:
        return { gradient: "bg-gradient-to-r from-blue-400 to-blue-600", icon: "?" };
    }
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Users" value={stats.total} icon={<Users />} />
          <StatCard title="Active" value={stats.active} icon={<TrendingUp className="w-8 h-8 text-white" />} highlight="emerald" />
          <StatCard title="Expired" value={stats.expired} icon={<AlertCircle className="w-8 h-8 text-white" />} highlight="red" />
          <StatCard title="Total Revenue" value={`$${stats.revenue.toLocaleString()}`} icon={<DollarSign />} highlight="purple" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          {["all", "active", "expired", "cancelled"].map((filter) => {
            const count = filter === "all" ? subscriptions.length : subscriptions.filter(sub => sub.status === filter).length;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 capitalize ${activeFilter === filter
                  ? "bg-gray-900 text-white shadow-lg transform scale-105"
                  : "bg-white/70 text-gray-700 hover:bg-white/90 hover:shadow-md"
                }`}
              >
                {filter} {filter !== "all" && `(${count})`}
              </button>
            );
          })}
        </div>

        {/* Main Table */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <p className="text-xl text-gray-600 font-medium">Loading subscriptions...</p>
          </div>
        ) : filteredSubscriptions.length === 0 ? (
          <div className="text-center py-20">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-2xl text-gray-500 font-medium">No subscriptions found</p>
            <p className="text-gray-400 mt-2">Try adjusting your filter settings</p>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
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
                    <th className="py-4 px-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Plan</th>
                    <th className="py-4 px-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Price</th>
                    <th className="py-4 px-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Duration</th>
                    <th className="py-4 px-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSubscriptions.map((sub, index) => {
                    const statusConfig = getStatusConfig(sub.status);
                    return (
                      <tr
                        key={sub._id}
                        className="hover:bg-blue-50/50 transition-all duration-200 group animate-fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <td className="py-6 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {sub.userId?.name?.charAt(0) || "U"}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-lg">{sub.userId?.name}</p>
                              <p className="text-gray-500 text-sm">{sub.userId?.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 px-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200">
                            {sub.planId?.name}
                          </span>
                        </td>
                        <td className="py-6 px-6">
                          <span className="text-xl font-bold text-green-600">${sub.planId?.price?.toLocaleString()}</span>
                        </td>
                        <td className="py-6 px-6">
                          <div className="text-sm text-gray-600">
                            <p className="font-medium">
                              {new Date(sub.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                            <p className="text-xs text-gray-400">to</p>
                            <p className="font-medium">
                              {new Date(sub.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                        </td>
                        <td className="py-6 px-6">
                          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${statusConfig.gradient} text-white shadow-lg hover:shadow-xl transition-shadow duration-200`}>
                            <span className="mr-2">{statusConfig.icon}</span>
                            {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

const StatCard = ({ title, value, icon, highlight }) => {
  const bg = {
    default: "bg-gradient-to-br from-blue-400 to-blue-600",
    emerald: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    red: "bg-gradient-to-br from-red-400 to-red-600",
    purple: "bg-gradient-to-br from-purple-400 to-purple-600",
  }[highlight || "default"];

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`${bg} p-3 rounded-xl`}>
          {React.cloneElement(icon, { className: "w-8 h-8 text-white" })}
        </div>
      </div>
    </div>
  );
};

export default Admin;
