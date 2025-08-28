import MobileNav from "@/components/SideBar/MobileNav";
import SideBar from "@/components/SideBar/SideBar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const logedIn = { 
    firstName: 'Yarbis', 
    lastName: 'Beltré Mercedes',
    email: 'yarbisbeme@gmail.com',
  };

  return (
    <main className="flex min-h-screen w-full font-inter">
      <SideBar user={logedIn.firstName}/>
      <div className="flex flex-col size-full">
        <div className="root-layout">
          <Image 
            src={'/icons/logo.svg'} 
            alt="Menu Icon" 
            width={30} 
            height={30} 
          />
          <div>
            <MobileNav user={logedIn} />
          </div>
        </div>
      {children}
      </div>
    </main>
  );
}
