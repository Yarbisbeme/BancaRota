import Logo from "@/components/Logo";

export default function VerifyEmailPage() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <Logo fill="#194185"/>
      <h1 className="text-2xl font-bold mb-4 mt-4">Confirma tu correo</h1>
      <p className="text-center max-w-md">
        Hemos enviado un enlace de confirmación a tu correo  
        Por favor revisa tu bandeja de entrada (y carpeta de spam).  
        Una vez confirmado, podrás acceder a tu cuenta.
      </p>
    </div>
  )
}
