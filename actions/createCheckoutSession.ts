"use server";

import instasend from "@/lib/instasend";
import { BasketItem } from "@/store/store";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedBasketItem[],
  metadata: Metadata
) {
  try {
    // check if any grouped items do not have a price
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("One or more items do not have a price.");
    }

    // Calculate total amount
    const totalAmount = items.reduce((total, item) => {
      return total + (item.product.price || 0) * item.quantity;
    }, 0);

    const collection = instasend.collection();

    const chargeResponse = await collection.charge({
      first_name: metadata.customerName.split(" ")[0] || "Customer",
      last_name: metadata.customerName.split(" ").slice(1).join(" ") || "",
      email: metadata.customerEmail,
      host: `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_BASE_URL}`,
      amount: totalAmount,
      currency: "KES", // Change to your preferred currency (USD, KES, GBP, EUR)
      api_ref: metadata.orderNumber,
      redirect_url: `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_BASE_URL}/success?orderNumber=${metadata.orderNumber}`,
    });

    // IntaSend returns the checkout URL in the response
    return chargeResponse.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}
