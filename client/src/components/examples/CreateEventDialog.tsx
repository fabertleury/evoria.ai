import CreateEventDialog from '../CreateEventDialog';

export default function CreateEventDialogExample() {
  return (
    <div className="p-8">
      <CreateEventDialog onCreateEvent={(title, date, cover) => console.log('Event created:', { title, date, coverName: cover?.name })} />
    </div>
  );
}
