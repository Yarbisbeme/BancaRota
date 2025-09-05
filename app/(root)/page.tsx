import { LogoutButton } from '@/components/auth/SignOutBtn'
import { LogoYBank } from '@/components/LogoYBank'
import { getUser } from '@/lib/Actions'

export default async function Home() {
  // Trae al usuario desde la DB (servidor)
  const user = await getUser()

  return (
    <section className='w-full flex-col mt-4 space-y-6 p-8'>
      <LogoYBank />
      <p>Hello {user.firstName} {user.lastName}</p>
      <p>Vives en {user.address}</p>
      <LogoutButton />
    </section>
  )
}
