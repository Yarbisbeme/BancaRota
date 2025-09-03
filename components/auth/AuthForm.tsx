'use client'

import { useEffect, useState } from "react";
import LogoHorizon from "../LogoHorizon";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { signIn, signUp } from "@/lib/Actions";
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useRouter } from "next/navigation";

interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

const AuthForm = ({ type }: AuthFormProps) => {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formSchema = authFormSchema(type)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: ""
    },
  })

  useEffect(() => {
    if (error) {
      form.reset()
      const timer = setTimeout(() => {
        setError(null)
         // limpia todos los inputs
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, form])

async function handleSignIn(values: z.infer<typeof formSchema>) {
  setIsLoading(true);
  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  const result = await signIn(formData);
  if (result?.success === false) {
    setError(result.message);
  }
  setIsLoading(false);
}

async function handleSignUp(values: z.infer<typeof formSchema>) {
  setIsLoading(true);
  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  const result = await signUp(formData);
  setIsLoading(false);

  if (result?.success) {
    setError(result.message);
    router.push('/verify-email')
  } else {
    setError(result.message);
  }
}


  return (
    
    <section className="auth-form">
      
      <header className="flex flex-col gap-5 md:gap-8">

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className="absolute top-4 z-50 w-[90%] max-w-md"
            >
              <div className="flex items-center justify-between p-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 shadow-md">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                  </svg>
                  <span>{error}</span>
                </div>
                <button onClick={() => { setError(null); form.reset() }}>
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <LogoHorizon />

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user 
              ? 'Link Account' 
              : type === 'sign-in'
                ? 'Sign In'
                : 'Sign Up'
            }
          </h1>
          <p>
            {user 
              ? 'Link your account to get started'
              : 'Please enter your details'
            }
          </p>
        </div>
      </header>
      {
        user 
        ? (
          <div className="flex flex-col gap-4">
            {/** PlaidLink */}
          </div>
        )
        : <><Form {...form}>
            <form
                onSubmit={form.handleSubmit(
                  type === "sign-in" ? handleSignIn : handleSignUp
                )}
                className="space-y-8"
            >
              {type === 'sign-up' &&
              <>
                <div className="flex flex-row gap-4">
                  <CustomInput 
                    control={form.control} 
                    name={'firstName'} 
                    label={'First Name'} 
                    placeholder={'Enter Your First Name'}
                  />
                  <CustomInput 
                    control={form.control} 
                    name={'lastName'} 
                    label={'Last Name'} 
                    placeholder={'Enter your last name'}
                  />
                </div>
                <CustomInput 
                    control={form.control} 
                    name={'address'} 
                    label={'Address'} 
                    placeholder={'Enter your Address'}
                  />
                <CustomInput 
                  control={form.control} 
                  name={'city'} 
                  label={'City'} 
                  placeholder={'Enter your City'}
                />
                <div className="flex flex-row gap-4">
                  <CustomInput 
                    control={form.control} 
                    name={'state'} 
                    label={'State'} 
                    placeholder={'Ex: NY'}
                  />
                  <CustomInput 
                    control={form.control} 
                    name={'postalCode'} 
                    label={'Postal Code'} 
                    placeholder={'Ex: 91001'}
                  />
                </div>
                <div className="flex flex-row gap-4">
                  <CustomInput 
                    control={form.control} 
                    name={'dateOfBirth'} 
                    label={'Date of birth'} 
                    placeholder={'2003-08-06'}
                  />
                  <CustomInput 
                    control={form.control} 
                    name={'ssn'} 
                    label={'SSN'} 
                    placeholder={'Ex: 1234'}
                  />
                </div>
              </>
              }
              <CustomInput 
                control={form.control} 
                name={'email'} 
                label={'Email'} 
                placeholder={'Enter your Username'}
              />
              <CustomInput 
                control={form.control} 
                name={'password'} 
                label={'Password'} 
                placeholder={'Enter your Password'}
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading 
                    ? (
                      <>
                        <Loader2 size={20} className="animate-spin"/> &nbsp; Loading...
                      </>
                    )
                    : type === 'sign-in'
                      ? 'Sign In'
                      : 'Sign Up'
                  }
                </Button>

              </div>

            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === 'sign-in'
                ? "Don't have an account?"
                : "Already have an account?"
              }
            </p>
            <Link href={type === 'sign-in' ? '/signUp': '/signIn'} className="form-link">
              {type === 'sign-in' ? 'Sign Up': 'Sign In'}
            </Link>
          </footer>
        </>
      }

    </section>
  );
};

export default AuthForm;
