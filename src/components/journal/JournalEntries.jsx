import { JournalEntry } from './JournalEntry';
import { useSelector } from 'react-redux';

export const JournalEntries = () => {
  const { notes } = useSelector(state => state.notes);

  return (
    <div className="journal__entries">
      {
        notes.length === 0
          ? <h1>There's no notes to show</h1>
          : notes.map((note) => (<JournalEntry key={note.id} note={note}/>))
      }
    </div>
  );
};