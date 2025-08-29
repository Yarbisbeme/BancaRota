// AuthForm.tsx
'use client'
import { useState } from 'react'
import LogoHorizon from '../LogoHorizon'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthFormSchema } from '@/lib/utils'
import { Form } from '../ui/form'
import z from 'zod'
import FormComponent from './FormComponent'
import Link from 'next/link'

type AuthFormValues = z.infer<typeof AuthFormSchema>

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: { email: '', password: '' }
  })

  const onSubmit = (values: AuthFormValues) => {
    setIsLoading(true)
    console.log(values)
    setIsLoading(false)
  }

  return <>

    <section className='auth-form'>
      <header className="flex flex-col gap-5 md:gap-8">
        <LogoHorizon/>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
            {user 
              ? 'Link Account'
              : type === 'sign-in' ? 'Sign In' : 'Sign Up'
            }
          </h1>
          <p className='text-16 font-normal text-gray-600'>
            {user 
              ? 'Link your account to continue'
              : 'Please enter your details below'
            }
          </p>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">{/** PlaidLink */}</div>
      ) : (
        <FormComponent 
          type={type as 'sign-in' | 'sign-up'}
          isLoading={isLoading}
          form={form}               
          onSubmit={onSubmit}       
        />
      )}
    </section>
  </>
  
}

export default AuthForm
