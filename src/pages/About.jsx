import React, { useEffect, useState } from 'react';
import { TrendingUp, Target, Eye, Heart, Award, Users, Globe, Shield } from 'lucide-react';
import { getDecryptedData } from '../utils/encryption';
import { getUserSubscription } from '../api/auth';
import { Link } from 'react-router-dom';

const About = () => {
    const token = getDecryptedData("token");
    const [userSub, setUserSub] = useState(null);
    useEffect(() => {
        const fetchSub = async () => {
            const data = await getUserSubscription(token)
            setUserSub(data);
        }

        fetchSub();
    }, [])

    return (
        <div className="">
            <section className="bg-[#0083cf] text-white py-5">
                <div className="container text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">
                        About Us
                    </h1>
                    <p className="text-xl text-blue-100">
                        Revolutionizing financial markets through innovative technology and unwavering commitment to our traders' success.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Founded in 2018 by a team of former Wall Street professionals and tech innovators,
                                Quantum was born from a simple observation: trading technology was either too
                                complex for beginners or too limited for professionals.
                            </p>
                            <p className="text-lg text-gray-600 mb-6">
                                We set out to bridge this gap by creating a platform that combines institutional-grade
                                functionality with an intuitive user experience. Today, we're proud to serve over
                                500,000 active traders across 40+ countries.
                            </p>
                            <p className="text-lg text-gray-600">
                                Our mission remains unchanged: to democratize access to professional trading tools
                                and empower every trader to achieve their financial goals.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">2018</div>
                                    <div className="text-gray-600">Founded</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">500K+</div>
                                    <div className="text-gray-600">Active Users</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">40+</div>
                                    <div className="text-gray-600">Countries</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">$50B+</div>
                                    <div className="text-gray-600">Daily Volume</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-900">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <Target className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                To democratize financial markets by providing cutting-edge trading technology
                                that's accessible to everyone, from individual retail traders to large
                                institutional investors.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <Eye className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                To become the world's most trusted trading platform, where transparency,
                                innovation, and user success drive everything we do, creating a more
                                equitable financial future for all.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            These principles guide every decision we make and every feature we build.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="h-10 w-10 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Security First</h3>
                            <p className="text-gray-600">
                                Your assets and data are protected with military-grade encryption and security protocols.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-10 w-10 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">User-Centric</h3>
                            <p className="text-gray-600">
                                Every feature is designed with our users in mind, prioritizing ease of use and functionality.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Globe className="h-10 w-10 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparency</h3>
                            <p className="text-gray-600">
                                Clear pricing, honest communication, and open about risks and opportunities in trading.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="h-10 w-10 text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
                            <p className="text-gray-600">
                                We strive for perfection in everything we do, from platform performance to customer service.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-900">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-50 mb-4">
                            Leadership Team
                        </h2>
                        <p className="text-xl text-gray-300">
                            Meet the experienced professionals driving Quantum's vision forward.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">Michael Chen</h3>
                                <p className="text-blue-600 font-medium mb-3">CEO & Co-Founder</p>
                                <p className="text-gray-600">
                                    Former Goldman Sachs VP with 15+ years in algorithmic trading and fintech innovation.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-64 bg-gradient-to-br from-green-400 to-green-600"></div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">Sarah Rodriguez</h3>
                                <p className="text-green-600 font-medium mb-3">CTO & Co-Founder</p>
                                <p className="text-gray-600">
                                    Ex-Google engineer specializing in high-frequency systems and real-time data processing.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-64 bg-gradient-to-br from-purple-400 to-purple-600"></div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-1">David Kim</h3>
                                <p className="text-purple-600 font-medium mb-3">Head of Product</p>
                                <p className="text-gray-600">
                                    Product veteran from Bloomberg Terminal with expertise in trader workflow optimization.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Journey
                        </h2>
                        <p className="text-xl text-gray-600">
                            Key milestones that shaped Quantum into the platform it is today.
                        </p>
                    </div>

                    <div className="space-y-8 grid lg:grid-cols-2 gap-10">
                        <div className="flex items-start">
                            <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mr-6 flex-shrink-0">
                                2018
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Company Founded</h3>
                                <p className="text-gray-600">
                                    Quantum was established with $5M in seed funding to revolutionize retail trading technology.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mr-6 flex-shrink-0">
                                2019
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Platform Launch</h3>
                                <p className="text-gray-600">
                                    Beta platform launched with 10,000 early adopters and institutional-grade analytics tools.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mr-6 flex-shrink-0">
                                2021
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Expansion</h3>
                                <p className="text-gray-600">
                                    Expanded to 25+ countries and reached 100,000 active traders with Series A funding.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mr-6 flex-shrink-0">
                                2023
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile Innovation</h3>
                                <p className="text-gray-600">
                                    Launched award-winning mobile app with AI-powered trading insights and social trading features.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mr-6 flex-shrink-0">
                                2025
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Market Leader</h3>
                                <p className="text-gray-600">
                                    Achieved 500K+ active traders and $50B+ daily volume, establishing ourselves as an industry leader.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-900 text-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Recognition & Awards
                        </h2>
                        <p className="text-xl text-gray-300">
                            Industry recognition for our innovation and commitment to excellence.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center bg-gray-800 p-6 rounded-xl">
                            <Award className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                            <h3 className="font-semibold text-white mb-2">Best Trading Platform</h3>
                            <p className="text-gray-400 text-sm">FinTech Awards 2024</p>
                        </div>

                        <div className="text-center bg-gray-800 p-6 rounded-xl">
                            <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
                            <h3 className="font-semibold text-white mb-2">Security Excellence</h3>
                            <p className="text-gray-400 text-sm">CyberSec Recognition 2024</p>
                        </div>

                        <div className="text-center bg-gray-800 p-6 rounded-xl">
                            <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                            <h3 className="font-semibold text-white mb-2">User Experience</h3>
                            <p className="text-gray-400 text-sm">UX Design Awards 2023</p>
                        </div>

                        <div className="text-center bg-gray-800 p-6 rounded-xl">
                            <Globe className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                            <h3 className="font-semibold text-white mb-2">Global Innovation</h3>
                            <p className="text-gray-400 text-sm">Tech Innovation Summit 2023</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Culture
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We believe that great products come from great teams. Our culture emphasizes
                            collaboration, innovation, and continuous learning.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer Obsession</h3>
                            <p className="text-gray-600">
                                Every decision starts with asking "How does this benefit our traders?"
                                We're passionate about our users' success.
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <TrendingUp className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Continuous Innovation</h3>
                            <p className="text-gray-600">
                                We constantly push boundaries and challenge the status quo to deliver
                                cutting-edge trading solutions.
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Team Collaboration</h3>
                            <p className="text-gray-600">
                                We believe diverse perspectives and collaborative thinking lead to
                                better solutions for complex problems.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {!userSub?.isActive && (
                <section className="relative flex justify-center border border-whit mt-40 h-44 bg-gray-900">
                <div className="container absolute bottom-12 border border-gray-600 rounded-2xl text-center py-8 bg-gradient-to-r shadow-2xl from-gray-900 via-blue-900 to-gray-900">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Trade with Confidence?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Experience the platform trusted by hundreds of thousands of traders worldwide.
                    </p>
                    <button className="bg-gray-900 text-white font-semibold py-4 px-8 rounded-lg text-lg hover:bg-gray-50 hover:text-gray-900 transition-all duration-300">
                        <Link to={"/plans"}>See our plans</Link>
                    </button>
                </div>
                </section>
            )}
        </div>
    );
};

export default About;