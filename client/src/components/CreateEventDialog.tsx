import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload, Plus } from "lucide-react";

interface CreateEventDialogProps {
  onCreateEvent?: (title: string, date: string, cover: File | null) => void;
}

export default function CreateEventDialog({ onCreateEvent }: CreateEventDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating event:', { title, date, cover: coverFile?.name });
    onCreateEvent?.(title, date, coverFile);
    setOpen(false);
    setTitle("");
    setDate("");
    setCoverFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button data-testid="button-create-event">
          <Plus className="h-4 w-4 mr-2" />
          Criar Novo Evento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Criar Novo Evento</DialogTitle>
          <DialogDescription>
            Configure seu evento e gere um QR Code para seus convidados
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="event-title">Título do Evento</Label>
            <Input
              id="event-title"
              type="text"
              placeholder="Ex: Casamento Maria & João"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              data-testid="input-event-title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-date">Data do Evento</Label>
            <Input
              id="event-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              data-testid="input-event-date"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-cover">Imagem de Capa</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center hover-elevate">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                className="hidden"
                id="event-cover"
                data-testid="input-event-cover"
              />
              <label htmlFor="event-cover" className="cursor-pointer flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {coverFile ? coverFile.name : "Clique para fazer upload"}
                </p>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)} data-testid="button-cancel">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={!title || !date} data-testid="button-submit">
              Criar Evento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
