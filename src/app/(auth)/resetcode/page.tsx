"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";

import axios from "axios";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"




export default function ResetCodePage() {
    const route = useRouter()
    const [errorMessage, setErrorMessage] = useState(null) 
    const {
        handleSubmit,
    control,
        formState: { errors },
      } = useForm<Inputs>();

      interface Inputs {
        resetCode: string;  
      }



       async function onSubmit(values: Inputs) {
            console.log(values);
            try {
     const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode" , values)
    if(response){
            route.push("/resetpassword")
    }
    setErrorMessage(null)
   } catch (error : unknown) {
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
           setErrorMessage(error.response?.data.message)
            
            
        }
   }
       }
  return (

   <div className="w-[90%] md:w-1/2 mx-auto my-30 border-2 p-5 shadow-lg">
      <div>
        <h2 className="text-[20px] md:text-3xl text-[#0f1118] font-semibold tracking-wider my-3 text-center">
          Verify Reset Code
        </h2>
        <p className="text-sm text-[#0f1118] text-center">Enter the verification code sent to your email.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center my-5">
          <Controller
            name="resetCode"
            control={control}
            defaultValue=""
            rules={{ required: "Code is required" }}
            render={({ field }) => (
              <InputOTP maxLength={6} {...field}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
        </div>

        {errors.resetCode && (
          <p className="text-red-500 text-center">{errors.resetCode?.message}</p>
        )}

        {errorMessage && <p className="text-red-700 text-center">{errorMessage}</p>}

        <Button type="submit" className="w-full px-7 py-5 my-5 cursor-pointer">
          Verify Code
        </Button>
      </form>
    </div>
  )
}
