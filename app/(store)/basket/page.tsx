"use client";

import AddToBasketButton from "@/components/AddToBasketButton";
import { imageUrl } from "@/lib/imageUrl";
import useBasketStore from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Loader from "@/components/Loader";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Metadata } from "@/actions/createCheckoutSession";
import { createCheckoutSession } from "@/actions/createCheckoutSession";
import React from "react";
import { ShoppingBag, ArrowLeft, Shield, Truck, Clock } from "lucide-react";

function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // wait for client to mount
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-800">
              Your basket is empty
            </h1>
            <p className="text-gray-600 text-lg">
              Add some products to get started
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!isSignedIn) {
      return;
    }
    setIsLoading(true);

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
        clerkUserId: user!.id,
      };

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Shopping Basket
            </h1>
            <p className="text-gray-600">
              {groupedItems.reduce((total, item) => total + item.quantity, 0)}{" "}
              items
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items List */}
          <div className="flex-grow space-y-4">
            {groupedItems?.map((item) => (
              <div
                key={item.product._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Product Image */}
                  <div
                    className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 cursor-pointer group"
                    onClick={() =>
                      router.push(`/product/${item.product.slug?.current}`)
                    }
                  >
                    {item.product.image && (
                      <Image
                        src={imageUrl(item.product.image).url()}
                        alt={item.product.name ?? "Product Image"}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
                        width={112}
                        height={112}
                      />
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow min-w-0">
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        router.push(`/product/${item.product.slug?.current}`)
                      }
                    >
                      <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                        {item.product.name}
                      </h2>
                      <div className="mt-2 flex items-center gap-4">
                        <span className="text-sm text-gray-500">
                          Unit Price: Ksh {(item.product.price ?? 0).toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-2xl font-bold text-gray-900">
                        Ksh{" "}
                        {((item.product.price ?? 0) * item.quantity).toFixed(2)}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <AddToBasketButton product={item.product} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary - Desktop Sidebar */}
          <div className="w-full lg:w-96 lg:sticky lg:top-4 h-fit space-y-4">
            {/* Trust Badges */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-green-700">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">Secure</span>
                </div>
                <div className="flex items-center gap-2 text-blue-700">
                  <Truck className="w-4 h-4" />
                  <span className="font-medium">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-purple-700">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">Fast Delivery</span>
                </div>
              </div>
            </div>

            {/* Order Summary Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <h3 className="text-2xl font-bold">Order Summary</h3>
                <p className="text-blue-100 mt-1">
                  {groupedItems.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}{" "}
                  items in your basket
                </p>
              </div>

              <div className="p-6 space-y-4">
                {/* Items breakdown */}
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {groupedItems.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex justify-between items-start text-sm p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1 min-w-0 mr-3">
                        <span className="text-gray-800 font-medium block truncate">
                          {item.product.name}
                        </span>
                        <span className="text-gray-500 text-xs">
                          Ksh {(item.product.price ?? 0).toFixed(2)} ×{" "}
                          {item.quantity}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900 whitespace-nowrap">
                        Ksh{" "}
                        {((item.product.price ?? 0) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing breakdown */}
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span className="font-medium">
                      Ksh {useBasketStore.getState().getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping:</span>
                    <span className="font-medium text-green-600 flex items-center gap-1">
                      <Truck className="w-3 h-3" />
                      Free
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax:</span>
                    <span className="font-medium">Included</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold border-t pt-3 text-gray-900">
                    <span>Total:</span>
                    <span className="text-green-600">
                      Ksh {useBasketStore.getState().getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                {isSignedIn ? (
                  <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="mt-6 w-full bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-4 rounded-xl hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing Payment...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Shield className="w-5 h-5" />
                        Secure Checkout
                      </div>
                    )}
                  </button>
                ) : (
                  <SignInButton mode="modal">
                    <button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      <div className="flex items-center justify-center gap-2">
                        <Shield className="w-5 h-5" />
                        Sign In to Checkout
                      </div>
                    </button>
                  </SignInButton>
                )}

                {/* Payment Security Info */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Secure Payment by</span>
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                      Instasend
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Fixed Checkout */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl">
          {/* Payment Security Badge */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 px-4 py-2 border-b border-gray-100">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
              <Shield className="w-3 h-3 text-green-600" />
              <span>Secured by</span>
              <span className="font-bold text-orange-600">Instasend</span>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-gray-600">
                  {groupedItems.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}{" "}
                  items
                </p>
                <p className="text-2xl font-bold text-green-600">
                  Ksh {useBasketStore.getState().getTotalPrice().toFixed(2)}
                </p>
              </div>
              {isSignedIn ? (
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Checkout
                    </div>
                  )}
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Sign In
                    </div>
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>

        {/* Mobile spacer */}
        <div className="h-32 lg:h-0"></div>
      </div>
    </div>
  );
}

export default BasketPage;
