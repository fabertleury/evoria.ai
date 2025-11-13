import VideoUploadCard from '../VideoUploadCard';

export default function VideoUploadCardExample() {
  return (
    <VideoUploadCard
      eventTitle="Casamento Ana & Pedro"
      onUpload={(name, file) => console.log('Video uploaded', { name, fileName: file.name })}
    />
  );
}
