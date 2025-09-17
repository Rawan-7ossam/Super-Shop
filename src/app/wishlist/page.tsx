
import React from 'react'
import TableWishlist from "@/components/wishlist-comps/TableWishlist"

export default function WishlistPage() {
  return (
     <div className='container w-full mx-auto mt-25'>
            <h2 className='bg-white text-3xl font-semibold text-center py-10 tracking-wide'>Your Wish List</h2>
          <TableWishlist/>
        </div>
  )
}
