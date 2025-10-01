import React from "react";
import { TrendingUp, Shield, DollarSign, Users } from "lucide-react";
import FooterCTA from "../components/FooterCTA";
import ProductCard from "../components/ProductCard";
import { useContextElement } from "../../context/Context";

export default function ProductsList() {
  const { products } = useContextElement();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Premium Trading <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Expert Advisors</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our collection of professional-grade EAs designed for serious traders.
              Each system is battle-tested with real backtesting results and optimized for consistent performance.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-white rounded-2xl shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">1,200+</p>
              <p className="text-sm text-gray-600">Active Traders</p>
            </div>
            <div className="text-center p-4 bg-white rounded-2xl shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">89.7%</p>
              <p className="text-sm text-gray-600">Win Rate</p>
            </div>
            <div className="text-center p-4 bg-white rounded-2xl shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">$2.4M+</p>
              <p className="text-sm text-gray-600">Profits Generated</p>
            </div>
            <div className="text-center p-4 bg-white rounded-2xl shadow-lg">
              <div className="flex items-center justify-center mb-2">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">24/7</p>
              <p className="text-sm text-gray-600">Support</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
            />
          ))}
        </div>
      </div>
      <FooterCTA />
    </div>
  );
}