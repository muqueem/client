import React, { useState } from "react";

const EA_CALCULATOR_DATA = [
  { name: "FLASH EDGE SCALPER X EA", weight: 65.31 },
  { name: "QUANTUM ATR GRID EA", weight: 15.19 },
  { name: "QUANTUM FVG EXECUTOR EA", weight: 10.15 },
  { name: "DUAL FORCE ENGINE EA", weight: 5.77 },
  { name: "SESSION SNIPER X EA", weight: 3.59 },
];

export default function CapitalAllocationCalculator() {
  const [capital, setCapital] = useState(5000);

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Capital Allocation Calculator
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Enter your capital amount to see how we recommend allocating it
            across our Expert Advisors (EAs) using risk-adjusted weighting.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <input
            type="number"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
            className="w-full p-3 rounded-lg border"
            placeholder="Enter your capital amount"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-700 rounded-xl">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-4">EA Name</th>
                <th className="p-4 text-right">Weight %</th>
                <th className="p-4 text-right">Suggested Amount</th>
              </tr>
            </thead>
            <tbody>
              {EA_CALCULATOR_DATA.map((ea, i) => {
                const allocation = ((capital * ea.weight) / 100).toFixed(2);
                return (
                  <tr key={i} className="hover:bg-gray-800">
                    <td className="p-4 font-medium">{ea.name}</td>
                    <td className="p-4 text-right">{ea.weight}%</td>
                    <td className="p-4 text-right">${allocation}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
