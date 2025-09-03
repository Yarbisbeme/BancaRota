"use client"

import { signOut } from "@/lib/Actions"


export function LogoutButton() {
  return (
    <form action={signOut}>
      <button 
        type="submit" 
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Cerrar sesión
      </button>
    </form>
  )
}
