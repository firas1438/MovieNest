"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLinkIcon, HomeIcon, ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 min-h-[34rem]">
      <Card className="w-full max-w-xl shadow-lg border border-border rounded-3xl bg-muted/5">
        <CardHeader className="flex flex-col items-center text-center space-y-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive/20 ">
            <ShieldAlert className="w-10 h-10 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-semibold text-destructive">
            401 - Unauthorized Access
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-8 mb-4">
          <p> Please log in with the correct account or return to the homepage. </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="default">
              <Link href="/"><HomeIcon/>Return Home </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Go to Login<ExternalLinkIcon/> </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
