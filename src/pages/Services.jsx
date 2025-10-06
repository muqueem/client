import React from "react";

const services = [
  {
    title: "Personal Consultation & Capital Advisory",
    image: "/images/services/service1.png",
    description:
      "Tailored one-on-one guidance designed to help you optimize your capital allocation and enhance portfolio performance. We focus on smart risk management, efficient diversification, and forward-thinking strategies to ensure your money works harder for you.",
  },
  {
    title: "Quarterly Bot Optimization Subscription",
    image: "/images/services/service2.png",
    description:
      "Markets evolve, and so should your bots. With our subscription service, we provide quarterly parameter reviews and updates for every Quantum Rise Capital trading bot. Stay ahead of market shifts with strategies that adapt, not stagnate.",
  },
  {
    title: "Prop Firm System Design & Challenge Acceleration",
    image: "/images/services/service3.png",
    description:
      "Every prop firm has its own rules, restrictions, and hidden traps. We build and test custom trading systems engineered for specific prop firm conditions maximizing your chances of passing challenges quickly and securing funded accounts.",
  },
  {
    title: "Custom EA Development & Partnership Program",
    image: "/images/services/service4.png",
    description:
      "Got a trading idea? We’ll transform it into a fully automated MT5 trading system—from concept to execution. If your strategy is both unique and market-ready, we’ll even publish it on our platform with a 50/50 profit-sharing model. Your idea, our tech, shared success.",
  },
];

const Services = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Practical trading solutions tailored for every stage of your growth — from smart capital allocation to advanced automation.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center border border-gray-200"
            >
              <div className="w-40 h-40 mb-4">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {service.description}
              </p>

              {/* Optional badge or tag */}
              {/* <span className="mt-4 inline-block bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">
                Premium
              </span> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
