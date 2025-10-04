import React from "react";

// You can import images directly if you want, or keep them in /public/services
// Example: import Service1 from "../assets/service1.png";

const services = [
  {
    title: "Algorithmic Trading",
    image: "/images/services/service1.png",
    description:
      "Leverage cutting-edge algorithms to execute trades with speed, precision, and data-backed strategies.",
  },
  {
    title: "Portfolio Management",
    image: "/images/services/service2.png",
    description:
      "Maximize returns while managing risk with our active portfolio allocation and monitoring tools.",
  },
  {
    title: "Risk Analysis",
    image: "/images/services/service3.png",
    description:
      "Gain deep insights into market risks and safeguard your investments with our advanced analytics.",
  },
  {
    title: "Capital Growth Solutions",
    image: "/images/services/service4.png",
    description:
      "Strategic approaches designed to help your capital grow consistently with disciplined frameworks.",
  },
];

const Services = () => {
  return (
    <div className="bg-white text-black min-h-screen py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-12 text-yellow-600">
          Our Services
        </h1>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-32 h-32 object-contain mb-6"
              />
              <h2 className="text-xl font-semibold mb-3">{service.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;

