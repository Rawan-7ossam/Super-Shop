"use server";


import axios from "axios";


async function getCategories() {
 

  try {
     const response = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );
    return {
      data: response?.data.data,
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

async function getCategoriesDetails(id:string) {
  

  try {
    const response = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}`
  );
    return {
      data: response?.data.data,
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

export { getCategories , getCategoriesDetails };
