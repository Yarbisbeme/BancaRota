import MobileNav from "@/components/SideBar/MobileNav";
import SideBar from "@/components/SideBar/SideBar";
import { getUser } from "@/lib/Actions";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loggedIn = await getUser();

  return (
    <main className="flex min-h-screen w-full font-inter">
      <SideBar user={loggedIn}/>
      <div className="flex flex-col size-full">
        <div className="root-layout">
          <Image 
            src={'/icons/logoY.svg'} 
            alt="Menu Icon" 
            width={30} 
            height={30} 
          />
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
      {children}
      </div>
    </main>
  );
}
