import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const LogoHorizon = () => {
  return (
    <Link href={'/'} className="cursor-pointer flex items-center gap-1">
        <Image 
            src={'/icons/logo.svg'} 
            alt="Logo" 
            width={32} 
            height={32} 
            className='max-lg:size-8'
        />
        <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
    </Link>
  )
}

export default LogoHorizon