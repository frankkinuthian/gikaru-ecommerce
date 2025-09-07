import { COUPON_CODES } from "@/sanity/lib/sales/couponCode";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";

export default async function BlackFridayBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.BLACKFRI);

  if (!sale?.isActive) {
    return null;
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-black text-white mx-4 mt-2 rounded-2xl shadow-2xl">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-yellow-300 rounded-full translate-x-12 translate-y-12 animate-bounce"></div>
      </div>

      <div className="relative px-6 py-8 sm:px-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Sale badge */}
          <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-bold text-red-600 bg-yellow-300 rounded-full animate-pulse">
            🔥 LIMITED TIME
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Content section */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
                {sale.title}
              </h2>
              <p className="text-lg sm:text-2xl lg:text-3xl font-medium text-red-100 leading-relaxed">
                {sale.description}
              </p>
            </div>

            {/* CTA section */}
            <div className="lg:col-span-1 flex justify-center lg:justify-end">
              <div className="group relative">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 to-red-300 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>

                <div className="relative bg-white text-black p-6 rounded-2xl shadow-xl transform group-hover:scale-105 transition-all duration-300">
                  <div className="text-center space-y-2">
                    <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Use Code
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-red-600 font-mono tracking-wider">
                      {sale.couponCode}
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-lg font-bold text-gray-800">
                        Save
                      </span>
                      <span className="text-3xl font-black text-red-600">
                        {sale.discountAmount}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      Applied at checkout
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
