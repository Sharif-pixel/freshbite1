"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  restaurant?: string;
  description?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (food: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
  promoCode: string;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("fresh_bites_cart");
      if (stored) {
        setCart(JSON.parse(stored));
      }
      const storedPromo = localStorage.getItem("fresh_bites_promo");
      if (storedPromo) {
        setPromoCode(storedPromo);
        setDiscountPercent(storedPromo.toUpperCase() === "FRESH20" ? 0.2 : 0);
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("fresh_bites_cart", JSON.stringify(cart));
      } catch (e) {
        console.error("Failed to save cart to localStorage", e);
      }
    }
  }, [cart, isLoaded]);

  const addToCart = (food: any) => {
    const id = food._id || food.id || String(Date.now());
    const title = food.title || food.name || food.foodName || "Delicious Item";
    const numPrice = typeof food.price === "number" ? food.price : parseFloat(String(food.price || 0)) || 0;
    const image = food.image || food.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop";
    const restaurant = food.restaurantName || food.restaurant || "Downtown Kitchen";

    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id,
          title,
          price: numPrice,
          quantity: 1,
          image,
          restaurant,
          description: food.description || food.details || "",
        },
      ];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode("");
    setDiscountPercent(0);
    localStorage.removeItem("fresh_bites_cart");
    localStorage.removeItem("fresh_bites_promo");
  };

  const applyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "FRESH20" || clean === "WELCOME20") {
      setPromoCode(clean);
      setDiscountPercent(0.2);
      localStorage.setItem("fresh_bites_promo", clean);
      return true;
    }
    return false;
  };

  const removePromo = () => {
    setPromoCode("");
    setDiscountPercent(0);
    localStorage.removeItem("fresh_bites_promo");
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = cart.length > 0 ? 3.99 : 0;
  const discount = subtotal * discountPercent;
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = taxableAmount * 0.08;
  const total = Math.max(0, taxableAmount + deliveryFee + tax);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        deliveryFee,
        tax,
        discount,
        total,
        promoCode,
        applyPromo,
        removePromo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
