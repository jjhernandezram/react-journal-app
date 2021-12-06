import { types } from '../types/types';
import {
  getAuth, signInWithPopup, createUserWithEmailAndPassword,
  updateProfile, signInWithEmailAndPassword, signOut
} from 'firebase/auth';

import Swal from 'sweetalert2';

import { googleAuthProvider } from '../firebase/firabase-config';
import { finishLoading, startLoading } from './ui';
import { logoutNotes } from './notes';

export const loginWithEmail = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch(err => {
        console.log(err);
        dispatch(finishLoading());
        Swal.fire('Error', err.message, 'error');
      });
  };
};

export const registerWithEmail = (email, password, name) => {
  return (dispatch) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, { displayName: name });
        dispatch(login(user.uid, user.displayName));
      })
      .catch(err => Swal.fire('Error', err.message, 'error'));
  };
};

export const loginWithGoogle = () => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch(err => Swal.fire('Error', err.message, 'error'));
  };
};
export const starLogout = () => {
  return (dispatch) => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(logout());
        dispatch(logoutNotes());
      })
      .catch(err => Swal.fire('Error', err.message, 'error'));
  };
};

export const login = (uid, displayName) => (
  {
    type: types.login,
    payload: {
      uid,
      displayName
    }
  }
);

export const logout = () => (
  {
    type: types.logout,
  }
);