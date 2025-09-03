import AuthForm from '@/components/auth/AuthForm'
import { signIn, signUp } from '../../../lib/Actions'

export default function LoginPage() {
  return (
    <section className='flex-center size-full max-sm:px-6'>
      <AuthForm type="sign-in"/>
    </section>
  )
}