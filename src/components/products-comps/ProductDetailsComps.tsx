"use client";
import { ProductDetails } from "@/app/types/productDetails.model";
import React, { useState } from "react";
import { StarRating } from "react-flexible-star-rating";
import { Button } from "../ui/button";
import {  Heart } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from "next/image";
import { useCart } from "@/app/context/CartProvider";
import { addProductToCart } from "@/app/actions/cart.action";
import toast from "react-hot-toast";
import { addProductToWishlist, removeProductfromWishlist } from "@/app/actions/wishlist.action";
import { useWishlist } from "@/app/context/WishlistProvider";

export default function ProductDetailsComps({
  productDetails,
}: {
  productDetails: ProductDetails;
}) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
//   console.log(productDetails, "details");
const { getWishlistInfo , myWishlistContext} = useWishlist();
const {getCartInfo} = useCart()
   const isFavorite = myWishlistContext?.data?.some(
  (item: WishlistItem) => item._id === productDetails._id
);


    async function handleAddProductToCart(productId : string){
        const response = await addProductToCart(productId)
        console.log(response);
        toast.success(response?.message)
        await getCartInfo()

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
    <div className="flex flex-col xl:flex-row justify-center mt-20 items-center gap-8">
      <div className="w-full xl:w-1/4">

         <Swiper
         
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {productDetails.images.map((src , index)=>(<>
        
         <SwiperSlide key={index}>
         <div className="relative w-full h-[500px]">
                <Image src={src} alt="slider image" fill
                    priority
                    loading="eager"
                    sizes="(max-width:768px) 100vw (max-width:1200px) 50vw , 25vw" className="object-cover" />
         </div>
        </SwiperSlide>
        
        </>))}
       
        
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={2}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >

        {productDetails.images.map((src , index)=>(<>
        
        <SwiperSlide key={index}>
         <div className="relative w-full  h-[80px]">
                <Image src={src} alt="slider image" fill
                    priority
                    loading="eager"
                    sizes="(max-width:768px) 100vw (max-width:1200px) 50vw , 25vw" className="object-cover"/>
         </div>
        </SwiperSlide>
        
        
        </>))}
        
      </Swiper>
      
      
      
      </div>
      <div className="w-full md:w-1/2 px-2 md:px-0 pb-3 md:pb-0">
        <h2 className="text-3xl font-bold">
          {productDetails.title}({productDetails.brand.name})
        </h2>
        <div className="flex gap-2">
          <p>{Math.floor(productDetails.ratingsAverage)} </p>
          <StarRating
            initialRating={Math.floor(productDetails.ratingsAverage)}
            dimension={6}
          />
          <p className="text-red-500">
            {productDetails.ratingsQuantity} raitings
          </p>
        </div>
        <hr className="my-4 border-gray-300" />
        <p className="text-slate-600 text-xl">
          Price:
          <span className="text-2xl text-[#2162a1] font-semibold ms-2">
            {productDetails.price} EGP
          </span>
        </p>
        <hr className="my-4 border-gray-300" />
        <p className="text-2xl text-[#333333] font-semibold mb-2">
          Category Name
        </p>
        <p className="text-[#333333] text-lg">{productDetails.category.name}</p>
        <hr className="my-4 border-gray-300" />
        <p className="text-2xl text-[#333333] font-semibold mb-2">
          Product description
        </p>
        <p className="text-[#333333] text-sm">{productDetails.description}</p>
        <hr className="my-5 border-gray-300" />
        <p className="mb-4">To buy,</p>
        <div className="flex justify-center items-center gap-2">
             <Button onClick={()=>handleAddProductToCart(productDetails._id)} className="cursor-pointer w-[50%]  flex py-6 rounded-full">
               
                   <span className="text-lg"> + </span>Add To Cart
                
       
        </Button>
         <Button onClick={() => handleToggleWishlist(productDetails._id)} className="cursor-pointer  px-5 py-5 rounded-full bg-transparent text-black border-2 hover:bg-slate-200">
            <Heart size={50} className={` ${isFavorite ? "text-red-500" : ""}`}  />
        </Button>
         
                
        </div>
       
      </div>
    </div>
  );
}
