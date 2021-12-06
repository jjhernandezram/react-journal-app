import moment from 'moment';
import { startFileUpload, startNoteDelete, startNoteFirebaseUpdate } from '../../actions/notes';
import { useDispatch, useSelector } from 'react-redux';

export const NoteAppBar = ({ date }) => {
  const entryDate = moment(date);
  const dispatch = useDispatch();
  const { active } = useSelector(state => state.notes);

  const handleDeleteNote = async () => {
    dispatch(startNoteDelete(active));
  };

  const handleNoteUpdate = async () => {
    dispatch(startNoteFirebaseUpdate(active));
  };

  const handleFileUpload = () => {
    document.querySelector('#fileSelector').click();
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) dispatch(startFileUpload(file));
  };

  return (
    <div className="notes__appbar">
      <span>{entryDate.format('MMMM Do YYYY')}</span>
      <input type="file" name="file" id="fileSelector" style={{ display: 'none' }} onChange={handleFileInput}/>
      <div>
        <button className="btn btn-warning" onClick={handleDeleteNote}>Delete</button>
        <button className="btn btn-primary" onClick={handleFileUpload}>Picture</button>
        <button className="btn btn-primary" onClick={handleNoteUpdate}>Save</button>
      </div>
    </div>
  );
};