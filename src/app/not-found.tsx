import { CircleQuestionMark, FastForward } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function NotFoundPage() {
  return (
    <div className='mt-20 md:mt-[120px] container mx-auto flex flex-col md:flex-row gap-3 justify-center items-center h-auto'>
      <div>
         <CircleQuestionMark size={30}/>
      </div>
      <div>
        <h2 className='text-red-600 text-2xl font-semibold'>Looking for something?</h2>
      <p className='text-[20px]'>We are sorry. The Web address you entered is not a functioning page on our site</p>
      <p className='font-bold mt-5 text-[20px]'><FastForward className='inline text-red-500' size={15}/> Go to supershop <Link href="/" className='underline underline-offset-1 text-yellow-600 '>Home</Link> page</p>
      </div>
    </div>
  )
}
