import { LogoutButton } from '@/components/auth/SignOutBtn'
import { LogoYBank } from '@/components/LogoYBank'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/signIn')
  }

  return <>
    <section className='w-full flex-col mt-4 space-y-6 p-8'>
      <LogoYBank />
      <p>Hello {data.user.email}</p>
      <LogoutButton />
    </section>
  </>
}