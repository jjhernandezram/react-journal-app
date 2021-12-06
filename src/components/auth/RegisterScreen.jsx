import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';


import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import { registerWithEmail } from '../../actions/auth';

export const RegisterScreen = () => {
  const [ formValues, handleInputChange ] = useForm({
    displayName: 'Damian',
    email: 'damian@gmail.com',
    password: '123456',
    password2: '123456'
  });

  const { displayName, email, password, password2 } = formValues;

  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const handleRegister = (e) => {
    e.preventDefault();
    if (formValid()) {
      dispatch(registerWithEmail(email, password, displayName));
    }
  };

  const formValid = () => {
    if (displayName.trim().length < 1) {
      console.log('Name is required.');
      dispatch(setError('Name is required.'));
      return false;

    } else if (!validator.isEmail(email)) {
      dispatch(setError('Must be an email address.'));
      return false;

    } else if (password.length < 6) {
      dispatch(setError('password must be at least 6 characters.'));
      return false;

    } else if (password !== password2) {
      dispatch(setError('passwords do not match.'));
      return false;
    }

    dispatch(removeError());
    return true;
  };

  return (
    <>
      {
        (msgError && <span className="auth__alert-error">{msgError}</span>)
      }
      <h1 className="auth__title"> Register Screen </h1>
      <form onSubmit={handleRegister}>
        <input className="auth__input"
               type="text"
               placeholder="Name"
               name="displayName"
               autoComplete="off"
               value={displayName} onChange={handleInputChange}/>

        <input className="auth__input"
               type="text"
               placeholder="Email"
               name="email"
               autoComplete="off"
               value={email} onChange={handleInputChange}/>

        <input className="auth__input"
               type="password"
               placeholder="Password"
               name="password"
               value={password} onChange={handleInputChange}/>

        <input className="auth__input"
               type="password"
               placeholder="Password"
               name="password2"
               value={password2} onChange={handleInputChange}/>

        <button className="btn btn-primary btn-block" type="submit">Register</button>

        <Link className="link" to="/auth/login">
          Already have an account?, login
        </Link>
      </form>
    </>
  );
};