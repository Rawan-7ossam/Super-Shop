"use client";

import { SessionProvider } from "next-auth/react";
import CartContextProvider from "./CartProvider";
import { Toaster } from "react-hot-toast";
import WishlistProvider from "./WishlistProvider";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartContextProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </CartContextProvider>

      <Toaster position="top-right" reverseOrder={false} />
    </SessionProvider>
  );
}
