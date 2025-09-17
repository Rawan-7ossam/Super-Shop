"use client";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import moment from 'moment';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useWishlist } from "@/app/context/WishlistProvider";
import { addProductToCart } from "@/app/actions/cart.action";
import toast from "react-hot-toast";
import { useCart } from "@/app/context/CartProvider";
import { removeProductfromWishlist } from "@/app/actions/wishlist.action";



export default function WishlistCard() {

  const { myWishlistContext, getWishlistInfo } = useWishlist();
   moment();
  const {getCartInfo} = useCart()


   async function handleAddProductToCart(productId : string){
        const response = await addProductToCart(productId)
        console.log(response);
        toast.success(response?.message)
        await getCartInfo()

    }


    async function handleRemoveFromWishlist(productId : string){
    const response = await removeProductfromWishlist(productId)
    console.log(response , "remove from wishlist");
    toast.success("Product removed successfully from your wishlist")
    await getWishlistInfo()
    }
  return (
 <div className="my-10 w-[90%] container mx-auto">
      <div className=" w-full lg:w-[70%] mx-auto rounded-2xl">
        <Table className="rounded-2xl">
          <TableHeader>
            <TableRow className="bg-red-400 hover:bg-red-400">
              <TableHead className="ps-10 font-semibold ">Product</TableHead>
              <TableHead >Price</TableHead>
              <TableHead >Date To Added</TableHead>
               <TableHead >Add To Cart</TableHead>
            </TableRow>
          </TableHeader>
           <TableBody>
             
            {myWishlistContext?.data?.map((wishlist)=> <TableRow  key={wishlist?.id}>
                <TableCell className="font-medium flex flex-row items-center gap-3">
                  <button onClick={()=>handleRemoveFromWishlist(wishlist.id)} className="cursor-pointer">
                    {" "}
                    <X />
                  </button>
                  <div className="relative rounded-2xl w-[120px] h-[120px] border-1">
                    <Image
                      src={wishlist.imageCover}
                      alt="imagecart"
                      fill
                      loading="eager"
                      priority
                      sizes="(max-width:768px) 100vw (max-width:1200px) 50vw"
                      className="rounded-2xl"
                    />
                  </div>
                  <p>
                    {wishlist.title.split(" ").slice(0,2).join(" ")}
                  </p>
                </TableCell>
                <TableCell>{wishlist.price} EGP</TableCell>
                <TableCell>{moment(wishlist.updatedAt).calendar()}</TableCell>
                <TableCell>
                  <Button onClick={()=>handleAddProductToCart(wishlist.id)} className="cursor-pointer rounded-full hover:bg-[#feba35] hover:text-black transition-all duration-300">Add to Cart</Button>
                </TableCell>
                  
              </TableRow>)}
            
          </TableBody>
          
        </Table>
         <hr className="mt-5 border-gray-300 w-full mx-auto" />
        {/* <div className="mx-auto flex justify-center items-center my-5">
             <Button className="cursor-pointer rounded-full hover:bg-[#feba35] hover:text-black transition-all duration-300">Clear Your Cart</Button>
        </div> */}
       
       
      </div>

     
    </div>
  
  )
}
