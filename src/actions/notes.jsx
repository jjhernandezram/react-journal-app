import { addDoc, collection, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { db } from '../firebase/firabase-config';
import { types } from '../types/types';
import { getNotesCollection } from '../helpers/getNotesCollection';
import { fileUpload } from '../helpers/fileUpload';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const newNote = {
      title: '',
      body: '',
      url: '',
      date: new Date().getTime(),
    };

    const docRef = await addDoc(collection(db, `${uid}/journal/notes`), newNote);
    dispatch(activateNote(docRef.id, newNote));
    dispatch(addNewNote(docRef.id, newNote));
  };
};

export const activateNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note
  }
});

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note
  }
});

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: [ ...notes ]
});

export const startLoadNotes = (uid) => {
  return async (dispatch) => {
    const notes = await getNotesCollection(uid);
    dispatch((setNotes(notes)));
  };
};

export const updateNote = (id, note) => ({
  type: types.notesUpdate,
  payload: {
    id, note: { id, ...note }
  }
});

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id
});

export const startNoteFirebaseUpdate = (note) => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth;

      const firestoreNoteUpdate = { ...note };
      delete firestoreNoteUpdate.id;

      const docRef = doc(db, `${uid}/journal/notes/${note.id}`);
      await updateDoc(docRef, firestoreNoteUpdate);
      dispatch(updateNote(note.id, firestoreNoteUpdate));
      Swal.fire('Saved', note.title, 'success');

    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };
};

export const startFileUpload = (file) => {
  return async (dispatch, getState) => {

    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const { active } = getState().notes;
    active.url = await fileUpload(file);
    dispatch(startNoteFirebaseUpdate(active));

    Swal.close();
  };
};

export const startNoteDelete = (note) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    const docRef = doc(db, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);
    dispatch(deleteNote(note.id));

    Swal.fire('Saved', note.title, 'success');

  };
};

export const logoutNotes = () => ({
  type: types.notesLogout
});