"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { LoaderCircle, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignInPage() {

     const [errorMessage, setErrorMessage] = useState<string | null>(null) //عشان يطبع الايرور اللي هيظهر عندي من ال api
     const [btnIsLoading , setBtnIsLoading] = useState(true)
        const router = useRouter()

      interface Inputs {
       
        email: string;
        password: string;
        
      }


      const schema = z.object({
          email: z.string().nonempty("Email is required").email("Email not valid"),
          password: z.string().nonempty("Password is required").regex(/^[A-Z][a-z0-9]{3,9}/ , "Password not valid"),
          
        })

        const {
            register,
            handleSubmit,
            formState: { errors },
          } = useForm<Inputs>({
            resolver:zodResolver(schema)
          });
 async function onSubmit(values: Inputs) {
    console.log(values);
    setBtnIsLoading(false)
    setErrorMessage(null)
    
try {
    // Use NextAuth redirect flow so a new request is made and middleware sees the cookie
    await signIn("credentials" , {
        email:values.email,
        password:values.password,
        redirect:true,
        callbackUrl:"/",
    })
    // If signIn does not redirect (e.g., unexpected), restore button state
    setBtnIsLoading(true)
    
} catch (error) {
    console.log(error);
    setErrorMessage("Invalid email or password")
    setBtnIsLoading(true)
    
}
    
  }
  return (
     <div className=" w-[90%] md:w-1/2 mx-auto my-30 border-2 p-5 shadow-lg ">
        <div>
             <h2 className="text-[20px] md:text-3xl text-[#0f1118] font-semibold tracking-wider my-3 text-center">
            Welcome Back!

          </h2>
          <p className="text-sm text-[#0f1118] text-center">To keep conected with us please login with your personal info</p>
        </div>
         
          <form onSubmit={handleSubmit(onSubmit)}>
            {errorMessage && <p className="text-red-700">{errorMessage}</p>}
            <div className="relative">
                <Mail className="absolute top-[10px] left-[10px] " size={20}/>
                <Input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="my-5  ps-9 py-5"
            />
            </div>
            
            {errors.email && (
              <p className="text-red-500">{errors.email?.message}</p>
            )}
    
            <div className="relative">
                 <Lock className="absolute top-[10px] left-[10px] " size={20}/>
                <Input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
              className="my-5  ps-9 py-5"
            />
            </div>
            
            {errors.password && (
              <p className="text-red-500">{errors.password?.message}</p>
            )}
            
           <div className="flex justify-end text-bold">
            <Link href="/forgetpassword">Forget Password?</Link>
           </div>

            {btnIsLoading ? <Button
              type="submit"
              className="px-7 py-5 my-5 cursor-pointer  "
            >
              Sign In
            </Button> : <Button
              type="submit"
              className="px-7 py-5 my-5 cursor-pointer  "
            >
              <LoaderCircle className="inline animate-spin"/>loading...
            </Button>} 
           
            
            
          </form>
        </div>
  )
}
