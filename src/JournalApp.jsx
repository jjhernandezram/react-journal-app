import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

import { AppRouter } from './components/routers/AppRouter';

export const JournalApp = () => {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
      </Provider>
    </>
  );
};