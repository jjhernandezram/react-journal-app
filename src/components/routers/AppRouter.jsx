import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { AuthRouter } from './AuthRouter';
import { login } from '../../actions/auth';
import { JournalScreen } from '../journal/JournalScreen';
import { Loader } from '../ui/Loader';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadNotes } from '../../actions/notes';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [ checking, setChecking ] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user?.uid) {
          dispatch(login(user.uid, user.displayName));
          dispatch(startLoadNotes(user.uid));
        }
        setChecking(false);
      });
    }, 1000);

  }, [ dispatch, setChecking ]);

  if (checking) {
    return (
      <div className="auth__main">
        <Loader/>
      </div>
    );
  }

  return (

    <Routes>
      <Route path="/auth/*" element={
        <PublicRoute>
          <AuthRouter/>
        </PublicRoute>
      }/>

      <Route path="/" element={
        <PrivateRoute>
          <JournalScreen/>
        </PrivateRoute>
      }/>

      <Route path="*" element={<Navigate to="/auth/login"/>}/>
    </Routes>

  );
};