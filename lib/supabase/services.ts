import { createClient } from "@/lib/supabase/client";

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

// delete account service
export async function deleteAccount() {
  const supabase = createClient();

  // get the current logged-in user
  const { data: { user }, error: userError, } = await supabase.auth.getUser();
  if (userError || !user) { return { error: userError || new Error("No user is currently logged in.") }; }

  // call our secure API route
  const response = await fetch("/api/profile/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: user.id }),
  });

  // save result message
  let result;
  try {
    result = await response.json();
  } catch {
    return { error: new Error("Invalid JSON response from server") };
  }

  if (!response.ok) { return { error: new Error(result.error || "Failed to delete account") }; }

  // logout locally after account deletion
  const { error: signOutError } = await supabase.auth.signOut();
  if (signOutError) { return { error: signOutError }; }

  return { error: null };
}
