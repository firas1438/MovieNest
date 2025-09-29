"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Season, Episode } from "@/types/show";


interface ShowDialogProps {
  show: {
    id: number;
    seasons: Season[];
  };
}

const Server = [
  { id: "server1", label: "Server 1", baseUrl: "https://player.videasy.net/tv/" },
  { id: "server2", label: "Server 2", baseUrl: "https://vidsrc.icu/embed/tv/" },
  { id: "server3", label: "Server 3", baseUrl: "https://111movies.com/tv/" },
];

export default function WatchShowDialog({ show }: ShowDialogProps) {
  // filter out specials (season_number 0)
  const filteredSeasons = show.seasons.filter((s) => s.season_number > 0);

  const [selectedSeason, setSelectedSeason] = useState(filteredSeasons[0].season_number);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [seasonEpisodes, setSeasonEpisodes] = useState<Episode[]>([]);

  // fetch episode names
  useEffect(() => {
    async function fetchEpisodes() {
      const res = await fetch(`/api/shows/${show.id}/season/${selectedSeason}`);
      const data = await res.json();
      setSeasonEpisodes(data.episodes || []);
      setSelectedEpisode(1); // Always start with episode 1
    }

    fetchEpisodes();
  }, [selectedSeason, show.id]);

  return (
    <div className="w-full">
      <Tabs defaultValue={Server[0].id} className="w-full p-4">

        {/* tabs */}
        <TabsList className="grid w-full grid-cols-3 mb-6">
          {Server.map((server) => (
            <TabsTrigger key={server.id} value={server.id}>{server.label}</TabsTrigger>
          ))}
        </TabsList>

        {/* content */}
        {Server.map((server) => (
          <TabsContent key={server.id} value={server.id} className="space-y-6">

            {/* selectors */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              {/* season selector */}
              <Select value={selectedSeason.toString()} onValueChange={(val) => setSelectedSeason(parseInt(val))}>
                <SelectTrigger className="w-full sm:w-1/2">
                  <SelectValue placeholder="Select Season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Season</SelectLabel>
                    {filteredSeasons.map((s) => (
                      <SelectItem key={s.season_number} value={s.season_number.toString()}>
                        {s.name || `Season ${s.season_number}`}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* episode selector */}
              <Select value={selectedEpisode.toString()} onValueChange={(val) => setSelectedEpisode(parseInt(val))}>
                <SelectTrigger className="w-full sm:w-1/2">
                  <SelectValue placeholder="Select Episode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Episode</SelectLabel>
                    {seasonEpisodes.map((ep) => (
                      <SelectItem key={ep.episode_number} value={ep.episode_number.toString()}>
                        Episode {ep.episode_number} - {ep.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* iframe player */}
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <iframe
                src={`${server.baseUrl}${show.id}/${selectedSeason}/${selectedEpisode}`}
                title={`${server.id} Player`}
                className="absolute inset-0 w-full h-full rounded-lg"
                allowFullScreen
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
