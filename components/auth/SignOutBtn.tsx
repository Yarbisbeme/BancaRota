"use client"

import { signOut } from "@/lib/Actions"
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function SignOutBtn() {

  const [isLoading, setIsLoading] = useState(false)

  async function handleSignOut() {
    setIsLoading(true);
    const out = await signOut();
    setIsLoading(false);
  }

  return (
    <div className="footer_image  lg:ml-0">
      <button onClick={handleSignOut}>
        <div className={isLoading ? "animate-wiggle" : ""}>
          <Image
            src={'/icons/logout.svg'}
            alt="logout"
            width={24}
            height={24}
          />
        </div>
      </button>
    </div>
  )
}
