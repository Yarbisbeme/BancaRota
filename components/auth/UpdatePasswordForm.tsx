'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LogoYBank } from '../LogoYBank'
import Message from '../Message'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

const supabase = createClient()

const UpdatePasswordForm = () => {
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (password.length >= 8 && password === repeatPassword) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [password, repeatPassword])

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    if (password !== repeatPassword) {
      setError('Las contraseñas no coinciden.')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) setError(error.message)
      else {
        setDisabled(true);
        setSuccess('Contraseña actualizada correctamente. Redirigiendo')
        await supabase.auth.signOut();
        setTimeout(() => {
          router.push('/signIn')}, 3000)
      }
    }  catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Ha ocurrido un error inesperado.')
        }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='auth-form'>
      <header className='flex flex-col items-center gap-5 mb-6'>
        <LogoYBank />
        <h1 className='text-2xl font-semibold text-gray-900'>Reset Your Password</h1>
        <p className='text-gray-600 text-center'>Enter your new password below.</p>
      </header>

      {error && <Message color='red' value={error} onClick={() => setError(null)} />}
      {success && <Message color='green' value={success} onClick={() => setSuccess(null)} />}

      <form onSubmit={handleUpdatePassword} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='password'>New Password</Label>
          <Input
            id='password'
            type='password'
            placeholder='••••••••'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='repeatPassword'>Repeat Password</Label>
          <Input
            id='repeatPassword'
            type='password'
            placeholder='••••••••'
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
        </div>

        <Button type='submit' className='mt-4 form-btn' disabled={disabled || isLoading}>
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin mr-2" />
              Updating...
            </>
          ) : (
            'Update Password'
          )}
        </Button>
      </form>


      <p className='text-gray-700 text-center mt-[12%]'>Already have an account?
        <Link
          href={'/signIn'}
          className='form-link'
        >
          &nbsp;Sign In
        </Link>
      </p>
    </section>
  )
}

export default UpdatePasswordForm
