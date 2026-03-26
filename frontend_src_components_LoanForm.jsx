import React, { useState } from "react";

function calcMonthly(paymentAmount, annualRate, months) {
  if (annualRate === 0) return paymentAmount / months;
  const r = annualRate / 12 / 100;
  return (paymentAmount * r) / (1 - Math.pow(1 + r, -months));
}

export default function LoanForm() {
  const [amount, setAmount] = useState(10000);
  const [term, setTerm] = useState(36); // months
  const [rate, setRate] = useState(7.5);
  const monthly = calcMonthly(Number(amount), Number(rate), Number(term)).toFixed(2);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now we just show a demo success. In future, POST to /api/applications
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Loan amount</label>
          <input
            type="range"
            min="500"
            max="50000"
            step="100"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full"
          />
          <div className="mt-1 text-lg font-semibold">${Number(amount).toLocaleString()}</div>
        </div>

        <div>
          <label className="block text-sm font-medium">Term (months)</label>
          <select value={term} onChange={(e) => setTerm(e.target.value)} className="mt-1 block w-full p-2 border rounded">
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={36}>36</option>
            <option value={48}>48</option>
            <option value={60}>60</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Annual interest rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>

        <div className="p-4 bg-gray-50 rounded">
          <div className="text-sm text-gray-600">Estimated monthly payment</div>
          <div className="text-2xl font-bold">${monthly}</div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Submit application</button>
          <button type="button" onClick={() => { setAmount(10000); setTerm(36); setRate(7.5); }} className="px-4 py-2 border rounded">Reset</button>
        </div>

        {submitted && <div className="mt-2 text-green-600">Application submitted (demo)</div>}
      </form>
    </div>
  );
}