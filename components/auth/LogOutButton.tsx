import { account } from "@/lib/appwrite";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LogoutButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await account.deleteSession("current");
      router.push("/sign-in");
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
    
  };

  return (
    <button
      onClick={handleLogout}
      className={`px-4 py-2 ${isLoading ? 'bg-red-500/70 text-gray-700' : 'bg-red-500 text-white'} rounded`}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2Icon className="animate-spin"/>
      ) 
      : 'Logout'}
    </button>
  );
};
