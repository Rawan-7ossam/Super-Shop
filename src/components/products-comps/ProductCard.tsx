"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Products } from "@/app/types/products.model";
import Image from "next/image";
import { StarRating } from "react-flexible-star-rating";
import { Heart,  ShoppingCart} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { addProductToCart } from "@/app/actions/cart.action";
import toast from "react-hot-toast";
import { useCart } from "@/app/context/CartProvider";
import { addProductToWishlist, removeProductfromWishlist } from "@/app/actions/wishlist.action";
import { useWishlist } from "@/app/context/WishlistProvider";

export default function ProductCard({ product }: { product: Products }) {
  
 
  const { getCartInfo } = useCart();
  const { getWishlistInfo , myWishlistContext} = useWishlist();
   const isFavorite = myWishlistContext?.data?.some(
  (item: WishlistItem) => item._id === product._id
);
  async function handleAddProductToCart(productId: string) {
    const response = await addProductToCart(productId);
    
    console.log(response);
    toast.success(response?.message);
    await getCartInfo();
    
    
  }
  
  
  async function handleAddProductToWishlist(productId: string) {
    const response = await addProductToWishlist(productId);
    console.log(response , "add to wishlist");
    toast.success(response?.message);
    await getWishlistInfo();
   
    
  }

   async function handleRemoveFromWishlist(productId : string){
    const response = await removeProductfromWishlist(productId)
    console.log(response , "remove from wishlist");
    toast.success("Product removed successfully from your wishlist")
    await getWishlistInfo()
    }

    async function handleToggleWishlist(productId : string){
        if(isFavorite){
         await handleRemoveFromWishlist(productId)
         
        }else{
         handleAddProductToWishlist(productId)
          
        }
    }
  return (
    <>
      <div>
        <Card className="cursor-pointer group overflow-hidden hover:shadow-2xl pb-8 md:hover:scale-110 transition-all duration-300">
          <div className="me-4 mb-3 flex justify-end">
            <button onClick={() => handleToggleWishlist(product._id)} className="cursor-pointer p-2 rounded-full bg-transparent text-black border-2 hover:bg-slate-200 " >
              <Heart  className={`cursor-pointer ${isFavorite ? "text-red-500" : ""}`}  />
            </button>
          </div>
          <Link href={`/products/${product._id}`}>
            <CardHeader>
              <div className=" relative w-[90%] mx-auto h-[240px] shadow-xl rounded-2xl border-1 border-black overflow-hidden">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  fill
                  sizes="(max-width:768px) 100vw (max-width:1200px) 50vw , 25vw"
                  className="rounded-2xl transition-all duration-300  md:group-hover:scale-125"
                />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="mt-5">
                {product.title.split(" ").splice(0, 3).join(" ")}
              </CardTitle>
              <CardDescription>
                {product.slug.split("-").splice(0, 3).join(" ")}
              </CardDescription>
            </CardContent>
          </Link>
          <CardFooter className="flex flex-col items-start relative  ">
            <StarRating
              initialRating={Math.floor(product.ratingsAverage)}
              dimension={6}
            />
            <div className="flex flex-row items-start my-1 ">
              <span className="text-xs font-semibold">EGP</span>
              <span className="text-2xl font-bold">{product.price}</span>
            </div>

            <div className="ms-auto absolute right-[-200px] top-[40px]  group-hover:right-[20px] transition-all duration-500">

               <Button
                onClick={() => handleAddProductToCart(product._id)}
                className="cursor-pointer hover:bg-[#feba35] hover:text-black"
              >
                Add To Cart
                <ShoppingCart />
              </Button> 
              
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
