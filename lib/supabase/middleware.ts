//middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { Env } from "../utils";
import { createServerClient } from "@supabase/ssr";

const { ProjectKey, ProjectUrl } = Env()

export async function updateSession(request: NextRequest) {
    
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        ProjectUrl,
        ProjectKey, 
        {
            cookies: {
                getAll(){
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({name, value}) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({name, value, options}) => {
                        supabaseResponse.cookies.set(name, value, options);
                    })
                }
            }
        }
    )

    const { data: {user} } = await supabase.auth.getUser();

    if (user) {
        // Bloquear acceso a signIn y signUp si ya hay usuario
        if (
            request.nextUrl.pathname.startsWith("/signIn") ||
            request.nextUrl.pathname.startsWith("/signUp") ||
            request.nextUrl.pathname.startsWith("/verify-email") ||
            request.nextUrl.pathname.startsWith("/error") 
        ) {
            const url = request.nextUrl.clone();
            url.pathname = "/";
            return NextResponse.redirect(url);
        }

        // Si no está confirmado, mandarlo a verify-email
        if (!user.confirmed_at && 
            !request.nextUrl.pathname.startsWith("/verify-email")) {
            const url = request.nextUrl.clone();
            url.pathname = "/verify-email";
            return NextResponse.redirect(url);
        }
    }
    else {
        if (
            !request.nextUrl.pathname.startsWith("/signIn") &&
            !request.nextUrl.pathname.startsWith("/signUp") &&
            !request.nextUrl.pathname.startsWith("/verify-email")
        ) {
            const url = request.nextUrl.clone()
            url.pathname = "/signIn"
            return NextResponse.redirect(url)
        }
    }

    return supabaseResponse
}