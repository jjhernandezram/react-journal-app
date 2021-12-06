import { NoteAppBar } from './NoteAppBar';
import { useForm } from '../../hooks/useForm';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { activateNote } from '../../actions/notes';

export const NoteScreen = ({ note }) => {
  const dispatch = useDispatch();
  const [ formValues, handleInputChange, reset ] = useForm(note);
  const { title, body, url } = formValues;
  const activeId = useRef(note.id);

  useEffect(() => {
    if (activeId.current !== note.id) {
      reset(note);
      activeId.current = note.id;
    }
  }, [ note, reset ]);

  useEffect(() => {
    dispatch(activateNote(formValues.id, { ...formValues }));
  }, [ formValues, dispatch ]);


  return (
    <div className="notes__main-content">
      <NoteAppBar note={note}/>
      <div className="notes__content">
        <input type="text" placeholder="Some awesome title" className="notes__title-input" autoComplete="off"
               name="title" value={title} onChange={handleInputChange}/>
        <textarea placeholder="What happened today" className="notes__textarea"
                  name="body" value={body} onChange={handleInputChange}/>
        {
          (url &&
            <div className="notes__image">
              <img src={note.url} alt="imagen"/>
            </div>)
        }
      </div>
    </div>
  );
};