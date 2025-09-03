"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function VerifyEmailPage() {
  const [email, setEmail] = useState<string | undefined>(undefined)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        setEmail(user.email)

        // si ya confirmó, redirige al dashboard
        if (user.confirmed_at) {
          router.push("/dashboard")
        }
      } else {
        router.push("/signIn")
      }
    }

    checkUser()
  }, [router, supabase])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-bold mb-4">Confirma tu correo</h1>
      <p className="text-center max-w-md">
        Hemos enviado un enlace de confirmación a{" "}
        <span className="font-semibold">{email}</span>.  
        Por favor revisa tu bandeja de entrada (y carpeta de spam).  
        Una vez confirmado, podrás acceder a tu cuenta.
      </p>
    </div>
  )
}
