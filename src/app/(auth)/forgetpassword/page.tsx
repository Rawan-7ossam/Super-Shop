"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { LoaderCircle, Mail} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ForgetPasswordPage() {
  const route = useRouter();
  const [btnIsLoading, setBtnIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  interface Inputs {
    email: string;
  }

  async function onSubmit(values: Inputs) {
    console.log(values);
    setBtnIsLoading(false);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      setBtnIsLoading(true);
      //  if(response?.statusMsg === "success")
      if (response?.statusText === "success") {
        route.push("/resetcode");
      }
      setErrorMessage(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);
        setErrorMessage(error.response?.data.message);
      }
    }
  }
  return (
    <div className=" w-[90%] md:w-1/2 mx-auto my-30 border-2 p-5 shadow-lg ">
      <div>
        <h2 className="text-[20px] md:text-3xl text-[#0f1118] font-semibold tracking-wider my-3 text-center">
          Mail Address Here
        </h2>
        <p className="text-sm text-[#0f1118] text-center">
          Enter the email address associated with your account{" "}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <Mail className="absolute top-[10px] left-[10px] " size={20} />
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

        {errorMessage && <p className="text-red-700">{errorMessage}</p>}
        {btnIsLoading ? (
          <Button type="submit" className="px-7 py-5 my-5 cursor-pointer  ">
            Recover Password
          </Button>
        ) : (
          <Button type="submit" className="px-7 py-5 my-5 cursor-pointer  ">
            <LoaderCircle className="inline animate-spin" />
            loading...
          </Button>
        )}
      </form>
    </div>
  );
}
