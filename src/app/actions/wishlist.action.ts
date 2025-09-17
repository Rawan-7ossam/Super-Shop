"use server";

import { getUserToken } from "@/lib/tokenutils";
import axios from "axios";
import { revalidatePath } from "next/cache";

async function getUserWishlist() {
  try {
    const token = await getUserToken();
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token: token as string,
        },
      }
    );
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

async function addProductToWishlist(productId : string) {
  try {
    const token = await getUserToken()
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",{productId},
      {
        headers: {
          token: token as string,
        },
      }
    );
    console.log(response , "add to wishlist");
    revalidatePath('/wishlist');
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


async function removeProductfromWishlist(productId : string) {
  try {
    const token = await getUserToken();
    const response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        headers: {
          token: token as string,
        },
      }
    );
    console.log(response , "remove from wishlist");
    
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

export{ addProductToWishlist , getUserWishlist , removeProductfromWishlist}