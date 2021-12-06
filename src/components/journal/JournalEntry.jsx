import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activateNote } from '../../actions/notes';

export const JournalEntry = ({ note }) => {
  const { id, date, title, body, url } = note;
  const entryDate = moment(date);
  const dispatch = useDispatch();

  const handleActiveNote = () => {
    dispatch(activateNote(id, { date, title, body, url }));
  };

  return (
    <div onClick={handleActiveNote} className="journal__entry pointer">
      {url &&
      <div className="journal__entry-picture" style={{
        backgroundSize: 'cover',
        backgroundImage: `url(${url})`
      }}>
      </div>}
      <div className="journal__entry-body">
        <p className="journal__entry-title">
          {title}
        </p>
        <p className="journal__entry-content">{body}</p>
      </div>
      <div className="journal__entry-date">
        <span>{entryDate.format('dddd')}</span>
        <h3>{entryDate.format('Do')}</h3>
      </div>
    </div>
  );
};