import SideBar from "@/components/SideBar/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const logedIn = { firstName: 'Yarbis', lastName: 'Beltré Mercedes' };

  return (
    <main className="flex min-h-screen w-full font-inter">
      <SideBar user={logedIn.firstName}/>
      {children}
    </main>
  );
}
