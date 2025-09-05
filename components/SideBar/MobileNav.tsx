'use client'

import Image from "next/image"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet"
import Link from "next/link";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";

const MobileNav = ({ user }: MobileNavProps ) => {

  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src={'/icons/hamburger.svg'} 
            alt="Menu Icon" 
            width={30} 
            height={30} 
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white p-4">
          <SheetTitle>
            <Link href={'/'} className="cursor-pointer items-center gap-2 flex">
                <Image 
                    src={'/icons/logoY.svg'} 
                    alt="Logo" 
                    width={32} 
                    height={32} 
                    className='max-lg:size-8'
                />
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1 -ml-2'>Bank</h1>
            </Link>
          </SheetTitle>
          <div className="mobilnav-sheet">
            <SheetClose asChild>
              <nav className="flex flex-col h-full gap-6 pt-16 text-white">
                {sidebarLinks.map((item) => {
                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
                    return (
                        <SheetClose key={item.route} asChild>  
                          <Link 
                              href={item.route} 
                              key={item.label}
                              className={cn('mobilenav-sheet_close w-full', {'bg-bank-gradient' : isActive})}
                          >
                              <Image 
                                  src={item.imgURL}
                                  alt={item.label}
                                  width={20}
                                  height={20}
                                  className={cn({'brightness-[3] invert-0' : isActive})}
                              />
                              <p className={
                                cn('text-16 font-semibold text-black-2', 
                                {'text-white' : isActive})}
                              >
                                  {item.label}
                              </p>
                          </Link>
                        </SheetClose>
                    )
                })}
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav