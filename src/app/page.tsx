import MainSlider from "@/components/slider-comps/MainSlider";
import { getCategories } from "./actions/categories.action";
import CategoriesSliderComps from "@/components/slider-comps/CategoriesSliderComps";
import { getProducts } from "./actions/products.action";
import ProductsGridSystem from "@/components/products-comps/ProductsGridSystem";
import { HeartHandshake } from "lucide-react";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/route";



export default async function Home() {
  //session in server component
  const session = await getServerSession(options);
  console.log(session ,"session")

  const response = await getCategories();
    console.log(response?.data, "data");

    const data = response?.data
    const productsResponse = await getProducts();
    const products = productsResponse?.data;

    
    
    
  return (
    <div className="mt-20">
    
      <div className="flex flex-col lg:flex-row justify-center items-center ">
      <div className="w-full lg:w-1/4 ms-10 text-center mt-5 ">
          <p className="text-2xl lg:text-5xl font-semibold ">Discover a story that might change your day <span> <HeartHandshake className="inline text-red-500" size={40}/></span></p>
      </div>
       <MainSlider/>
    </div>
    <hr className=" mt-8 mb-8 border-gray-300 w-[75%] mx-auto" />
    <CategoriesSliderComps category={data}/>
    <hr className="mt-8 border-gray-300 w-[75%] mx-auto" />
    <ProductsGridSystem products={products}/>
    </div>
  
   
  );
}
