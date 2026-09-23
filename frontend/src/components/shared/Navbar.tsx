"use client";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Container from "./Container";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";
import { Badge } from "../ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { LogOut, ShoppingBag } from "lucide-react";

const Navbar = () => {
  const pathName = usePathname();
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  const navLink = [
    {
      label: <span>Home</span>,
      link: "/",
    },
    {
      label: <span>All Foods</span>,
      link: "/all-foods",
    }
  ];

  return (
    <div className="bg-white/95 shadow-sm backdrop-blur-md sticky top-0 z-50 transition-all duration-300 border-b border-gray-100">
      <Container className="py-3.5 flex gap-x-2 justify-between items-center">
        {/* logo side */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <Image src={logo} alt={"FreshBites Logo"} className="size-9 object-contain transition-transform duration-300 group-hover:scale-110" />
          <h3 className="text-primary-color text-2xl font-black tracking-tight">
            FreshBites
          </h3>
        </Link>

        {/* nav links & actions */}
        <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4">
          {navLink?.map((nav) => (
            <Link
              key={nav.link}
              href={nav.link}
              className={cn(
                "text-sm px-4 py-2 rounded-full transition-all duration-300 ease-in-out font-medium",
                pathName === nav.link 
                  ? "bg-primary-color text-white shadow-md transform scale-105"
                  : "text-[#5B4039] hover:bg-red-50 hover:text-primary-color"
              )}
            >
              {nav.label}
            </Link>
          ))}

          {/* Cart Icon - Always visible with dynamic count */}
          <Link 
            href="/cart" 
            className="relative flex items-center gap-1.5 text-gray-700 hover:text-primary-color transition-colors px-3 py-2 rounded-xl hover:bg-red-50/70"
            title="View Cart & Checkout"
          >
            <ShoppingBag size={20} className="text-gray-700 group-hover:text-primary-color" />
            <span className="text-sm font-semibold hidden sm:inline">Cart</span>
            {cartCount > 0 ? (
              <Badge className="bg-primary-color hover:bg-red-700 text-white rounded-full min-w-5 h-5 px-1 text-[11px] font-black flex items-center justify-center absolute -top-1 -right-1 shadow-sm border-2 border-white animate-in zoom-in">
                {cartCount}
              </Badge>
            ) : null}
          </Link>

          {user ? (
            <div className="flex items-center gap-3 ml-2 pl-3 border-l border-gray-200">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-gradient-to-tr from-primary-color to-orange-400 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <span className="text-sm font-semibold text-gray-800 hidden md:inline">
                  {user.name.split(' ')[0]}
                </span>
              </div>
              <button 
                onClick={logout} 
                className="p-2 text-gray-500 hover:text-primary-color hover:bg-red-50 rounded-full transition-colors cursor-pointer" 
                title="Log out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3 ml-1 sm:ml-2">
              <Link 
                href="/login" 
                className="text-sm font-semibold text-[#5B4039] hover:text-primary-color px-3 sm:px-4 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/register" 
                className="text-sm font-bold bg-primary-color hover:bg-red-800 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-[0_4px_14px_0_rgb(176,47,0,30%)] hover:shadow-[0_6px_20px_rgba(176,47,0,25%)] transform transition-all duration-300 hover:-translate-y-0.5"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
