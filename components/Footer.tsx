import { signOut } from "@/lib/Actions"
import Image from "next/image"
import { useState } from "react"
import { SignOutBtn } from "./auth/SignOutBtn"

const Footer = ({ user, type = 'desktop' }: FooterProps) => {

    return (
        <footer className='flex items-center justify-between'>
            <div className="flex gap-2">
                <div className={
                    type === 'mobile'
                        ? 'footer_name-mobile'
                        : 'footer_name'
                }>
                    <p className="form-link">{user.firstName[0]}</p>
                </div>

                <div className={
                    type === "mobile"
                        ? 'footer_email-mobile'
                        : 'footer_email'
                }>
                    <h1 className="text-14 truncate font-semibold text-gray-700">
                        {user.firstName}
                    </h1>
                    <p className="text-12 truncate font-normal text-gray-600">
                        {user.email}
                    </p>
                </div>
            </div>

            <SignOutBtn />

        </footer>
    )
}

export default Footer