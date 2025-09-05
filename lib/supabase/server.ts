//server.ts

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Env } from "../utils";

const { ProjectKey, ProjectUrl } = Env();

export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(
        ProjectUrl,
        ProjectKey,
        {
            cookies: {
                getAll() {
                    console.log(cookieStore.getAll());
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({name, value, options}) => {
                            cookieStore.set(name, value, options)
                            console.log(cookieStore.getAll());
                        })
                    } catch (error) {
                        console.log('Ha ocurrido un error al tratar de reemplazar las cookies: ', error);
                    }
                }
            }
        }
    ) 
}