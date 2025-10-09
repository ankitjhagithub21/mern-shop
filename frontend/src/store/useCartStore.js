import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [],
  setCart: (cart) => set({ cart }),
  addItem: (item) => set(state => ({
    cart: [...state.cart, item]
  })),
  updateItem: (productId, quantity) => set(state => ({
    cart: state.cart.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    )
  })),
  removeItem: (productId) => set(state => ({
    cart: state.cart.filter(item => item.productId !== productId)
  })),
  clearCart: () => set({ cart: [] }),
  fetchCart: async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok && data.products) {
        set({ cart: data.products });
      } else {
        set({ cart: [] });
      }
    } catch {
      set({ cart: [] });
    }
  },
}));


