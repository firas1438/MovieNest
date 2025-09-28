"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, BookmarkIcon, Trash2, CheckCircle, XCircle, LogOutIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import LogoutButton from "./components/logout-button";
import DeleteButton from "./components/delete-button";
import { Profile } from "@/types/profile";


export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) { router.push("/unauthorized"); return; }
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (error) { router.push("/unauthorized"); return; }
      setProfile(data as Profile);
    };
    fetchProfile();
  }, [router, supabase]);
  

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {profile && (
        <div className="space-y-6">
          
          {/* basic info */}
          <div className="p-6">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              {/* avatar */}
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar_url || "https://i.imgur.com/rGcuutZ.jpeg"} alt="profile"/>
                  <AvatarFallback className="text-2xl"> {profile.full_name?.[0] || "U"} </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 space-y-2">
                {/* full name */}
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                  <h1 className="text-2xl font-bold">{profile.full_name || "User"}</h1>
                  <Badge variant="secondary" className="max-w-fit">Member</Badge>
                </div>
                {/* email */}
                <div className="text-muted-foreground flex items-center gap-1 text-sm">
                  <Mail className="size-4" />
                  {profile.email}
                </div>
              </div>
              {/* bookmarks button */}
              <Link href="/bookmarks">
                <Button variant="default"> <BookmarkIcon className="mr-2 h-4 w-4" /> Bookmarks </Button>
              </Link>
            </div>
          </div>

          {/* other info card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Account Details</CardTitle>
              <CardDescription>Additional information about your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* provider */}
              <div className="flex justify-between">
                <Label className="text-base">Provider</Label>
                <p className="text-sm text-muted-foreground">
                  {profile.provider.charAt(0).toUpperCase() + profile.provider.slice(1)}
                </p>
              </div>
              {/* email verification status */}
              <div className="flex justify-between items-center">
                <Label className="text-base">Email Verification Status</Label>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  {profile.email_verified ? <CheckCircle className="h-4 w-4 text-green-500"/> : <XCircle className="h-4 w-4 text-red-500"/>}
                  <span>{profile.email_verified ? "Verified" : "Not Verified"}</span>
                </div>
              </div>
              {/* account created */}
              <div className="flex justify-between">
                <Label className="text-base">Account Created</Label>
                <p className="text-sm text-muted-foreground">
                  {new Date(profile.created_at).toLocaleString()}
                </p>
              </div>
              {/* last sign in */}
              <div className="flex justify-between">
                <Label className="text-base">Last Active</Label>
                <p className="text-sm text-muted-foreground">
                  {profile.last_sign_in_at ? new Date(profile.last_sign_in_at).toLocaleString() : "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* session management card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Session Management</CardTitle>
              <CardDescription>Manage your current session</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Sign Out</Label>
                  <p className="text-muted-foreground text-sm">End your current session. You can sign back in at any time.</p>
                </div>
                <LogoutButton variant="secondary" />
              </div>
            </CardContent>
          </Card>

          {/* danger zone card */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive text-xl">Danger Zone</CardTitle>
              <CardDescription> These actions are permanent and cannot be undone. Proceed with caution. </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Delete Account</Label>
                  <p className="text-muted-foreground text-sm"> 
                     Permanently delete your account, including all your bookmarks and personal data. This action is irreversible.
                  </p>
                </div>
                {/* delete account button */}
                <DeleteButton/>
              </div>
            </CardContent>
          </Card>

        </div>
      )}
    </div>
  );
}