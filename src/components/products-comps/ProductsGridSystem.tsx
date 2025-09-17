"use client";
import { Products } from "@/app/types/products.model";
import React from "react";
import ProductCard from "./ProductCard";

export default function ProductsGridSystem({
  products,
}: {
  products: Products[];
}) {
  // console.log(products, "grid product");

  return (
    <div className="container mx-auto mt-20">
         <h2 className="text-center text-3xl font-bold underline underline-offset-2"><span className="text-red-500 text-5xl">O</span>ur Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 xl:grid-cols-5 gap-5 my-8 px-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
