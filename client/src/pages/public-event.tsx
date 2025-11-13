import VideoUploadCard from "@/components/VideoUploadCard";
import CreditsWidget from "@/components/CreditsWidget";

export default function PublicEvent() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <VideoUploadCard
              eventTitle="Casamento Ana & Pedro"
              onUpload={(name, file) => {
                console.log('Video uploaded:', { name, fileName: file.name });
              }}
            />
          </div>
          <div>
            <CreditsWidget
              currentCredits={5}
              onBuyCredits={() => console.log('Buy credits')}
              onSkipQueue={() => console.log('Skip queue')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
