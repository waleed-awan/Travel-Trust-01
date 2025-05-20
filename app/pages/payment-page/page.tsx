"use client";

import { useState } from "react";

export default function PaymentForm() {
  const [ride, setRide] = useState("");
  const [passenger, setPassenger] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Card");
  const [token, setToken] = useState(""); // Only required for Card payments
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const paymentData = {
      ride,
      passenger,
      amount: parseFloat(amount),
      method,
      token: method === "Card" ? token : undefined,
    };

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Payment successful!");
      } else {
        setMessage(`Payment failed: ${data.message}`);
      }
    } catch{
      setMessage("An error occurred while processing payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Make a Payment</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Ride ID"
          value={ride}
          onChange={(e) => setRide(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Passenger ID"
          value={passenger}
          onChange={(e) => setPassenger(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Card">Card</option>
          <option value="Cash">Cash</option>
          <option value="Wallet">Wallet</option>
        </select>
        {method === "Card" && (
          <input
            type="text"
            placeholder="Card Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}
