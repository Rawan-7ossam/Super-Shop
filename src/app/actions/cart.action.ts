"use server";

import { getUserToken } from "@/lib/tokenutils";
import axios from "axios";


async function getUserCart() {
  try {
    const token = await getUserToken();
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
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

async function addProductToCart(productId : string) {
  try {
    const token = await getUserToken();
    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",{productId},
      {
        headers: {
          token: token as string,
        },
      }
    );
    console.log(response , "add to cart");
    
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

async function removeProductfromCart(productId : string) {
  try {
    const token = await getUserToken();
    const response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        headers: {
          token: token as string,
        },
      }
    );
    console.log(response , "remove from cart");
    
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

async function updateProductfromCart(productId : string , count:number) {
  try {
    const token = await getUserToken();
    const response = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {count},
      {
        headers: {
          token: token as string,
        },
      }
    );
    console.log(response , "update from cart");
    
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

async function clearUserCart() {
  try {
    const token = await getUserToken();
    const response = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart",
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

export { getUserCart , addProductToCart , removeProductfromCart , updateProductfromCart , clearUserCart};
