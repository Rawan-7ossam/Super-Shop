"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserCart } from "../actions/cart.action";

interface CartContextType{
    myContext: CartData | null,
    getCartInfo: ()=>Promise<void>,
    setMyContext: (cart : CartData | null) => void
}

const cartContext = createContext<CartContextType>({
    myContext:null,
    getCartInfo:async()=>{},
    setMyContext: ()=> {}
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [myContext, setMyContext] = useState<CartData | null>(null);

  async function getCartInfo() {
    const response = await getUserCart();
    // console.log(response, "carttt");
    setMyContext(response?.data);
  }

  useEffect(() => {
    getCartInfo();
  }, []);

  return (
    <cartContext.Provider value={{ myContext , getCartInfo , setMyContext}}>
      {children}
    </cartContext.Provider>
  );
}

export function useCart() {
  const cartInfo = useContext(cartContext);
  return cartInfo;
}
