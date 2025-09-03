'use client'

import { useState } from "react";
import LogoHorizon from "../LogoHorizon";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, Form, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { signIn, signUp } from "@/lib/Actions";

interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

const AuthForm = ({ type }: AuthFormProps) => {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type)

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


  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values)
    setIsLoading(false);
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
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
            <form action={type === 'sign-in' ? signIn : signUp} className="space-y-8">
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
                  {
                    isLoading 
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
