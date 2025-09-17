import React from 'react'
import { getBrands } from '../actions/brands.action'
import BrandGridSystem from '@/components/brands-comps/BrandGridSystem';

export default async function BrandsPage() {
    const result = await getBrands();
    const brands = result?.data ?? [];
   
    
  return (
    <div>
      <BrandGridSystem brands={brands}/>
    </div>
  )
}
