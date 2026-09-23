import Image from "next/image";
import bannerImage from "@/assets/banner_image.png";
import Container from "@/components/shared/Container";
import { Flame } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Banner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-orange-50 pt-16 pb-24">
      {/* Decorative background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <Container className="relative z-10 w-full flex xl:flex-row flex-col-reverse justify-between items-center flex-wrap lg:gap-12 gap-8">
        {/* ================== banner content================ */}
        <div className="space-y-8 flex-1 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center gap-x-2 font-bold py-2.5 px-5 rounded-full bg-green-100 shadow-sm border border-green-200 w-fit transform hover:scale-105 transition-transform">
            <Flame className="h-5 w-5 text-green-600 fill-current animate-pulse" />
            <span className="text-sm text-green-700 tracking-wide uppercase">
              Lightning Fast Delivery
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight">
            Fresh cravings, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-color to-orange-500">
              delivered hot
            </span>{" "}
            to your door.
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
            Discover top-rated local restaurants, gourmet street food, and
            farm-fresh organic bowls crafted by award-winning chefs.
          </p>

          <div className="pt-4">
            <SearchBar />
          </div>
        </div>

        {/* ===================== banner image ====================== */}
        <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-color/20 to-transparent rounded-full blur-3xl -z-10 transform scale-110"></div>
          <Image 
            src={bannerImage} 
            alt="Delicious fresh food banner" 
            className="w-full max-w-[600px] h-auto object-contain drop-shadow-2xl hover:-translate-y-4 transition-transform duration-500 ease-out"
            priority
          />
        </div>
      </Container>
    </div>
  );
}
