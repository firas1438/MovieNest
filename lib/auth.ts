import { createClient } from "@/utils/supabase/client";

// login service
export async function login(email: string, password: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

// sign up service
export async function signup(email: string, password: string, fullName: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } }, });
  return { data, error };
}

// sign out service
export async function signout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  return { error };
}

// sign in with google service
export async function signInWithGoogle() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { 
      redirectTo: `${window.location.origin}/auth/callback?next=/profile`,
      queryParams: { access_type: 'offline', prompt: 'consent', }, 
    },
  });
    return { data, error };
  }

