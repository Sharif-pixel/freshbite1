"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/shared/Container";
import FoodCard from "@/components/shared/FoodCard";
import { Input } from "@/components/ui/input";
import { Search, Utensils, Filter } from "lucide-react";

type Food = {
  _id: string;
  title?: string;
  name?: string;
  foodName?: string;
  price?: number | string;
  image?: string;
  imageUrl?: string;
  description?: string;
  details?: string;
  category?: string;
};

const CATEGORIES = ["All", "Burgers", "Pizza", "Salads", "Pasta", "Noodles"];

export default function AllFoodsPage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/foods")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setFoods(data.data);
        }
      })
      .catch((err) => console.error("Error fetching foods:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredFoods = foods.filter((food) => {
    const title = (food.title || food.name || food.foodName || "").toLowerCase();
    const description = (food.description || food.details || "").toLowerCase();
    const category = (food.category || "").toLowerCase();
    const searchLower = search.toLowerCase().trim();

    const matchesSearch =
      !searchLower ||
      title.includes(searchLower) ||
      description.includes(searchLower) ||
      category.includes(searchLower);

    if (selectedCategory === "All") return matchesSearch;

    const catLower = selectedCategory.toLowerCase();
    const matchesCategory =
      title.includes(catLower) ||
      description.includes(catLower) ||
      category.includes(catLower);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gradient-to-b from-red-50/40 via-white to-orange-50/20 min-h-screen py-12">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <div className="flex items-center gap-2 text-primary-color font-bold text-sm uppercase tracking-wider mb-2">
            <Utensils size={18} />
            <span>Complete Menu</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Explore All Culinary Delights
          </h1>
          <p className="text-gray-600 text-lg">
            Handcrafted with organic ingredients and delivered piping hot to your table.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dishes by name or ingredient..."
              className="pl-11 pr-4 h-12 bg-gray-50 border-gray-200 rounded-2xl focus-visible:ring-primary-color"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <Filter size={16} className="text-gray-400 shrink-0 ml-1" />
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 ${
                  selectedCategory === category
                    ? "bg-primary-color text-white shadow-md shadow-red-500/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Food Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-80 bg-gray-200/70 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : filteredFoods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFoods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm max-w-md mx-auto my-12">
            <p className="text-5xl mb-4">🔍</p>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No dishes found</h3>
            <p className="text-sm text-gray-500 mb-6">
              We couldn't find any dishes matching "{search}". Try searching for something else!
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="px-6 py-2.5 bg-primary-color text-white text-sm font-bold rounded-xl shadow-md hover:bg-red-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}
