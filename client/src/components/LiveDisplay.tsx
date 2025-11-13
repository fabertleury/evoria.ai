import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Video {
  id: string;
  guestName: string;
  videoUrl: string;
  thumbnail: string;
}

interface LiveDisplayProps {
  videos: Video[];
}

export default function LiveDisplay({ videos }: LiveDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
    setProgress(0);
    console.log('Next video');
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setProgress(0);
    console.log('Previous video');
  };

  const currentVideo = videos[currentIndex];

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center relative">
      <div className="absolute top-0 left-0 right-0 z-20">
        <Progress value={progress} className="h-1 rounded-none" data-testid="progress-video" />
      </div>

      <div className="relative w-full max-w-md h-full md:h-5/6 bg-muted flex items-center justify-center">
        <img
          src={currentVideo.thumbnail}
          alt={`Vídeo de ${currentVideo.guestName}`}
          className="w-full h-full object-cover"
          data-testid="img-current-video"
        />

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm">
          <p className="text-white font-semibold text-xl" data-testid="text-guest-name">
            {currentVideo.guestName}
          </p>
          <p className="text-white/70 text-sm">
            {currentIndex + 1} de {videos.length}
          </p>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 hover:bg-black/70 text-white z-10"
        onClick={handlePrevious}
        data-testid="button-previous"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 hover:bg-black/70 text-white z-10"
        onClick={handleNext}
        data-testid="button-next"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10">
        <div className="flex gap-2">
          {videos.slice(0, 5).map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIndex ? "w-8 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
