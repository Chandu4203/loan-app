import React from "react";
import LoanForm from "./components/LoanForm";

export default function App() {
  return (
    <div className="container">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Loan App — Student Loans</h1>
        <p className="text-sm text-gray-600 mt-1">Estimate your monthly payments and submit an application (demo).</p>
      </header>
      <main>
        <LoanForm />
      </main>
    </div>
  );
}