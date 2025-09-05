"use client"

import { signOut } from "@/lib/Actions"
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function LogoutButton() {

  const [isLoading, setIsLoading] = useState(false)

  async function handleLogOut() {
    setIsLoading(true);
    const out = await signOut();
    setIsLoading(false);
  }

  return (
    <button 
      onClick={handleLogOut}
      disabled={isLoading}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex-center"
    >
      {isLoading ? 
      <Loader2 className="animate-spin"/> :
      'Sign Out'}
    </button>
  )
}
