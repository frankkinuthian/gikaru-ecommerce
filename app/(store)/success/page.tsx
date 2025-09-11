"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useBasketStore from "@/store/store";
import {
  CheckCircle,
  Package,
  Mail,
  ArrowRight,
  Home,
  Receipt,
  Truck,
  Clock,
  Shield,
} from "lucide-react";

function SuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearBasket = useBasketStore((state) => state.clearBasket);
  const sessionId = searchParams.get("session_id");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
    // Trigger animation after component mounts
    setTimeout(() => setIsVisible(true), 100);
  }, [orderNumber, clearBasket]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-screen p-4">
        {/* Main Success Card */}
        <div
          className={`bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 border border-white/20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Success Icon with Animation */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="h-24 w-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              {/* Ripple Effect */}
              <div className="absolute inset-0 h-24 w-24 bg-green-400 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Payment Successful.
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Thank you for your order
            </p>
            <p className="text-gray-500">
              Your payment has been processed securely
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-8 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-blue-600" />
              Order Details
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {orderNumber && (
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">Order Number</p>
                  <p className="font-mono text-lg font-semibold text-green-600">
                    #{orderNumber.slice(-8).toUpperCase()}
                  </p>
                </div>
              )}
              {sessionId && (
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
                  <p className="font-mono text-sm text-gray-700 truncate">
                    {sessionId}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* What's Next Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Email Confirmation
              </h3>
              <p className="text-sm text-gray-600">
                Check your inbox for order confirmation and tracking details
              </p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-200">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Order Processing
              </h3>
              <p className="text-sm text-gray-600">
                We&apos;re preparing your items for shipment
              </p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Fast Delivery
              </h3>
              <p className="text-sm text-gray-600">
                Free shipping with tracking information
              </p>
            </div>
          </div>

          {/* Payment Security Badge */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 mb-8 border border-orange-200">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Shield className="w-6 h-6 text-orange-600" />
              <span className="text-lg font-semibold text-gray-800">
                Payment Secured by
              </span>
              <span className="text-2xl font-bold text-orange-600 bg-orange-100 px-4 py-1 rounded-full">
                Instasend
              </span>
            </div>
            <p className="text-center text-sm text-gray-600">
              Your transaction was processed securely with bank-level encryption
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Link href="/orders" className="flex items-center gap-2">
                <Receipt className="w-4 h-4" />
                View Order Details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 px-8 py-3 rounded-xl transition-all duration-200"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>

          {/* Estimated Delivery */}
          <div className="mt-8 text-center p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Estimated Delivery</span>
            </div>
            <p className="text-lg font-semibold text-gray-800">
              {new Date(
                Date.now() + 3 * 24 * 60 * 60 * 1000
              ).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
