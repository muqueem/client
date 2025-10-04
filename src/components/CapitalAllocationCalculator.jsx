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
    <div className="max-w-3xl mx-auto py-12 md:px-6">
      <div className="bg-gradient-to-r from-yellow-100 via-yellow-50 to-white rounded-2xl shadow-2xl p-3 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Capital Allocation Calculator
        </h2>

        <div className="max-w-md mx-auto mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Capital Amount
          </label>
          <input
            type="number"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none shadow-sm"
            placeholder="Enter your capital amount"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse rounded-xl overflow-hidden shadow-md">
            <thead className="bg-yellow-100">
              <tr>
                <th className="p-4 text-left text-gray-700 font-semibold">
                  EA Name
                </th>
                <th className="p-4 text-right text-gray-700 font-semibold">
                  Weight %
                </th>
                <th className="p-4 text-right text-gray-700 font-semibold">
                  Suggested Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {EA_CALCULATOR_DATA.map((ea, i) => {
                const allocation = ((capital * ea.weight) / 100).toFixed(2);
                return (
                  <tr
                    key={i}
                    className="border-b last:border-b-0 hover:bg-yellow-50 transition-colors duration-200"
                  >
                    <td className="p-4 font-medium text-gray-800">{ea.name}</td>
                    <td className="p-4 text-right text-gray-600">{ea.weight}%</td>
                    <td className="p-4 text-right font-semibold text-green-600">
                      ${allocation}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
