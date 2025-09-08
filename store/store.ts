// Import Product type from Sanity CMS schema
import { Product } from "@/sanity.types";
import { create } from "zustand";
// Persist middleware to save state to localStorage
import { persist } from "zustand/middleware";


export interface BasketItem {
  product: Product; 
  quantity: number; 
}


interface BasketState {
  items: BasketItem[]; // Array of all items currently in the basket
  addItem: (product: Product) => void; // Add a product or increment its quantity
  removeItem: (productId: string) => void; // Remove one quantity or delete item entirely
  clearBasket: () => void; // Empty the entire basket
  getTotalPrice: () => number; // Calculate total price of all items
  getItemCount: (productId: string) => number; // Get quantity of a specific product
  getGroupedItems: () => BasketItem[]; // Return all items (for display purposes)
}

// Create the Zustand store with persistence
const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      // Initialize with empty basket
      items: [],

      // Add a product to the basket or increment quantity if it already exists
      addItem: (product) =>
        set((state) => {
          // Check if this product is already in the basket
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );

          if (existingItem) {
            // Product exists - increment its quantity
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            // Product doesn't exist - add it with quantity 1
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        }),
      // Remove one quantity of a product, or remove entirely if quantity becomes 0
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              // Found the item to remove
              if (item.quantity > 1) {
                // More than 1 quantity - just decrement
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
              // If quantity is 1, don't add it back (effectively removes it)
            } else {
              // Different item - keep it unchanged
              acc.push(item);
            }
            return acc;
          }, [] as BasketItem[]),
        })),
      // Clear all items from the basket
      clearBasket: () => set({ items: [] }),

      // Calculate the total price of all items in the basket
      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        ),

      // Get the quantity of a specific product in the basket
      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },

      // Return all items in the basket (useful for displaying cart contents)
      getGroupedItems: () => {
        return get().items;
      },
    }),
    {
      // Store name for localStorage persistence
      name: "basket-store",
    }
  )
);

export default useBasketStore;
