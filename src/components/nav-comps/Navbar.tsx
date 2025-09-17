"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";


import Link from "next/link";
import { LogIn, LogOut, ShoppingCart, SquarePen } from "lucide-react";
import { Heart } from "lucide-react";
import { User } from "lucide-react";
import { useState } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "../ui/badge";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/CartProvider";
import { useWishlist } from "@/app/context/WishlistProvider";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const PathUrl = usePathname();
  const { myContext } = useCart();
  // console.log(myContext, "navbarrrrrrrrrrrrr");
  const { myWishlistContext } = useWishlist();
  // console.log(myWishlistContext, "wishhhh");

  const session = useSession();
  // console.log(session);
  

  return (
    <div className=" fixed top-0 right-0 left-0 z-3 flex w-full xl:justify-between items-center xl:px-[200px] py-2 bg-white">
      <button
        className="xl:hidden p-2 "
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      <h1 className="sm:text-[50px] lg:text-4xl font-bold">
        <span className="text-red-500">Super</span>Shop
      </h1>

      <NavigationMenu className="font-bold text-xl hidden xl:flex ">
        <NavigationMenuList className="gap-5">
          <NavigationMenuItem>
            <Link
              href="/"
              className={`${PathUrl == "/" ? "text-red-500" : ""}`}
            >
              Home
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {" "}
            <Link
              href="/products"
              className={`${PathUrl == "/products" ? "text-red-500" : ""}`}
            >
              Products
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {" "}
            <Link
              href="/cart"
              className={`${PathUrl == "/cart" ? "text-red-500" : ""}`}
            >
              Cart
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {" "}
            <Link
              href="/categories"
              className={`${PathUrl == "/categories" ? "text-red-500" : ""}`}
            >
              Categories
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {" "}
            <Link
              href="/brands"
              className={`${PathUrl == "/brands" ? "text-red-500" : ""}`}
            >
              Brands
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {" "}
            <Link
              href="/wishlist"
              className={`${PathUrl == "/wishlist" ? "text-red-500" : ""}`}
            >
              Wishlist
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {menuOpen && (
        <div className="absolute top-20 left-0 w-full h-screen bg-white shadow-md z-50 flex flex-col ps-5 gap-4 py-4 xl:hidden font-bold">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={`${PathUrl == "/" ? "text-red-500" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/products"
            onClick={() => setMenuOpen(false)}
            className={`${PathUrl == "/products" ? "text-red-500" : ""}`}
          >
            Products
          </Link>
          <Link
            href="/cart"
            onClick={() => setMenuOpen(false)}
            className={`${PathUrl == "/cart" ? "text-red-500" : ""}`}
          >
            Cart
          </Link>
          <Link
            href="/categories"
            onClick={() => setMenuOpen(false)}
            className={`${PathUrl == "/categories" ? "text-red-500" : ""}`}
          >
            Categories
          </Link>
          <Link
            href="/brands"
            onClick={() => setMenuOpen(false)}
            className={`${PathUrl == "/brands" ? "text-red-500" : ""}`}
          >
            Brands
          </Link>
          <Link
            href="/wishlist"
            onClick={() => setMenuOpen(false)}
            className={`${PathUrl == "/wishlist" ? "text-red-500" : ""}`}
          >
            Wishlist
          </Link>
        </div>
      )}

      <div className=" order-last ml-auto flex gap-2 pe-3 xl:order-none xl:ml-0">
        {session.data ? (
          <>
            <button className="relative btn cursor-pointer ">
              <Badge
                variant="default"
                className="absolute right-[-12px] top-[-13px]"
              >
                {myContext?.numOfCartItems}
              </Badge>
              <Link href="/cart">
                <ShoppingCart />
              </Link>
            </button>
            <button className="relative btn cursor-pointer ">
              <Badge
                variant="default"
                className="absolute right-[-12px] top-[-13px]"
              >
                {myWishlistContext?.count}
              </Badge>
              <Link href="/wishlist">
                <Heart />
              </Link>
            </button>
          </>
        ) : (
          " "
        )}

        <HoverCard>
          <HoverCardTrigger className="cursor-pointer">
            <User />
          </HoverCardTrigger>
          <HoverCardContent className="w-[128px]">
            <ul>
              <li className="font-semibold text-[14px] text-[#0a0a0a]">
                My Account
                
              </li>
              <hr className="w-[100%] my-1 text-[#e5e5e5]" />
              {session.data ? (
                <li>
                  <Link
                    href="/"
                    onClick={() => signOut({ callbackUrl: "/signin" })}
                    className="text-[14px] text-[#171717]"
                  >
                    <div className="hover:bg-slate-300 rounded-lg px-2 py-1">
                      <p className="text-[14px]"><LogOut className="inline" size={15} /> Logout </p>
                    </div>
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link href="/signin" className=" text-[#171717] ">
                      <div className="hover:bg-slate-300 rounded-lg px-2 py-1">
                        <p className="text-[14px]"><LogIn className="inline" size={15} /> SignIn</p>
                      </div>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/register"
                      className="text-[14px] text-[#171717]"
                    >
                      <div className="hover:bg-slate-300 rounded-lg px-2 py-1">
                        <p className="text-[14px]"> <SquarePen className="inline" size={15} /> Register</p>
                      </div>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}
