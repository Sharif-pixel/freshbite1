"use client";
import React, { useState } from "react";
import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Items", icon: "✨", count: "12+ items" },
  { id: "burgers", label: "Gourmet Burgers", icon: "🍔", count: "5 items" },
  { id: "pizza", label: "Artisan Pizza", icon: "🍕", count: "4 items" },
  { id: "asian", label: "Asian & Wok", icon: "🍜", count: "6 items" },
  { id: "healthy", label: "Bowls & Salads", icon: "🥗", count: "3 items" },
  { id: "desserts", label: "Sweet Treats", icon: "🍰", count: "4 items" },
  { id: "beverages", label: "Smoothies & Drinks", icon: "🥤", count: "5 items" },
];

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="bg-gradient-to-b from-transparent to-red-50/30 py-16">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <SectionTitle
            subTitle="EXPLORE CATEGORIES"
            title="What are you craving today?"
          />
          <Link
            href="/all-foods"
            className="group flex items-center gap-1.5 text-sm font-bold text-primary-color hover:text-red-700 bg-red-50 hover:bg-red-100/80 px-4 py-2 rounded-full transition-all"
          >
            <span>See Full Menu</span>
            <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Pills/Cards */}
        <div className="flex items-center gap-4 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-3.5 px-5 py-3.5 rounded-2xl whitespace-nowrap transition-all duration-300 transform hover:-translate-y-1 ${
                  isActive
                    ? "bg-primary-color text-white shadow-[0_10px_25px_-5px_rgba(230,57,70,0.4)] scale-105 font-bold"
                    : "bg-white text-gray-700 hover:text-primary-color border border-gray-100 shadow-sm hover:shadow-md font-medium"
                }`}
              >
                <span className="text-2xl">{cat.icon}</span>
                <div className="text-left">
                  <div className="text-sm leading-tight">{cat.label}</div>
                  <div className={`text-[11px] ${isActive ? "text-red-100" : "text-gray-400"}`}>
                    {cat.count}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
