"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type RawPayment = {
  _id: string;
  amount: number;
  method: string;
  status: string;
  transactionId: string;
  paidAt: string; // ISO string from backend
};

type Payment = {
  id: string;
  amount: number;
  method: string;
  status: string;
  transactionId: string;
  paidAt: string; // Human-readable format
};


export default function PaymentsTable() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchPayments = async () => {
    try {
      const response = await axios.get("http://localhost:5090/api/v2/get-all/payments");

      console.log(response.data);

      if (response.data.success) {
        const rawPayments: RawPayment[] = response.data.data;

        const formattedPayments: Payment[] = rawPayments.map((payment) => ({
          id: payment._id,
          amount: payment.amount,
          method: payment.method,
          status: payment.status,
          transactionId: payment.transactionId,
          paidAt: new Date(payment.paidAt).toLocaleString(),
        }));

        setPayments(formattedPayments);
      }
    } catch {
      setError("Failed to fetch payment data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  fetchPayments();
}, []);


  return (
    <Card className="backdrop-blur-lg bg-white/60 shadow-xl rounded-2xl overflow-hidden border border-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-800">Payment Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center text-lg font-medium py-6">Loading payments...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-6">{error}</div>
        ) : payments.length === 0 ? (
          <div className="text-center text-lg font-medium py-6">No payment records found.</div>
        ) : (
          <Table className="w-full">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="p-4 text-left">Amount ($)</TableHead>
                <TableHead className="p-4 text-left">Payment Method</TableHead>
                <TableHead className="p-4 text-left">Status</TableHead>
                <TableHead className="p-4 text-left">Transaction ID</TableHead>
                <TableHead className="p-4 text-left">Paid At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id} className="hover:bg-gray-100">
                  <TableCell className="p-4 font-medium">{payment.amount}</TableCell>
                  <TableCell className="p-4">{payment.method}</TableCell>
                  <TableCell className="p-4">
                    <Badge
                      className={`px-3 py-1 text-sm rounded-lg ${
                        payment.status === "Completed" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"
                      }`}
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="p-4">{payment.transactionId}</TableCell>
                  <TableCell className="p-4">{payment.paidAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
