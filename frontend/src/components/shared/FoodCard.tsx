"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Check, CreditCard } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

interface FoodCardProps {
  food: {
    _id: string;
    title?: string;
    name?: string;
    foodName?: string;
    price?: number | string;
    image?: string;
    imageUrl?: string;
    description?: string;
    details?: string;
    restaurantName?: string;
    restaurant?: string;
  };
}

export default function FoodCard({ food }: FoodCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  const title = food.title || food.name || food.foodName || "Chef's Special";
  const numPrice = typeof food.price === "number" ? food.price : parseFloat(String(food.price || 0)) || 0;
  const description = food.description || food.details || "Prepared fresh to order with premium ingredients.";
  const image = food.image || food.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(food);
    // Bring user straight into the payment & checkout flow
    setTimeout(() => {
      router.push("/cart?checkout=true");
    }, 250);
  };

  return (
    <Card className="group overflow-hidden rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out hover:-translate-y-2 flex flex-col h-full">
      <div className="relative w-full h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-sm font-black text-gray-900 shadow-md">
            ${numPrice.toFixed(2)}
          </span>
        </div>
      </div>
      <CardHeader className="pb-2 pt-5 px-5">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-extrabold text-xl text-gray-900 leading-tight group-hover:text-primary-color transition-colors line-clamp-1">{title}</h3>
        </div>
      </CardHeader>
      <CardContent className="px-5 flex-grow">
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{description}</p>
      </CardContent>
      <CardFooter className="px-5 pb-5 pt-0 mt-auto">
        <Button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full h-12 bg-gray-900 hover:bg-primary-color text-white rounded-2xl font-bold shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer"
        >
          {isAdding ? (
            <>
              <Check size={18} className="text-green-400 animate-pulse" />
              <span>Opening Checkout...</span>
            </>
          ) : (
            <>
              <span>Add to Cart & Order</span>
              <Plus size={18} className="transform group-hover/btn:rotate-90 transition-transform duration-300" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
