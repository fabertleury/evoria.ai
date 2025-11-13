import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Video } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface VideoUploadCardProps {
  eventTitle: string;
  onUpload?: (name: string, file: File) => void;
}

export default function VideoUploadCard({ eventTitle, onUpload }: VideoUploadCardProps) {
  const [name, setName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log('File selected:', file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !name) return;

    setUploading(true);
    console.log('Upload started', { name, file: selectedFile.name });
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          console.log('Upload completed');
          onUpload?.(name, selectedFile);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Video className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">Momentia</span>
          </div>
          <CardTitle className="text-2xl" data-testid="text-event-title">{eventTitle}</CardTitle>
          <CardDescription>
            Envie seu vídeo curto (máx. 30 segundos) e faça parte deste momento especial
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Seu nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={uploading}
                data-testid="input-name"
              />
            </div>

            <div className="space-y-4">
              <Label>Seu vídeo</Label>
              <div className="border-2 border-dashed rounded-lg p-12 text-center hover-elevate">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="video-upload"
                  disabled={uploading}
                  data-testid="input-video"
                />
                <label
                  htmlFor="video-upload"
                  className="cursor-pointer flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Clique para fazer upload</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedFile ? selectedFile.name : "Vídeo até 30 segundos"}
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Enviando...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} data-testid="progress-upload" />
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={!name || !selectedFile || uploading}
              data-testid="button-submit"
            >
              {uploading ? "Enviando..." : "Enviar Vídeo"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
