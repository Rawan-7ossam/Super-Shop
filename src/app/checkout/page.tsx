"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartProvider";
import { getCashPayment, getOnlinePayment } from "../actions/payment.action";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";


export default  function CheckoutPage() {
    const [errorMessage] = useState(null) //عشان يطبع الايرور اللي هيظهر عندي من ال api
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "online" | null >(null)
    const router = useRouter()
    const {myContext , setMyContext} = useCart()
    // console.log(myContext , "cart details");
    const cartId = myContext?.cartId
    
  interface Inputs {
    details: string;
    phone: string;
    city: string;
  }
//   let schema = z.object({
//     name: z.string().nonempty("Name is required").min(3 , "not less than 3 chars") ,
//     email: z.string().nonempty("Email is required").email("Email not valid"),
//     password: z.string().nonempty("Password is required").regex(/^[A-Z][a-z0-9]{3,9}/ , "Password not valid"),
//     rePassword: z.string().nonempty("Password is required").regex(/^[A-Z][a-z0-9]{3,9}/ , "Password not valid"),
//     phone:z.string().nonempty("Phone is required")
//   })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
 async function onSubmit(values: Inputs) {
 
    if(paymentMethod == "cash"){
            try {
        const response = await getCashPayment(cartId as string, values)
        console.log(response);
        if(response?.data?.status == "success"){
            //set cart null
            setMyContext(null)
            // redirect to home
            router.push("/")
        }
        
    } catch (error) {
        console.log(error);
        
    }
    }else if(paymentMethod == "online"){
        //action call online
         try {
        const response = await getOnlinePayment(cartId as string, values)
        console.log(response);
        if(response?.data?.status === "success"){
            // //set cart null
            // setMyContext(null)
            // // redirect to home
            // router.push("/")
            window.location.href = response.data.session.url
        }
        
    } catch (error) {
        console.log(error);
        
    }
    }
    console.log(paymentMethod , "check out");

    
    
  }
  return (
    <div className=" w-[90%] md:w-1/2 mx-auto my-30 border-2 p-5 shadow-lg ">
        <div className="text-[#0f1118]">
      <p className="text-2xl">Enter your personal details for shipping address</p>
        </div>
     
      <form onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && <p className="text-red-700">{errorMessage}</p>}
             <Input
          type="text"
          {...register("details", { required: "details is required" })}
          placeholder='Enter your details'
          className="my-5  py-5"
        />
       
        {errors.details && <p className="text-red-500">{errors.details.message}</p>}

        <Input
          type="text"
          {...register("phone", { required: "phone is required" })}
          placeholder="Enter your phone"
          className="my-5 py-5"
        />
         
        {errors.phone && (
          <p className="text-red-500">{errors.phone?.message}</p>
        )}

         <Input
          type="text"
          {...register("city", { required: "city is required" })}
          placeholder="Enter your city"
          className="my-5 py-5"
        />
         
        {errors.city && (
          <p className="text-red-500">{errors.city?.message}</p>
        )}
        <RadioGroup onValueChange={(val)=>setPaymentMethod(val as "online" | "cash")} className="my-5">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="cash" id="cash" />
    <Label htmlFor="cash">Cash Payment</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="online" id="online" />
    <Label htmlFor="online">Online Payment</Label>
  </div>
</RadioGroup>
        <Button
          type="submit"
          className="px-7 py-5 my-5 cursor-pointer  "
        >
          CheckOut
        </Button>
      </form>
    </div>
  );
}

