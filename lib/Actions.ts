"use server"

//actions.ts

import { createClient } from "./supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { Console } from "console"

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error(error)
    redirect("/sign-in")
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    console.error(error)
    redirect("/error")
  }

  // Esperar confirmación antes de entrar
  redirect("/verify-email")
}

export async function signOut() {
    const supabase = await createClient();

    const {error} = await supabase.auth.signOut();

    if (error) {
        console.log('Ha ocurrido un error al intentar hacer signOut: ', error);
    }

    revalidatePath("/", "layout")
    redirect("/signIn")
}