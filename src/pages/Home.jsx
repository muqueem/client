import React from "react";
import { Shield, Lightbulb, Award, Zap, Users, BarChart3 } from "lucide-react";
import CapitalAllocationCalculator from "../components/CapitalAllocationCalculator";
import FooterCTA from "../components/FooterCTA";

const Home = () => {
  const coreValues = [
    {
      icon: Shield,
      title: "Integrity",
      description: "Acting with transparency and honesty in every decision.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Continuously pushing boundaries with cutting-edge strategies and technologies.",
    },
    {
      icon: Award,
      title: "Accountability",
      description: "Taking ownership of results and delivering with consistency.",
    },
    {
      icon: Zap,
      title: "Resilience",
      description: "Adapting and thriving in ever-changing market conditions.",
    },
  ];

  return (
    <div className="bg-white text-black antialiased">
      {/* Hero Section */}
      <section className="py-20 md:py-32 flex flex-col items-center justify-center text-center">
        <img
          src="/logo.png"
          alt="Quantum Rise Capital Logo"
          className="w-44 md:w-60 mb-6"
        />
        <h1 className="heading text-3xl md:text-6xl font-bold mb-4">
          Quantum Rise Capital
        </h1>
        <p className="text-lg md:text-2xl italic text-gray-700 max-w-lg">
          "Where Data Meets Opportunity"
        </p>
      </section>

      {/* Vision & Mission */}
      <section className="container mx-auto px-4 py-20 grid gap-10 md:grid-cols-2">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
          <h2 className="heading text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            We envision becoming a global leader in algorithmic trading—where technology, precision, and strategy converge to unlock new opportunities. Our goal is to redefine what is possible in modern finance, setting new standards of performance and reliability for traders worldwide.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
          <h2 className="heading text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At Quantum Rise Capital, our mission is to harness the power of data, innovation, and disciplined risk management to create trading solutions that consistently deliver sustainable growth. We aim to empower investors with intelligent systems that balance opportunity with protection.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision we make
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {coreValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <div key={i} className="bg-white rounded-2xl shadow p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="p-4 bg-yellow-500 rounded-xl mb-4 inline-flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-white rounded-3xl p-5 md:p-10 shadow-lg border border-gray-200 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-yellow-500 rounded-2xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="heading text-3xl font-bold">Our Culture</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            Our culture is built on curiosity, continuous improvement, and bold forward-thinking. We thrive on transforming complex market challenges into elegant solutions and foster a collaborative environment where excellence is not just expected—it's ingrained. At Quantum Rise Capital, we don't just adapt to the future of trading, we help create it.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading text-3xl md:text-4xl font-bold text-black mb-4">
              Why Choose Quantum Rise Capital
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We build trading systems focused on precision, risk control, and long-term sustainability — not just hype or noise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Point 1 */}
            <div className="text-center p-6 rounded-xl hover:shadow-2xl shadow-lg transition-shadow duration-300 bg-white">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-blue-100">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Data-Driven Precision</h3>
              <p className="text-gray-600 text-sm">
                Every strategy is statistically validated, historically tested, and adaptable to live market conditions.
              </p>
            </div>

            {/* Point 2 */}
            <div className="text-center p-6 rounded-xl hover:shadow-2xl shadow-lg transition-shadow duration-300 bg-white">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-green-100">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Risk First, Profit Next</h3>
              <p className="text-gray-600 text-sm">
                Strict drawdown limits and adaptive risk controls are built in to prioritize longevity before luck.
              </p>
            </div>

            {/* Point 3 */}
            <div className="text-center p-6 rounded-xl hover:shadow-2xl shadow-lg transition-shadow duration-300 bg-white">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-purple-100">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Prop-Firm Ready Solutions</h3>
              <p className="text-gray-600 text-sm">
                Our bots are engineered to meet strict prop firm rules while keeping execution and performance strong.
              </p>
            </div>

            {/* Point 4 */}
            <div className="text-center p-6 rounded-xl hover:shadow-2xl shadow-lg transition-shadow duration-300 bg-white">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-yellow-100">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Intelligent Capital Allocation</h3>
              <p className="text-gray-600 text-sm">
                Balance risk and maximize return by diversifying across optimized strategies for evolving markets.
              </p>
            </div>

            {/* Point 5 */}
            <div className="text-center p-6 rounded-xl hover:shadow-2xl shadow-lg transition-shadow duration-300 bg-white">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-red-100">
                <Zap className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparency & Innovation</h3>
              <p className="text-gray-600 text-sm">
                We don’t hide behind flashy promises. Every EA is tested, monitored, and performance-tracked. We constantly innovate with AI-enhanced filters and advanced equity protection.
              </p>
            </div>

            {/* Point 6 */}
            <div className="text-center p-6 rounded-xl hover:shadow-2xl shadow-lg transition-shadow duration-300 bg-white">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-indigo-100">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">A Partner, Not Just a Provider</h3>
              <p className="text-gray-600 text-sm">
                When you work with Quantum Rise Capital, you’re not just buying a trading bot. You’re gaining a partner committed to your growth, resilience, and long-term success.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Capital Distribution Calculator */}
      <section className="md:container mx-auto px-4 py-20">
        <div className="text-center md:mb-12">
          <h2 className="text-3xl font-bold mb-4 text-yellow-600">Capital Distribution Calculator</h2>
          <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Based on our products’ performance, we recommend using this calculator if you’re thinking about an active investing portfolio. The main benefit of using the calculator is to distribute your money in the most optimized way possible — giving you maximum potential returns.
          </p>
        </div>
        <CapitalAllocationCalculator />
      </section>
      
      <FooterCTA />
    </div>
  );
};

export default Home;
