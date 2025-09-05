"use server"

import { createClient } from "./supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_BASE_URL_PROD
    : process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_BASE_URL_DEV
      : process.env.NEXT_PUBLIC_BASE_URL_PREVIEW

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
    options: {
      emailRedirectTo: `${baseUrl}/`
    }
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
    return { success: false, message: "El usuario ya existe" }
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

export async function forgotPassword(email: string): Promise<{success: boolean, message: string}> {
  const supabase = await createClient();
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${baseUrl}/update-password`
    })
    if (error) 
      return { success: false, message: error?.message && "Ha ocurrido un error al intentar resetear el password" };
    return { success: true, message: 'Todo correcto' }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else{
      return { success: false, message: "Ha ocurrido un error inesperado" };
    }
  }
}

export async function updatePassword(password: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({password})
  if (error) {
    return {message: error.message || "Error Desconocido", success: false}
  }
  return {message: 'Todo Bien', success: true}
}

export async function getUser() {
  const supabase = await createClient();

  const {data, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !data.session?.user ) {
    redirect('/signIn');
  }

  const userId = data.session.user.id

  const { data: userData, error: userError  } = await supabase
    .from('usuarios')
    .select('*')
    .eq('id', userId)
    .single()

  if (userError || !userData) redirect('/signIn')

  return userData;
}