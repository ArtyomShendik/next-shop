import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  quantity: number;
  price: number;
  name: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateItem: (id: number, quantity: number, price: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? {
                      ...i,
                      quantity: i.quantity + item.quantity,
                      price: item.price,
                      name: item.name,
                    }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      updateItem: (id, quantity, price) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity, price } : item
          ),
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        const state = get();
        return state.items.reduce((sum, item) => sum + item.quantity, 0);
      },
      getTotalPrice: () => {
        const state = get();
        return state.items.reduce((sum, item) => sum + item.price, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
