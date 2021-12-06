import { JournalEntries } from './JournalEntries';
import { useDispatch, useSelector } from 'react-redux';
import { starLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(starLogout());

  };

  const handleNewEntry = () => {
    dispatch(startNewNote());
  };

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon"/>
          <span>{name}</span>
        </h3>
        <button className="btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className="journal__new-entry" onClick={handleNewEntry}>
        <i className="far fa-calendar-plus fa-3x"/>
        <p className="mt-1">New entry</p>
      </div>

      <JournalEntries/>
    </aside>
  );
};