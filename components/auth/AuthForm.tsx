'use client'

import { useEffect, useState } from "react";
import { LogoYBank } from "../LogoYBank";
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
import Message from "../Message";

interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

const AuthForm = ({ type }: AuthFormProps) => {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
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
        setMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, form, message])

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
    setMessage(result.message);
    router.push('/verify-email')
  } else {
    setError(result.message);
    console.log(result.message);
  }
}

  return (
    
    <section className="auth-form">
      
      <header className="flex flex-col gap-5 md:gap-8">
        {error && 
          <Message color="red" value={error} onClick={() => {setError(null); form.reset();}}/>
        }
        {
          message &&
          <Message value={message} onClick={() => {setMessage(null); form.reset();}}/>
        }
        <LogoYBank />

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
          className="space-y-6"
        >
          {type === "sign-up" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomInput
                  control={form.control}
                  name={"firstName"}
                  label={"First Name"}
                  placeholder={"John"}
                />
                <CustomInput
                  control={form.control}
                  name={"lastName"}
                  label={"Last Name"}
                  placeholder={"Doe"}
                />
              </div>
              <CustomInput
                control={form.control}
                name={"address"}
                label={"Address"}
                placeholder={"123 Main St"}
              />
              <CustomInput
                control={form.control}
                name={"city"}
                label={"City"}
                placeholder={"New York"}
              />
              <div className="grid grid-cols-2 gap-4">
                <CustomInput
                  control={form.control}
                  name={"state"}
                  label={"State"}
                  placeholder={"NY"}
                />
                <CustomInput
                  control={form.control}
                  name={"postalCode"}
                  label={"Postal Code"}
                  placeholder={"10001"}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <CustomInput
                  control={form.control}
                  name={"dateOfBirth"}
                  label={"Date of Birth"}
                  placeholder={"2000-01-01"}
                />
                <CustomInput
                  control={form.control}
                  name={"ssn"}
                  label={"SSN"}
                  placeholder={"1234"}
                />
              </div>
            </>
          )}

          <CustomInput
            control={form.control}
            name={"email"}
            label={"Email"}
            placeholder={"you@example.com"}
          />
          <div className="flex flex-col gap-2">
            <CustomInput
              control={form.control}
              name={"password"}
              label={"Password"}
              placeholder={"••••••••"}
            />
            {type === "sign-in" && (
              <Link
                href={"/forgot-password"}
                className="form-link hover:underline self-end"
              >
                Forgot password?
              </Link>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="form-btn w-full"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin mr-2" /> Processing...
              </>
            ) : type === "sign-in" ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </Button>
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
