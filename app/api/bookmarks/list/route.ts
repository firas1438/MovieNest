import { createClient } from "@/lib/supabase/server"; 
import { NextResponse } from "next/server"; 

export async function GET() { 
    const supabase = createClient(); 
    const { data: { user } } = await supabase.auth.getUser(); 
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 }); 
    const { data, error } = await supabase 
    .from("bookmarks") 
    .select("*") 
    .eq("user_id", user.id); 
    
    if (error) return NextResponse.json({ error: error.message }, { status: 500 }); 
    
    return NextResponse.json({ bookmarks: data }); 
}