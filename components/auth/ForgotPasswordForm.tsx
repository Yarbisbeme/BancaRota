"use client";

import React, { useState } from 'react'
import { LogoYBank } from '../LogoYBank'
import { forgotPassword } from '@/lib/Actions';
import Message from '../Message';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import Link from 'next/link';
import { Player } from "@lottiefiles/react-lottie-player";
import mail from "@/public/animations/contactMail.json";
const ForgotPasswordForm = () => {

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const response = await forgotPassword(email);

    if (response.success) {
      setSuccess(true);
    } else {
      setError(response.message);
    }

    setIsLoading(false);
  }

  return(
    <section className="auth-form">
      {
        error && <Message onClick={() => { setError(null) }} color='red' value={error} />
      }
      <header className='flex flex-col gap-5 md:gap-8'>
        <LogoYBank />
      </header>
      {
        success
          ?
          <>
            <div className="flex flex-col gap-1 md:gap-3 space-y-4">
              <div className="flex flex-col gap-2">
                <h1 className='text-24 lg:text-30 font-semibold text-gray-900'>Password reset Instructions sent</h1>
                <p className="text-sm text-muted-foreground">
                  If you registered using your email and password, you will receive
                  a password reset email.
                </p>
              </div>
              <Player
                loop
                autoplay
                style={{ height: 200, width: 200 }}
                src={mail}
              />
            </div>
            <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/signIn"
                  className="underline underline-offset-4 form-link"
                >
                  Sign In
                </Link>
            </div>
          </>
          :
          <>
            <div className="flex flex-col gap-1 md:gap-3">
              <h1 className='text-24 lg:text-30 font-semibold text-gray-900'>Reset your password</h1>
              <p>Type in your email and we&apos;ll send you a link to reset your
                password</p>
            </div>
            <form onSubmit={handleForgotPassword}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button onSubmit={handleForgotPassword} type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send reset email"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/signIn"
                  className="underline underline-offset-4 form-link"
                >
                  Sign In
                </Link>
              </div>
            </form>
          </>
      }
      
      
    </section>
    )
}

export default ForgotPasswordForm