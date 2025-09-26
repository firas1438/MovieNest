import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // never expose client-side (admin privileges)
);

export async function DELETE(req: Request) {
  try {
    // get user id
    const { userId } = await req.json();
    if (!userId) { return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400, }); }

    // delete user
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) { return new Response(JSON.stringify({ error: error.message }), { status: 400, }); }

    return new Response(JSON.stringify({ message: "User deleted successfully" }), { status: 200, });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error deleting user" }), { status: 500, });
  }
}
