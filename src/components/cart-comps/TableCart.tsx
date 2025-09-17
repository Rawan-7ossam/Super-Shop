"use client";
import { Minus, Plus,  X } from "lucide-react";
import Image from "next/image";

import { Button } from "../ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCart } from "@/app/context/CartProvider";
import { clearUserCart, removeProductfromCart, updateProductfromCart } from "@/app/actions/cart.action";
import toast from "react-hot-toast";
import Link from "next/link";


export default function TableCart() {

  const { myContext , getCartInfo } = useCart();

  async function handleRemoveFromCart(productId : string){
    const response = await removeProductfromCart(productId)
    console.log(response , "remove from cart");
    toast.success("Product removed successfully from your cart")
    await getCartInfo()
    
    
  }

   async function handleUpdateFromCart(productId : string , count:number){
    const response = await updateProductfromCart(productId , count)
    console.log(response , "update from cart");
    toast.success("Product updated successfully")
    await getCartInfo()
    
  }

   async function handleClearCart(){
    const response = await clearUserCart()
    console.log(response , "clear from cart");
    toast.success("Product cleared successfully")
    await getCartInfo()
    
  }
  return (
    <>
    {myContext ? <div className="my-10 flex flex-col lg:flex-row gap-2 justify-center w-[80%] container mx-auto">
      <div className=" w-full lg:w-[70%] mx-auto rounded-2xl">
        <Table className="rounded-2xl">
          <TableHeader>
            <TableRow className="bg-red-400 hover:bg-red-400">
              <TableHead className="ps-10 font-semibold ">Product</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-center">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myContext?.data.products.map((product) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium flex flex-row items-center gap-3">
                  <button onClick={()=>handleRemoveFromCart(product.product._id)} className="cursor-pointer">
                    {" "}
                    <X />
                  </button>
                  <div className="relative rounded-2xl w-[120px] h-[120px] border-1">
                    <Image
                      src={product.product.imageCover}
                      alt="imagecart"
                      fill
                      loading="eager"
                      priority
                      sizes="(max-width:768px) 100vw (max-width:1200px) 50vw"
                      className="rounded-2xl"
                    />
                  </div>
                  <p>
                    {product.product.title.split(" ").slice(0, 2).join(" ")}
                  </p>
                </TableCell>
                <TableCell>{product.price} EGP</TableCell>
                <TableCell>
                  <div className="flex flex-row border-2 py-2 text-center justify-evenly items-center rounded-full">
                    <button onClick={()=>handleUpdateFromCart(product.product._id , product.count-1)} className="border-r-2 cursor-pointer">
                      <Minus size={20} className="mx-3 lg:me-3" />
                    </button>
                    <div className="mx-2">
                      <p>{product.count}</p>
                    </div>
                    <button onClick={()=>handleUpdateFromCart(product.product._id , product.count+1)} className="border-l-2 cursor-pointer">
                      <Plus size={20} className="mx-3 lg:ms-3" />
                    </button>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {product.price * product.count} EGP
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
         <hr className="mt-5 border-gray-300 w-full mx-auto" />
        <div className="mx-auto flex justify-center items-center my-5">
             <Button onClick={()=>handleClearCart()} className="cursor-pointer rounded-full hover:bg-[#feba35] hover:text-black transition-all duration-300">Clear Your Cart</Button>
        </div>
       
       
      </div>

      <div className=" rounded-2xl border-2 shadow-lg p-5 h-[400px]">
        <h2 className="font-semibold  text-lg">Order Summary</h2>
        <hr className=" my-3 border-gray-300 w-[98%] mx-auto" />
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-3  text-sm">
            <p>items</p>
            <p>Sub Total</p>
            <p>Shipping</p>
            <p>Taxes</p>
            <p>Coupon Discount</p>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <p>{myContext?.numOfCartItems}</p>
            <p>{myContext?.data?.totalCartPrice}</p>
            <p>00</p>
            <p>00</p>
            <p>00</p>
          </div>
        </div>
        <hr className="mb-5 mt-3 border-gray-300 w-[98%] mx-auto" />
        <div className="flex flex-row justify-between">
          <p>Total</p>
          <p>{myContext?.data?.totalCartPrice}</p>
        </div>
        <Button className=" mx-auto flex mt-10 rounded-full cursor-pointer hover:bg-[#feba35] hover:text-black transition-all duration-300">
          <Link href="/checkout">
            Proceed to Checkout
          </Link>
          
        </Button>
      </div>
    </div> :<h2 className="text-center text-3xl">YOUR CART IS EMPTY</h2>
            
           
        
       }
    
    
    </>
  );
}
