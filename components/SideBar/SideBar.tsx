'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '../Logo'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { LogoutButton } from '../auth/SignOutBtn'

const SideBar = ({ user }: SiderbarProps) => {

    const pathName = usePathname();

  return (
    <section className="sidebar">
        <nav className="flex flex-col gap-4">
            <Link href={'/'} className="mb-12 cursor-pointer items-center gap-2 flex">
                <Image 
                    src={'/icons/logo.svg'} 
                    alt="Logo" 
                    width={32} 
                    height={32} 
                    className='max-lg:size-14'
                />
                <h1 className='sidebar-logo'>Horizon</h1>
            </Link>
            {sidebarLinks.map((item) => {
                const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`);
                return (
                    <Link 
                        href={item.route} 
                        key={item.label}
                        className={cn('sidebar-link', {'bg-bank-gradient' : isActive})}
                    >
                        <div className="relative size-6">
                            <Image 
                                src={item.imgURL}
                                alt={item.label}
                                fill
                                className={cn({'brightness-[3] invert-0' : isActive})}
                            />
                        </div>
                        <p className={cn('sidebar-label', {'!text-white' : isActive})}>
                            {item.label}
                        </p>
                    </Link>
                )
            })}
            User
        </nav>
        Footer
        <LogoutButton />
    </section>
  )
}

export default SideBar