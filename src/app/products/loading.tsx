import { Loader } from 'lucide-react'
import React from 'react'

export default function loading() {
  return (
   <div className='flex flex-col h-screen justify-center items-center'>
       <Loader size={50} className='animate-spin text-slate-400 mb-3' />
       <p className='text-sm text-slate-400'>please wait until loading content...</p>
    </div>
  )
}
