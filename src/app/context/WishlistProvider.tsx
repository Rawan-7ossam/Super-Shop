"use client";

import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import {
  
  getUserWishlist,
 
} from "../actions/wishlist.action";

interface WishlistContextType {
  myWishlistContext: WishlistData | null;
  getWishlistInfo: () => Promise<void>;
  setmyWishlistContext: (wishlist: WishlistData | null) => void;

}

const wishlistContext = createContext<WishlistContextType>({
  myWishlistContext: null,
  getWishlistInfo: async () => {},
  setmyWishlistContext: () => {},
  
});

export default function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [myWishlistContext, setmyWishlistContext] = useState<WishlistData | null>(
    null
  );
 

  async function getWishlistInfo() {
    const response = await getUserWishlist();
    console.log(response, "wishlistInfo");
  if (response && response.data && response.data.data) {
    // بنظبط الداتا اللي جايه من الـ API ونخليها تبقى WishlistData
    const wishlist: WishlistData = {
      count: response.data.count,
      data: response.data.data, // هنا الـ WishlistItem[]
      status: response.data.status,
    };

    setmyWishlistContext(wishlist);
  } else {
    setmyWishlistContext(null);
  }
  }

  useEffect(() => {
    getWishlistInfo();
  }, []);


  return (
    <wishlistContext.Provider
      value={{ myWishlistContext, getWishlistInfo, setmyWishlistContext }}
    >
      {children}
    </wishlistContext.Provider>
  );
}

export function useWishlist() {
  const wishlistinfo = useContext(wishlistContext);
  return wishlistinfo;
}
