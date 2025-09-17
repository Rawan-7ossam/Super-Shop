import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function AllOrdersPage() {
  return (
    <div className='text-center text-3xl mt-[120px] mx-auto'>
      <h2 className='text-green-400 font-bold text-3xl tracking-wider'>Thank You !</h2>
      <div className='flex flex-col md:flex-row justify-center items-center md:gap-4'>
        <div className='p-4 bg-green-400 rounded-full flex justify-center mt-4 md:mt-0 items-center '>
          <Check className='inline text-white' />
        </div>
         <p>  Payment Done Successfully</p>
      </div>
     <div className='text-sm mt-4'>
       <p >
        Your plan has been upgraded to premium!
      </p>
      <p>
        Please check your email for a payment confirmation & invoice
      </p>
     </div>

     <Button className='mt-5 cursor-pointer'>
     <Link href="/"> Go To The Home Page</Link>
     </Button>


     
    </div>
  )
}
