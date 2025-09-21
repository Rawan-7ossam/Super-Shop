"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, LoaderCircle, Lock, Mail } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [btnLoading, setBtnLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null); //عشان يطبع الايرور اللي هيظهر عندي من ال api
  const router = useRouter();
  interface Inputs {
    email: string;
    newPassword: string;
  }
  const schema = z.object({
    email: z.string().nonempty("Email is required").email("Email not valid"),
    newPassword: z
      .string()
      .nonempty("Password is required")
      .regex(/^[A-Z][a-z0-9]{3,9}$/, "Password not valid"),
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
    setBtnLoading(false);

    try {
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      console.log(response);

      setBtnLoading(true);
      if (response) {
        toast.success("You are successfully reset your password");
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
         Reset Your Password
        </h2>
        <p className="text-sm">
          Please kindly set your new password
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && <p className="text-red-700">{errorMessage}</p>}
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
            type={showPassword ? "text" : "password"}
            {...register("newPassword", { required: "Password is required" })}
            placeholder="Enter your new password"
            className="my-5  ps-9 py-5"
          />
          <button
            onClick={() => setShowPassword((prev) => !prev)}
            className="cursor-pointer absolute right-2 top-2"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        <div className=" text-sm text-gray-600 border-1 rounded-2xl p-5">
          <p className="font-semibold mb-1">Your password must:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Start with an uppercase letter (A–Z)</li>
            <li>
              Contain only lowercase letters or digits after the first character
            </li>
            <li>Be 4–10 characters long</li>
          </ul>
        </div>

        {errors.newPassword && (
          <p className="text-red-500">{errors.newPassword?.message}</p>
        )}
        {btnLoading ? (
          <Button type="submit" className="px-7 py-5 my-5 cursor-pointer  ">
            Reset Password
          </Button>
        ) : (
          <Button type="button" className="px-7 py-5 my-5 cursor-pointer  ">
            <LoaderCircle className="inline animate-spin" />
            loading...
          </Button>
        )}
      </form>
    </div>
  );
}
