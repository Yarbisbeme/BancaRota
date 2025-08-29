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
import { useRouter } from 'next/navigation'
import { signUp } from '@/lib/actions/user.actions'


const AuthForm = ({ type }: { type: string }) => {

  const router = useRouter();
  const [user, setUser] = useState(null)
  const values = (
    type === 'sign-in'
      ? { email: '', password: '' }
      : {
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          state: '',
          postalCode: '',
          dob: '',
          SSN: '',
          email: '',
          password: '',
        }
    )
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = AuthFormSchema(type as 'sign-in' | 'sign-up');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: values
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {

      if ( type === 'sign-in' ) {
        {/** 
        const response = await signIn({
          email: data.email,
          password: data.password
        })
        if (response) router.push('/');
        */}
      }

      if ( type === 'sign-up' ) {
        const newUser = await signUp(data);
        setUser(newUser);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
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
