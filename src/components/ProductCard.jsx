import { ArrowRight, Shield, Star, TrendingUp } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    const [isHovered, setIsHovered] = useState(false);

    // Extract short description (first meaningful line)
    const shortDescription = product.description.split('\n').find(line =>
        line.length > 50 && !line.includes('v1.00') && !line.includes('EA')
    ) || product.description.split('\n')[0];

    return (
        <div
            className={`group relative bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 transform ${isHovered ? 'scale-105 shadow-2xl' : 'hover:scale-[1.02] hover:shadow-2xl'
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Gradient overlay for premium feel */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Popular badge for certain products */}
            {product.popular && (
                <div className="absolute top-4 right-4 z-20">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Popular
                    </span>
                </div>
            )}

            {/* Hero Image Section */}
            <div className="relative flex items-center justify-center overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="relative z-10 w-98 object-contain transition-transform duration-700 group-hover:scale-110"
                />
            </div>

            {/* Content Section */}
            <div className="p-6 relative z-10">
                {/* Header */}
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {shortDescription.slice(0, 120)}...
                    </p>
                </div>

                {/* Performance Stats */}
                {product.stats && (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-green-600" />
                                <div>
                                    <p className="text-xs text-green-600 font-medium">Profit</p>
                                    <p className="text-sm font-bold text-green-700">{product.stats.profit}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3 border border-blue-100">
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-blue-600" />
                                <div>
                                    <p className="text-xs text-blue-600 font-medium">Drawdown</p>
                                    <p className="text-sm font-bold text-blue-700">{product.stats.drawdown}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    <Link
                        to={`/products/${product.slug}`}
                        className="block w-full"
                    >
                        <button
                            className="w-full text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-gray-900 to-gray-800 -white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2">
                            View Details
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </Link>

                    <a
                        href={`/files/${product.slug}-demo.mq5`}  // or exact file name
                        download
                        className="block w-full"
                    >
                        <button
                            className="w-full text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-gray-900 to-gray-800 -white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2">
                            Demo
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </a>

                    <Link
                        to={`/products/${product.slug}`}
                        className="block w-full"
                    >
                        <button
                            className="w-full text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-gray-900 to-gray-800 -white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2">
                            Live Trading
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Hover Effects */}
            <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
                } pointer-events-none`} />
        </div>
    );
}