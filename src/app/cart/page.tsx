import TableCart from '@/components/cart-comps/TableCart'
import React from 'react'



export default async function CartPage() {
  
  return (
    <div className='container w-full mx-auto mt-25'>
        <h2 className='bg-white text-3xl font-semibold text-center py-10 tracking-wide'>Your Shopping Cart</h2>
      <TableCart/>
    </div>
  )
}
