"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useUserDetails } from "../zustand/useUserDetails";
import config from "@/config";
import { FaPhoneAlt } from "react-icons/fa";
import { IconMail } from "@tabler/icons-react";
export default function Invoice() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = useUserDetails((state) => state.userInfo);
  const user_id = userInfo?.user_id;
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(
          `${config.api_url}/payments/getAllInvoicesByID?user_id=${user_id}`
        );
        const data = await response.json();
        setInvoices(data.invoices || []);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      {invoices.length === 0 ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
          <div className="max-w-2xl text-center bg-white shadow-lg rounded-xl p-8">
            <p className="text-gray-700 text-lg">
              <span className="text-black font-medium">
                No subscription found{" "}
              </span>
              <a
                href="/packages"
                className="text-blue-700 font-semibold underline hover:text-blue-900"
              >
                Purchase a plan{" "}
              </a>
              to get started.
            </p>
            <div className="mt-6">
              <p className="text-gray-700 text-lg font-semibold mb-3">
                Customer Support
              </p>
              <div className="flex items-center justify-center gap-2 text-gray-800 mb-1">
                <FaPhoneAlt />
                <span>+91 9553919919</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-800">
                <IconMail />
                <span>meetowner.in@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Id</th>
                <th className="px-4 py-2 border">Invoice No</th>
                <th className="px-4 py-2 border">Package</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Payment Status</th>
                <th className="px-4 py-2 border">Subscription Status</th>
                <th className="px-4 py-2 border">Created At</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, id) => (
                <tr key={invoice.id} className="text-center">
                  <td className="px-4 py-2 border">{id}</td>
                  <td className="px-4 py-2 border">{invoice.invoice_number}</td>
                  <td className="px-4 py-2 border capitalize">
                    {invoice.subscription_package}
                  </td>
                  <td className="px-4 py-2 border">
                    ₹{invoice.payment_amount}
                  </td>
                  <td className="px-4 py-2 border text-green-600">
                    {invoice.payment_status}
                  </td>
                  <td className="px-4 py-2 border">
                    {invoice.subscription_status}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(invoice.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">
                    <Link href={invoice.invoice_url} target="_blank">
                      <button className="bg-[#1D3A76] text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                        View Invoice
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
