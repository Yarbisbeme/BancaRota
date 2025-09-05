// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { Env } from "../utils";

const { ProjectKey, ProjectUrl } = Env();

export async function updateSession(request: NextRequest) {
    const response = NextResponse.next({ request });

    // Crear cliente de Supabase en el server con cookies
    const supabase = createServerClient(ProjectUrl, ProjectKey, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value, options }) => {
                    response.cookies.set(name, value, options);
                });
            },
        },
    });

    // Obtener información del usuario
    const { data } = await supabase.auth.getUser();
    const user = data.user;

    const pathname = request.nextUrl.pathname;

    // USUARIO LOGUEADO
    if (user) {
        // Bloquear acceso a signIn, signUp y verify-email si ya está logueado
        if (
            pathname.startsWith("/signIn") ||
            pathname.startsWith("/signUp") ||
            pathname.startsWith("/verify-email")
        ) {
            const url = request.nextUrl.clone();
            url.pathname = "/";
            return NextResponse.redirect(url);
        }

        // Usuario no confirmado → redirigir a verify-email
        if (!user.confirmed_at && !pathname.startsWith("/verify-email")) {
            const url = request.nextUrl.clone();
            url.pathname = "/verify-email";
            return NextResponse.redirect(url);
        }

        // Si está confirmado y todo ok → dejar pasar
        return response;
    }

    // USUARIO NO LOGUEADO
    if (!user) {
        // Permitimos entrar a /signIn, /signUp, /verify-email
        if (
            pathname.startsWith("/signIn") ||
            pathname.startsWith("/signUp") ||
            pathname.startsWith("/verify-email") ||
            pathname.startsWith("/forgot-password") ||
            pathname.startsWith("/update-password") 
        ) {
            return response;
        }

        // Cualquier otra ruta → redirigir a /signIn
        const url = request.nextUrl.clone();
        url.pathname = "/signIn";
        return NextResponse.redirect(url);
    } 

    return response;
}
