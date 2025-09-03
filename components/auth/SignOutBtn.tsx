"use client"

import { signOut } from "@/lib/Actions"


export function LogoutButton() {
  async function handleLogOut() {
    console.log('se ta haciendo')
    const out = await signOut();
    console.log(out.message);
  }
  return (
    <button 
      onClick={handleLogOut}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
    >
      Logout
    </button>
  )
}
