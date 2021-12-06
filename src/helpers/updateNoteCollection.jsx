import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firabase-config';

export const updateNoteCollection = async (uid, note) => {
  const docRef = doc(db, `${uid}/journal/notes/${note.id}`);
  await updateDoc(docRef, note);
};