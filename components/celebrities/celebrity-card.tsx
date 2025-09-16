// /components/celebrities/celebrity-card.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Celebrity } from "@/types/celebrity";

interface CelebrityCardProps {
  celebrity: Celebrity;
}

export function CelebrityCard({ celebrity }: CelebrityCardProps) {
  return (
    <Link href={`/celebrities/${celebrity.id}`}>
      <Card className="overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]">
        <div className="relative aspect-[2/3]">
          {/* celebrity image */}
          <Image src={ celebrity.profile_path ? `https://image.tmdb.org/t/p/w500${celebrity.profile_path}` : "/placeholder.svg" } alt={celebrity.name} fill className="object-cover" priority quality={100} />
          {/* gradient overlay */}
          <div className="absolute -inset-0.5 bg-gradient-to-t from-card to-transparent opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
          {/* external link button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="icon" variant="secondary" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" >
              <ExternalLink className="w-6 h-6" />
            </Button>
          </div>
        </div>
        <CardContent className="p-3">
          {/* name */}
          <h3 className="font-semibold text-sm truncate">{celebrity.name}</h3>
          {/* role */}
          <p className="text-xs text-muted-foreground mt-1">{celebrity.known_for_department}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
