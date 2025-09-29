import { Tabs, TabsList, TabsTrigger, TabsContent, } from "@/components/ui/tabs";

interface WatchMovieDialogProps {
  movieId: number;
}

const Server = [
  { id: "server1", label: "Server 1", baseUrl: "https://player.videasy.net/movie/", },
  { id: "server2", label: "Server 2", baseUrl: "https://vidsrc.icu/embed/movie/", },
  { id: "server3", label: "Server 3", baseUrl: "https://111movies.com/movie/", },
];

export default function WatchMovieDialog({ movieId }: WatchMovieDialogProps) {
  return (
    <div className="w-full">
      <Tabs defaultValue={Server[0].id} className="w-full p-4">

        {/* tabs */}
        <TabsList className="grid w-full grid-cols-3 mb-6">
          {Server.map((server) => (
            <TabsTrigger key={server.id} value={server.id}>
              {server.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* content */}
        {Server.map((server) => (
          <TabsContent key={server.id} value={server.id} className="mt-4">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <iframe
                src={`${server.baseUrl}${movieId}`}
                title={`${server.label} Player`}
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
