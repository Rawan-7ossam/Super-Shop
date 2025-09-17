"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { LoaderCircle, Lock, Mail, Phone, UserRound } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState(null); //عشان يطبع الايرور اللي هيظهر عندي من ال api
  const [btnIsLoading, setBtnIsLoading] = useState(true);
  const router = useRouter();
  interface Inputs {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
  }
  const schema = z.object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "not less than 3 chars"),
    email: z.string().nonempty("Email is required").email("Email not valid"),
    password: z
      .string()
      .nonempty("Password is required")
      .regex(/^[A-Z][a-z0-9]{3,9}/, "Password not valid"),
    rePassword: z
      .string()
      .nonempty("Password is required")
      .regex(/^[A-Z][a-z0-9]{3,9}/, "Password not valid"),
    phone: z.string().nonempty("Phone is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  async function onSubmit(values: Inputs) {
    console.log(values);
    setBtnIsLoading(false);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      console.log(response);
      setBtnIsLoading(true);
      if (response?.data?.message === "success") {
        router.push("/signin");
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
      <div className="text-center text-[#0f1118]">
        <h2 className="text-[20px] md:text-3xl  font-semibold tracking-wider my-3 ">
          Hello, Friend!
        </h2>
        <p className="text-sm">
          Enter your personal details and start journey with us
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && <p className="text-red-700">{errorMessage}</p>}
        <div className="relative">
          <UserRound className="absolute top-[10px] left-[10px] " size={20} />
          <Input
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your name"
            className="my-5  ps-9 py-5"
          />
        </div>

        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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

        <div className="relative">
          <Lock className="absolute top-[10px] left-[10px] " size={20} />
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
        <div className="relative">
          <Lock className="absolute top-[10px] left-[10px] " size={20} />
          <Input
            type="password"
            {...register("rePassword", { required: "rePassword is required" })}
            placeholder="Re-password"
            className="my-5  ps-9 py-5"
          />
        </div>

        {errors.rePassword && (
          <p className="text-red-500">{errors.rePassword?.message}</p>
        )}
        <div className="relative">
          <Phone className="absolute top-[10px] left-[10px] " size={20} />
          <Input
            type="text"
            {...register("phone", { required: "phone is required" })}
            placeholder="Enter your phone"
            className="my-5  ps-9 py-5"
          />
        </div>

        {errors.phone && (
          <p className="text-red-500">{errors.phone?.message}</p>
        )}
        {btnIsLoading ? (
          <Button type="submit" className="px-7 py-5 my-5 cursor-pointer  ">
            Register
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
