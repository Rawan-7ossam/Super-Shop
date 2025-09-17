import { Categories } from '@/app/types/category.model'
import React from 'react'
import {
  Card,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import Image from 'next/image';
import Link from 'next/link';

export default function CategoriesCard({category}:{category:Categories}) {
    console.log(category);
    
  return (
    <div className='container mx-auto '>
      <Link href={`/categories/${category._id}`}>
      
      <Card className='cursor-pointer group overflow-hidden hover:shadow-2xl pb-8 md:hover:scale-110 transition-all duration-300'>
  <CardHeader>
    <div className='relative w-full h-[300px] shadow-xl rounded-2xl border-1 border-black overflow-hidden'>
        <Image src={category.image} alt='category-image' fill priority loading='eager' sizes='(max-width:768px) 100vw (max-width:1200px) 50vw , 25vw' className="rounded-2xl "/>
    </div>
   
  </CardHeader>
  <CardFooter className='justify-center bg-slate-300 py-4 shadow-lg'>
    <p className='text-center font-bold text-2xl'>{category.name}</p>
  </CardFooter>
</Card>
      </Link>
    </div>
  )
}
