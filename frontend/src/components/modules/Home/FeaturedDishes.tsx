import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import FoodCard from "@/components/shared/FoodCard";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

type Food = {
  title: string;
  price: number;
  image: string;
  description: string;
  _id: string;
};

export default async function FeaturedDishes() {
  let foods: Food[] = [];
  try {
    const res = await fetch("http://localhost:5000/foods", { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      foods = json.data || [];
    }
  } catch (error) {
    console.error("Failed to fetch foods:", error);
  }

  return (
    <section className="bg-primary-bg-color py-16">
      <Container>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <SectionTitle
            subTitle="FEATURED SELECTION"
            title="Popular & Trending Dishes"
          />
          <Link
            href="/all-foods"
            className="text-sm font-bold text-gray-700 hover:text-primary-color flex items-center gap-2 group transition-colors"
          >
            <span>Explore all dishes</span>
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform text-primary-color" />
          </Link>
        </div>

        {foods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {foods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-md mx-auto">
            <Sparkles className="size-12 text-primary-color mx-auto mb-4 animate-bounce" />
            <h4 className="text-xl font-bold text-gray-900 mb-2">Delicious items arriving soon!</h4>
            <p className="text-sm text-gray-500">Our chefs are preparing fresh menu items. Check back in a moment.</p>
          </div>
        )}
      </Container>
    </section>
  );
}
