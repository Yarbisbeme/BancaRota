"use server"

//actions.ts

import { createClient } from "./supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { Console } from "console"
import { success } from "zod"
import { form } from "framer-motion/client"

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { success: false, message: 'correo o contraseña incorrectos'}
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const city = formData.get("city") as string;
  const state = formData.get("state") as string;
  const address = formData.get("address") as string;
  const postalCode = formData.get("postalCode") as string;
  const dateOfBirth = formData.get("dateOfBirth") as string;
  const ssn = formData.get("ssn") as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error || !data.user) {
    return { success: false, message: error?.message || "Error al registrar usuario" }
  }

  const {error: insertError} = await supabase.from("usuarios").insert({
    id: data.user.id,
    first_name: firstName,
    last_name: lastName,
    address,
    city,
    state,
    postal_code: postalCode,
    date_of_birth: dateOfBirth,
    ssn,
  })

  if (insertError) {
    return { success: false, message: insertError.message }
  }

  return { success: true, message: "Usuario registrado, revisa tu correo para confirmar" };
}

export async function signOut() {

    const supabase = await createClient();

    const {error} = await supabase.auth.signOut();

    if (error) {
        return {succes: false, message: error?.message || 'Ha ocurrido un error al hacer Sign Out' }
    }

    revalidatePath("/", "layout")
    redirect("/signIn")
}