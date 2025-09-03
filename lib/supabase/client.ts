//client.ts

import { createBrowserClient } from '@supabase/ssr'
import { Env } from "../utils"

const { ProjectKey, ProjectUrl } = Env();

export function createClient() {
    return createBrowserClient(
        ProjectUrl,
        ProjectKey
    )
}