import React, { useState, useEffect } from "react";
import { Shield, Zap, BarChart3, Award } from 'lucide-react';
import { Link } from "react-router-dom";
import { getDecryptedData } from "../utils/encryption";
import { getUserSubscription } from "../api/auth";
import FooterCTA from "../components/FooterCTA";

const Home = () => {
    const token = getDecryptedData("token");
    const [userSub, setUserSub] = useState(null);
    useEffect(() => {
        const fetchSub = async () => {
            if (!token) return;
            const data = await getUserSubscription(token);
            setUserSub(data);
        }

        fetchSub();
    }, [])
    
    const tickers = [
        { symbol: "AAPL", price: 174.23, change: 1.25 },
        { symbol: "TSLA", price: 675.12, change: -2.34 },
        { symbol: "BTC", price: 61234.5, change: 0.83 },
        { symbol: "ETH", price: 4200.12, change: -1.02 },
    ];

    // --- Carousel state ---
    const slides = [
        {
            title: "Fast execution. Real results.",
            subtitle: "Access low-latency trading and direct market access — built for pros and beginners.",
            cta: "Get started",
            image: "/images/carousel-1.jpg",
            alt: "Abstract trading chart overlay on city skyline"
        },
        {
            title: "Advanced analytics at your fingertips",
            subtitle: "Powerful charts, indicators and real-time feeds to help you make better decisions.",
            cta: "Explore tools",
            image: "/images/carousel-2.jpg",
            alt: "Close-up laptop screen showing candlestick charts"
        },
        {
            title: "Secure. Compliant. Reliable.",
            subtitle: "Bank-level security and continuous monitoring so your assets stay protected.",
            cta: "Learn more",
            image: "/images/carousel-3.jpg",
            alt: "Futuristic abstract finance network with shield icon"
        },
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setCurrent((c) => (c + 1) % slides.length);
        }, 8000);
        return () => clearInterval(id);
    }, [current]);

    function prev() {
        setCurrent((c) => (c - 1 + slides.length) % slides.length);
    }

    function next() {
        setCurrent((c) => (c + 1) % slides.length);
    }

    return (
        <div className="text-slate-900 antialiased">
            <section className="pb-6">
                <div className="relative overflow-hidden h-[60vh] lg:h-[90vh]">
                    {slides.map((s, i) => (
                        <div
                            key={i}
                            className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                            aria-hidden={i === current ? "false" : "true"}
                        >
                            <div className="w-full h-full">
                                <img
                                    src={s.image}
                                    alt={s.alt}
                                    className="w-full h-full object-cover brightness-75"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 flex items-center">
                                    <div className="container mx-auto px-4">
                                        <div className="max-w-2xl text-white">
                                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold drop-shadow-md">{s.title}</h2>
                                            <p className="mt-2 text-sm sm:text-base text-gray-200 drop-shadow-sm">{s.subtitle}</p>
                                            <div className="mt-4">
                                                <a href="/signup" className="inline-flex items-center px-4 py-2 bg-gray-900 hover:bg-[#0083cf] transition-all duration-300 text-white rounded-lg shadow">
                                                    {s.cta}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={prev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 z-20"
                        aria-label="Previous slide"
                    >
                        ‹
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 z-20"
                        aria-label="Next slide"
                    >
                        ›
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`w-3 h-3 rounded-full ${i === current ? 'bg-white' : 'bg-white/40'}`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="container py-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="">
                    <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">Trade smarter. Move faster. Own your strategy.</h1>
                    <p className="mt-4 text-lg text-slate-600">Real-time market data, powerful charts, and simple pricing — built for active traders and beginners alike.</p>

                    <div className="mt-6 flex gap-3 flex-wrap">
                        <a href="/signup" className="inline-flex items-center px-5 py-3 bg-gray-900 hover:bg-[#0083cf] transition-all duration-300 text-white rounded-lg shadow">Create account</a>
                        <a href="/learn" className="inline-flex items-center px-5 py-3 border border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 rounded-lg">Learn more</a>
                    </div>

                    <div className="mt-8 bg-white rounded-lg shadow-sm p-4">
                        <h3 className="text-sm text-slate-500">Live market tickers</h3>
                        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {tickers.map((t) => (
                                <div key={t.symbol} className="p-3 rounded-md border border-slate-100 bg-gradient-to-br from-white to-slate-50">
                                    <div className="flex items-baseline justify-between">
                                        <div className="text-sm font-medium">{t.symbol}</div>
                                        <div className={`text-sm font-semibold ${t.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{t.change >= 0 ? '+' : ''}{t.change}%</div>
                                    </div>
                                    <div className="mt-1 text-xl font-bold">${t.price.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="h-72 sm:h-96 w-full rounded-lg bg-gradient-to-br from-slate-100 to-white border border-slate-200 flex items-center justify-center">
                        <div className="text-slate-400 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-3" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                            </svg>
                            <div className="font-medium">Realtime chart</div>
                            <div className="text-sm">Integrate your chart library (TradingView, Recharts, or Highcharts)</div>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="p-3 bg-white rounded-lg border">
                            <div className="text-xs text-slate-500">Portfolio</div>
                            <div className="font-semibold text-lg">$12,450</div>
                        </div>
                        <div className="p-3 bg-white rounded-lg border">
                            <div className="text-xs text-slate-500">24h P/L</div>
                            <div className="font-semibold text-lg text-emerald-600">+$420</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-900">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-50 mb-4">
                            Why Choose Quantum?
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Our platform combines cutting-edge technology with user-friendly design to deliver
                            the ultimate trading experience.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 rounded-xl border border-gray-600 hover:shadow-2xl shadow-lg transition-shadow duration-300">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
                            <p className="text-gray-300">
                                Execute trades in milliseconds with our high-performance infrastructure
                                and direct market access.
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-xl border border-gray-600 hover:shadow-2xl shadow-lg transition-shadow duration-300">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Bank-Level Security</h3>
                            <p className="text-gray-300">
                                Your funds and data are protected with industry-leading encryption
                                and multi-factor authentication.
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-xl border border-gray-600 hover:shadow-2xl shadow-lg transition-shadow duration-300">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BarChart3 className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics</h3>
                            <p className="text-gray-300">
                                Make informed decisions with our comprehensive charting tools
                                and market analysis features.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-blue-400 mb-2">$50B+</div>
                            <div className="text-gray-900">Daily Volume</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-green-400 mb-2">500K+</div>
                            <div className="text-gray-900">Active Traders</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-purple-400 mb-2">99.9%</div>
                            <div className="text-gray-900">Uptime</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
                            <div className="text-gray-900">Support</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-900">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-50 mb-6">
                                Professional Trading Tools
                            </h2>
                            <p className="text-lg text-gray-300 mb-8">
                                Access the same powerful tools used by institutional traders. From advanced
                                charting to algorithmic trading, we provide everything you need to succeed
                                in today's markets.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                                        <BarChart3 className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <span className="text-gray-300">Real-time market data and charts</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                                        <Zap className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <span className="text-gray-300">One-click order execution</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                                        <Award className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <span className="text-gray-300">Risk management tools</span>
                                </li>
                            </ul>
                        </div>
                        <div className="rounded-3xl shadow-xl border border-gray-600">
                            <div className="rounded-lg p-6 text-white font-mono text-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-green-400">AAPL</span>
                                    <span className="text-green-400">+2.45%</span>
                                </div>
                                <div className="text-2xl font-bold mb-2">$178.92</div>
                                <div className="h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded opacity-30 mb-4"></div>
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>Volume: 45.2M</span>
                                    <span>High: $179.15</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Trusted by Traders Worldwide
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 border border-gray-300 p-6 rounded-xl">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                    JD
                                </div>
                                <div className="ml-3">
                                    <div className="font-semibold text-gray-900">John Doe</div>
                                    <div className="text-sm text-gray-600">Professional Trader</div>
                                </div>
                            </div>
                            <p className="text-gray-700">
                                "Quantum's platform has revolutionized my trading strategy. The analytics
                                are incredibly detailed and the execution speed is unmatched."
                            </p>
                        </div>

                        <div className="bg-gray-50 border border-gray-300 p-6 rounded-xl">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                                    SM
                                </div>
                                <div className="ml-3">
                                    <div className="font-semibold text-gray-900">Sarah Miller</div>
                                    <div className="text-sm text-gray-600">Fund Manager</div>
                                </div>
                            </div>
                            <p className="text-gray-700">
                                "As a fund manager, I need reliable tools and data. Quantum delivers
                                exactly that with their institutional-grade platform."
                            </p>
                        </div>

                        <div className="bg-gray-50 border border-gray-300 p-6 rounded-xl">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                    RK
                                </div>
                                <div className="ml-3">
                                    <div className="font-semibold text-gray-900">Robert Kim</div>
                                    <div className="text-sm text-gray-600">Day Trader</div>
                                </div>
                            </div>
                            <p className="text-gray-700">
                                "The user interface is intuitive and the customer support is outstanding.
                                Perfect for both beginners and experienced traders."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <FooterCTA />
        </div>
    );
}

export default Home;
