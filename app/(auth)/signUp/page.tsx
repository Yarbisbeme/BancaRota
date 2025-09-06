import AuthForm from '@/components/auth/AuthForm'
import Image from 'next/image'
import React from 'react'

const SignUp = () => {
  return (
    <section className="flex min-h-screen">
      
      {/* Lado izquierdo: formulario scrollable */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="w-full max-w-md mx-auto top-0">
          <AuthForm type="sign-up" />
        </div>
      </div>

      {/* Lado derecho: imagen fija */}
      <div className="hidden md:block md:w-1/2 relative">
        <div className="sticky top-0 h-screen flex justify-center items-center bg-blue-50">
          <Image
            src="/icons/logoY.svg" // reemplaza con tu ilustración
            alt="Banking Illustration"
            width={400}
            height={400}
            className="object-contain"
          />
          {/* Overlay opcional */}
          <div className="absolute inset-0 bg-blue-50 opacity-30 z-0"></div>
        </div>
      </div>

    </section>
  )
}

export default SignUp
