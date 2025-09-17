import { Brands } from '@/app/types/brands.model'
import React from 'react'
import BrandCard from './BrandCard'

export default function BrandGridSystem({brands}:{brands:Brands[]}) {
  return (
     <div className="container mx-auto mt-20 px-8">
            <h2 className="text-center text-3xl font-bold underline underline-offset-2"><span className="text-red-500 text-5xl">O</span>ur Brands</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-8">
           {brands.map((brand)=><BrandCard key={brand._id} brand={brand}/>)}
          </div>
        </div>
  )
}
