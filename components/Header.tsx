"use client";

import React from "react";
import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { TrolleyIcon, PackageIcon, SearchIcon } from "@sanity/icons";
import useBasketStore from "@/store/store";

function Header() {
  const { user } = useUser();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  const createClerkPasskey = async () => {
    try {
      const res = await user?.createPasskey();
      console.log(res);
    } catch (error) {
      console.error("Error", JSON.stringify(error, null, 2));
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0"
          >
            Gikaru
          </Link>

          {/* Search Bar - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <Form action="/search" className="w-full">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="query"
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </Form>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Mobile search button */}
            <button className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <SearchIcon className="w-5 h-5" />
            </button>

            {/* Basket */}
            <Link
              href="/basket"
              className="relative flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
              <TrolleyIcon className="w-5 h-5" />

              <span
                className="absolute -top-2 -right-2 bg-red-500 text-white 
              rounded-full w-5 h-5 flex items-center justify-center text-xs
              "
              >
                {itemCount}
              </span>
              <span className="hidden sm:inline">Basket</span>
            </Link>

            {/* User area */}
            <ClerkLoaded>
              <SignedIn>
                <Link
                  href="/orders"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <PackageIcon className="w-5 h-5" />
                  <span className="hidden lg:inline">Orders</span>
                </Link>
              </SignedIn>

              {user ? (
                <div className="flex items-center space-x-3">
                  {user?.passkeys.length === 0 && (
                    <button
                      onClick={createClerkPasskey}
                      className="hidden sm:flex items-center px-3 py-1.5 text-sm bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors font-medium"
                    >
                      🔐 Add Passkey
                    </button>
                  )}

                  <div className="flex items-center space-x-2">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8",
                        },
                      }}
                    />
                    <div className="hidden lg:block text-sm">
                      <p className="text-gray-500">Welcome back</p>
                      <p className="font-medium text-gray-900 truncate max-w-24">
                        {user.fullName}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <SignInButton mode="modal">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                    Sign In
                  </button>
                </SignInButton>
              )}
            </ClerkLoaded>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden pb-4">
          <Form action="/search">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="query"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </Form>
        </div>
      </div>
    </header>
  );
}

export default Header;
