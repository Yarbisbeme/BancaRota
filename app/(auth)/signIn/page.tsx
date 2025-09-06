'use client'

import AuthForm from '@/components/auth/AuthForm'
import Image from 'next/image'

const SignInPage = () => {
  return (
    <section className="flex min-h-screen h-screen">
      
      <div className="hidden md:flex w-1/2 bg-blue-50 justify-center items-center relative">
        {/* Imagen o ilustración */}
        <Image
          src="/icons/logoY.svg" // reemplaza con tu SVG o PNG
          alt="Banking Illustration"
          width={400}
          height={400}
          className="object-contain"
        />
        
        <div className="absolute inset-0 bg-blue-50 opacity-30"></div>
      </div>

      <div className="flex-1 flex justify-center items-center p-6">
        <div className="w-full max-w-md">
          <AuthForm type="sign-in"/>
        </div>
      </div>

    </section>
  )
}

export default SignInPage
