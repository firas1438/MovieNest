'use client'

import { Button } from '@/components/ui/button'
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/use-auth-store";
import { toast } from '@/hooks/use-toast';

interface BookmarkButtonProps {
  itemId: string;
  itemType: "movie" | "show";
  onRemove?: () => void; 
  variant?: "default" | "secondary" | "outline" | "destructive" | "ghost" | "link";
}

export function BookmarkButton({ itemId, itemType, onRemove, variant = "default" }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useAuthStore(); // get logged-in user

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user) { setLoading(false); return; }
      try {
        const res = await fetch("/api/bookmarks/list");
        const json = await res.json();
        if (json.bookmarks) { setBookmarked(json.bookmarks.some((b: any) => b.item_id === itemId && b.item_type === itemType)); }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchBookmarks();
  }, [itemId, itemType, user]);

  const toggleBookmark = async () => {
    if (!user) {
      toast({ title: "Login Required", description: "You need to login before attempting to bookmark!", variant: "destructive", });
      return;
    }

    setLoading(true);
    try {
      const url = bookmarked ? "/api/bookmarks/remove" : "/api/bookmarks/add";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ itemId, itemType }),
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (!json.error) {
        setBookmarked(!bookmarked);
        if (bookmarked && onRemove) onRemove(); // call parent only when removing
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={variant} onClick={toggleBookmark} disabled={loading}>
            {bookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span className="font-semibold">{bookmarked ? "Remove Bookmark" : "Add Bookmark"}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
