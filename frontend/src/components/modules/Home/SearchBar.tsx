import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  return (
    <div className="p-2 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center w-full max-w-md border border-gray-100 transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] group">
      <Search size={20} className="ml-3 text-gray-400 group-focus-within:text-primary-color transition-colors" />
      <Input
        placeholder="Search for sushi, burgers..."
        className="border-none focus-visible:ring-0 text-base md:text-lg placeholder:text-gray-400 text-gray-800 h-12 shadow-none px-4"
      />
      <Button className="h-12 px-8 rounded-xl bg-primary-color hover:bg-red-700 text-white font-bold shadow-md transition-all hover:scale-105">
        Find Food
      </Button>
    </div>
  );
}
