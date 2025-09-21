
"use server";

import { getUserToken } from "@/lib/tokenutils";
import axios from "axios";


interface ShippingAddressTypes{
    details:string,
       phone:string,
        city: string
}

async function getCashPayment(cartId : string , values: ShippingAddressTypes) {
  try {
    const token = await getUserToken();
    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{shippingAddress : values},
      {
        headers: {
          token: token as string,
        },
      }
    );
    console.log(response?.data , "check payment");
    
    return {
      data: response?.data,
      status: response?.status,
      message: response?.data.message,
      
    };
    
    
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        data: [],
        status: error?.response?.status,
        message: error?.response?.data.message || "An Error Occured",
      };
    }
  }
}

async function getOnlinePayment(cartId : string ,  values: ShippingAddressTypes) {
  try {
    const token = await getUserToken();

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${baseUrl}`,{shippingAddress : values},
      {
        headers: {
          token: token as string,
        },
      }
    );
    console.log(response?.data , "check payment");
    
    return {
      data: response?.data,
      status: response?.status,
      message: response?.data.message,
      
    };
    
    
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        data: [],
        status: error?.response?.status,
        message: error?.response?.data.message || "An Error Occured",
      };
    }
  }
}

export{getCashPayment , getOnlinePayment}