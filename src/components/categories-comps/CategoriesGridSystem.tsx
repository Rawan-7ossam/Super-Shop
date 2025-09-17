import { Categories } from "@/app/types/category.model";
import React from "react";
import CategoriesCard from "./CategoriesCard";

export default function CategoriesGridSystem({
  categories,
}: {
  categories: Categories[];
}) {
  return (
    <div className="container mx-auto px-8 mt-20">
        <h2 className="pb-8 text-center text-3xl font-bold underline underline-offset-2 "><span className="text-red-500 text-5xl">O</span>ur Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        {categories.map((category) => (
          <CategoriesCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
}
