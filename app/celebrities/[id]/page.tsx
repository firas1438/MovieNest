"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ExternalLink, Calendar, MapPin, InstagramIcon, TwitterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { BackButton } from "@/components/back-button";
import { CelebrityDetails, CelebrityCombinedCredits, CelebrityExternalIds } from "@/types/celebrity";
import { Play } from 'lucide-react'


export default function CelebrityDetailsPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [celebrity, setCelebrity] = useState<CelebrityDetails | null>(null);
  const [credits, setCredits] = useState<CelebrityCombinedCredits | null>(null);
  const [externalIds, setExternalIds] = useState<CelebrityExternalIds | null>(null);

  // fetch celebrity data
  useEffect(() => {
    const fetchCelebrityData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/celebrities/${id}`);
        if (!response.ok) throw new Error("Failed to fetch celebrity data");

        const data = await response.json();
        setCelebrity(data.celebrity);
        setCredits(data.credits);
        setExternalIds(data.externalIds);
      } catch (error) {
        console.error("Error fetching celebrity data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCelebrityData();
  }, [id]);

  if (loading) {
    return <CelebrityDetailsSkeleton />;
  }

  if (!celebrity || !credits) {
    return <div className="container mx-auto px-4 ">Celebrity not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <BackButton />

      {/* celebrity details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* profile image */}
        <div className="lg:col-span-1">
          <Image src={ celebrity.profile_path ? `https://image.tmdb.org/t/p/w500${celebrity.profile_path}` : "/placeholder.svg" } alt={celebrity.name} width={500} height={750} quality={100} priority className="rounded-lg shadow-lg w-full h-auto" />
        </div>
        {/* general info */}
        <div className="lg:col-span-2">
          {/* name & role */}  
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2"> {celebrity.name} </h1>
            <p className="text-muted-foreground mb-4"> {celebrity.known_for_department} </p>
          </div>

          {/* birth info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            {/* birthday */}
            {celebrity.birthday && (
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" /> {new Date(celebrity.birthday).toLocaleDateString()}
              </div>
            )}
            {/* place of birth */}
            {celebrity.place_of_birth && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" /> {celebrity.place_of_birth}
              </div>
            )}
          </div>

          {/* biography */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Biography</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
                {celebrity.biography || "No biography available."}
            </p>
          </div>

          {/* external links */}
          <div>
            {externalIds && (
                <div className="flex gap-2">
                {/* imdb */}
                {externalIds.imdb_id && (
                    <Button asChild variant="outline" size="sm">
                        <Link href={`https://www.imdb.com/name/${externalIds.imdb_id}`} target="_blank" rel="noopener noreferrer" >
                            IMDb <ExternalLink className="ml-1 w-4 h-4" />
                        </Link>
                    </Button>
                )}
                {/* instagram */}
                {externalIds.instagram_id && (
                    <Button asChild variant="outline" size="sm"> 
                        <Link href={`https://instagram.com/${externalIds.instagram_id}`} target="_blank" rel="noopener noreferrer" >
                            Instagram <InstagramIcon className="ml-1 w-4 h-4" />
                        </Link>
                    </Button>
                )}
                {/* twitter */}
                {externalIds.twitter_id && (
                    <Button asChild variant="outline" size="sm">
                        <Link href={`https://twitter.com/${externalIds.twitter_id}`} target="_blank" rel="noopener noreferrer" >
                            Twitter <TwitterIcon className="ml-1 w-4 h-4" />
                        </Link>
                    </Button>
                )}
                </div>
            )}
          </div>

        </div>

      </div>

      <Separator className="my-8" />

      {/* known for (cast roles) */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Known For</h2>
        {credits.cast.length === 0 ? (
          <p className="text-muted-foreground">No acting credits available.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
            {credits.cast.slice(0, 10).map((credit) => (
              <div key={credit.id} className="space-y-2">
                {/* image link */}
                <Link href={credit.media_type === "movie" ? `/movies/${credit.id}` : `/shows/${credit.id}`} className="block overflow-hidden group cursor-pointer" >
                  <div className="relative aspect-[2/3]">
                    {/* poster image */}
                    <Image src={ credit.poster_path ? `https://image.tmdb.org/t/p/w500${credit.poster_path}` : "/placeholder.svg" } alt={credit.title || credit.name || "Unknown"} fill className="object-cover rounded-lg" />
                    
                    {/* gradient overlay */}
                    <div className="absolute -inset-0.5 bg-gradient-to-t from-card to-transparent opacity-20 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="icon" variant="secondary" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" >
                        <Play className="w-6 h-6" />
                      </Button>
                    </div>

                  </div>
                </Link>
                {/* text info */}
                <div>
                  <p className="font-medium text-sm truncate">{credit.title || credit.name}</p>
                  <p className="text-xs text-muted-foreground truncate"> as {credit.character || "N/A"} </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator className="my-8" />

      {/* crew credits */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Crew Work</h2>
        {credits.crew.length === 0 ? (
          <p className="text-muted-foreground">No crew credits available.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
            {credits.crew.slice(0, 10).map((credit) => (
              <div key={credit.id} className="space-y-2">
                {/* image link */}
                <Link href={credit.media_type === "tv" ? `/shows/${credit.id}` : `/movies/${credit.id}`} className="block overflow-hidden group cursor-pointer" >
                  <div className="relative aspect-[2/3]">
                    {/* poster image */}
                    <Image src={ credit.poster_path ? `https://image.tmdb.org/t/p/w500${credit.poster_path}` : "/placeholder.svg" } alt={credit.title || credit.name || "Unknown"} fill className="object-cover rounded-lg" />
                    {/* gradient overlay */}
                    <div className="absolute -inset-0.5 bg-gradient-to-t from-card to-transparent opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="icon" variant="secondary" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" >
                        <Play className="w-6 h-6" />
                      </Button>
                    </div>
                  </div>
                </Link>
                {/* text info */}
                <div>
                  <p className="font-medium text-sm truncate">{credit.title || credit.name}</p>
                  <p className="text-xs text-muted-foreground truncate"> {credit.job} ({credit.department}) </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}


{/* skeleton */}
function CelebrityDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <Skeleton className="w-full aspect-[2/3] rounded-lg" />
        </div>
        <div className="lg:w-2/3 space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </div>
      <Separator className="my-8" />
      <Skeleton className="h-8 w-40 mb-4" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className="w-full aspect-[2/3]" />
        ))}
      </div>
    </div>
  );
}
