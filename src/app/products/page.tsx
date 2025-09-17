import React from 'react'
import { getProducts } from '../actions/products.action';
import ProductsGridSystem from '@/components/products-comps/ProductsGridSystem';



export default async function ProductPage() {
    const result = await getProducts();
    const products = result?.data ?? [];
  return (
    <div >
      <ProductsGridSystem products={products}/>
    </div>
  )
}
