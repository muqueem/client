import React, { useState } from "react";
import { Check, Star, ArrowLeft, Play, Download, TrendingUp, Shield, Award } from "lucide-react";
import { useParams } from "react-router-dom";
import { useContextElement } from "../../context/Context";
import PlanCard from "../components/PlanCard";

export default function ProductPage() {
  const { products } = useContextElement();
  const [selectedImage, setSelectedImage] = useState(0);
  const { slug } = useParams();

  // Find product by slug or use default
  const product = products.find(p => p.slug === slug);
  console.log("products", products);
  console.log("product", product);

  if (!product) {
    return (
      <div className="h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="relative overflow-hidden rounded-2xl mb-6 group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-contain bg-gradient-to-br from-blue-50 to-purple-50 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors">
                  <Play className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-3">{product.name}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1">4.9 • Quantum Rise Capital</span>
                    </div>
                  </div>
                </div>
                {/* <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Download
                </button> */}
              </div>

              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Key Features</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <div className="bg-white p-1 rounded-full">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Backtesting */}
            {product.backtesting && (
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Performance Results</h2>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.backtesting}</p>
              </div>
            )}

            {/* Items Included (for bundles/combo) */}
            {product.itemsIncluded && product.itemsIncluded.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <Star className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Included Products</h2>
                </div>

                <ul className="space-y-4">
                  {product.itemsIncluded.map((slug, i) => {
                    // find full product details from global products list
                    const includedProduct = products.find(p => p.slug === slug);
                    return (
                      <li
                        key={i}
                        className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 hover:shadow-lg transition"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={includedProduct?.image}
                            alt={includedProduct?.name}
                            className="w-12 h-12 object-contain rounded-lg bg-white"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{includedProduct?.name}</p>
                            <p className="text-sm text-gray-500">{includedProduct?.plans?.[0]?.price ? `$${includedProduct.plans[0].price}` : ""}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => window.location.href = `/products/${includedProduct?.slug}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                        >
                          View →
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Gallery */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Backtesting Results</h2>
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={product.gallery[selectedImage]}
                      alt={`${product.name} Backtest ${selectedImage + 1}`}
                      className="w-full h-80 object-contain bg-white rounded-lg"
                    />
                  </div>
                  <div className="flex gap-4 overflow-x-auto p-2">
                    {product.gallery.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`flex-shrink-0 relative overflow-hidden rounded-lg transition-all duration-200 ${selectedImage === i ? 'ring-4 ring-blue-400 scale-105' : 'hover:scale-105'
                          }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${i + 1}`}
                          className="w-20 h-20 object-contain bg-white rounded"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Legal */}
            {product.legal && (
              <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <Shield className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-amber-900">Important Notice</h2>
                </div>
                <p className="text-amber-800 leading-relaxed whitespace-pre-line">{product.legal}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Choose Your Plan
                </h2>
                <div className="space-y-4">
                  {product.plans.map((plan, idx) => (
                    <PlanCard
                      key={idx}
                      plan={plan}
                      productId={product._id}
                    />
                  ))}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-white rounded-3xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Why Choose Us?</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Secure & Reliable</p>
                      <p className="text-sm text-gray-600">Bank-level security</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Award className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Award Winning</p>
                      <p className="text-sm text-gray-600">Industry recognition</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Proven Results</p>
                      <p className="text-sm text-gray-600">Consistent performance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}