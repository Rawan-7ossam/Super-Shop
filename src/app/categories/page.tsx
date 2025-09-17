import React from 'react'
import { getCategories } from '../actions/categories.action'
import CategoriesGridSystem from '@/components/categories-comps/CategoriesGridSystem'

export default async function CategoriesPage() {
    const result = await getCategories();
    const categories = result?.data ?? [];
    
    
  return (
    <div >
      <CategoriesGridSystem categories={categories}/>
    </div>
  )
}
