import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithGoogle, loginWithEmail } from '../../actions/auth';

export const LoginScreen = () => {
  const [ { email, password }, handleInputChange ] = useForm({ email: 'damian@gmail.com', password: '123456' });
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const handleFormLogin = (e) => {
    e.preventDefault();
    dispatch(loginWithEmail(email, password));
  };

  const handleGoogleSignIn = () => {
    dispatch(loginWithGoogle());
  };

  return (
    <>
      <h1 className="auth__title">Login Screen</h1>
      <form onSubmit={handleFormLogin}>
        <input className="auth__input"
               type="text"
               placeholder="Email"
               autoComplete="off"
               name="email" value={email} onChange={handleInputChange}/>

        <input className="auth__input"
               type="password"
               placeholder="Password"
               name="password" value={password} onChange={handleInputChange}/>

        <button className="btn btn-primary btn-block" disabled={loading} type="submit">Login</button>
        <div>
          <p className="auth__social-network">Login with social network</p>
          <div className="google-btn" onClick={handleGoogleSignIn}>
            <div className="google-icon-wrapper">
              <img className="google-icon"
                   src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                   alt="google button"/>
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link className="link" to="/auth/register">
          Create new account
        </Link>
      </form>
    </>
  );
};
