// SignInComponent.tsx
import React from 'react'
import CustomInput from './CustomInput'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { Form } from '../ui/form'
import { UseFormReturn } from 'react-hook-form'
import { AuthFormSchema } from '@/lib/utils'
import { z } from 'zod'
import Link from 'next/link'

const formSchema = AuthFormSchema('sign-in')
type AuthFormValues = z.infer<typeof formSchema>;

interface SignInComponentProps {
  type: 'sign-in' | 'sign-up'
  isLoading: boolean
  form: UseFormReturn<AuthFormValues>
  onSubmit: (values: AuthFormValues) => void
}

const FormComponent = ({ type, isLoading, form, onSubmit }: SignInComponentProps) => {
  return <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        {type === 'sign-in' ? (
          <>
            <CustomInput
              name='email'
              label='Email'
              type='text'
              placeholder='Enter your email'
              control={form.control}
            />
            <CustomInput
              name='password'
              label='Password'
              type='password'
              placeholder='Enter your Password'
              control={form.control}
            />
          </>
        ) : (
          <>
            <div className="flex gap-4">
              <CustomInput
                name='firstName'
                label='First Name'
                type='text'
                placeholder='Enter your First Name'
                control={form.control}
              />
              <CustomInput
                name='lastName'
                label='Last Name'
                type='text'
                placeholder='Enter your Last Name'
                control={form.control}
              />
            </div>
            <CustomInput
              name='city'
              label='City'
              type='text'
              placeholder='Enter your city'
              control={form.control}
            />
            <CustomInput
              name='address'
              label='Address'
              type='text'
              placeholder='Enter your Specific Address'
              control={form.control}
            />
            <div className="flex gap-4">
              <CustomInput
                name='state'
                label='State'
                type='text'
                placeholder='Ex: San Cristobal'
                control={form.control}
              />
              <CustomInput
                name='postalCode'
                label='Postal Code'
                type='text'
                placeholder='Ex: 91001'
                control={form.control}
              />
            </div>
            <div className="flex gap-4">
              <CustomInput
                name='dob'
                label='date of Birthday'
                type='text'
                placeholder='yyyy-mm-dd'
                control={form.control}
              />
              <CustomInput
                name='SSN'
                label='SSN'
                type='text'
                placeholder='Enter your Username'
                control={form.control}
              />
            </div>
              <CustomInput
                name='email'
                label='Email'
                type='text'
                placeholder='Example@email.com'
                control={form.control}
              />
              <CustomInput
                name='password'
                label='Password'
                type='password'
                placeholder='Enter your PassWord'
                control={form.control}
              />
            <div className="flex gap-4">
            </div>
          </>
        )}

        <Button type='submit' className='form-btn' disabled={isLoading}>
          {isLoading ? <><Loader2 size={20} className='animate-spin' /> Loading...</> 
                     : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>
    </Form>
    <footer>
        {
          type === 'sign-in' ? 
          <div className='flex gap-2 flex-center'>
            <p>Don't Have an account</p>
            <Link
              href={'/signUp'}
              className='form-link'
            >
              Sign-Up
            </Link>
          </div>:
          <div className='flex gap-2 flex-center'>
            <p>Have an account?</p>
            <Link
              href={'/sign-in'}
              className='form-link'
            >
              Sign-In
            </Link>
          </div>
        }
      </footer>
  </>
}

export default FormComponent
