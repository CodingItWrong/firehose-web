import oauthLogin from '../auth/oauthLogin';
import useLoginForm from '../auth/useLoginForm';
import ErrorMessage from '../components/ErrorMessage';
import Title from '../components/Title';
import httpClient from '../data/httpClient';
import {useToken} from '../data/token';

export default function SignIn() {
  const {setToken} = useToken();
  const onLogIn = ({username, password}) =>
    oauthLogin({
      httpClient: httpClient(),
      username,
      password,
    }).then(setToken);
  const {username, password, error, handleChange, handleLogIn} =
    useLoginForm(onLogIn);

  function handleSubmit(e) {
    e.preventDefault();
    handleLogIn();
  }

  return (
    <>
      <Title />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          data-cy="email-field"
          value={username}
          onChange={handleChange('username')}
          autoCapitalize="none"
          autoCorrect="off"
          className="solid-input"
        />
        <input
          type="password"
          placeholder="Password"
          data-cy="password-field"
          value={password}
          onChange={handleChange('password')}
          className="solid-input"
        />
        <ErrorMessage>{error}</ErrorMessage>
        <button type="submit" data-cy="sign-in-button" className="solid-button">
          Sign in
        </button>
      </form>
    </>
  );
}
