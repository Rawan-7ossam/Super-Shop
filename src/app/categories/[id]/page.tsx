import { getCategoriesDetails } from '@/app/actions/categories.action'
import React from 'react'

export default async function CategoriesDetails({params}:{params:{id:string}}) {
    
    
    const {id} = params;
    
    const result = await getCategoriesDetails(id);
    const categoryDetails = result?.data;
    console.log(categoryDetails , "category details");
    
  return (
    <div>
      
    </div>
  )
}
