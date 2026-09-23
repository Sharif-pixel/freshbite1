import Banner from "@/components/modules/Home/banner";
import Categories from "@/components/modules/Home/categories";
import FeaturedDishes from "@/components/modules/Home/FeaturedDishes";

export default function Home() {
  return (
    <div>
      <Banner />
      <Categories />
      <FeaturedDishes />
    </div>
  );
}
