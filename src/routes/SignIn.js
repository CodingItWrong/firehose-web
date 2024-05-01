import {useState} from 'react';
import oauthLogin from '../auth/oauthLogin';
import useLoginForm from '../auth/useLoginForm';
import ErrorMessage from '../components/ErrorMessage';
import Title from '../components/Title';
import httpClient from '../data/httpClient';
import {useToken} from '../data/token';

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const {setToken} = useToken();
  const onLogIn = ({username, password}) =>
    oauthLogin({
      httpClient: httpClient(),
      username,
      password,
    }).then(setToken);
  const {username, password, error, handleChange, handleLogIn} =
    useLoginForm(onLogIn);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await handleLogIn();
    setLoading(false);
  }

  return (
    <>
      <Title />
      <form onSubmit={handleSubmit}>
        <div>
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
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            data-cy="password-field"
            value={password}
            onChange={handleChange('password')}
            className="solid-input"
          />
        </div>
        <ErrorMessage>{error}</ErrorMessage>
        <button
          type="submit"
          data-cy="sign-in-button"
          className="solid-button"
          disabled={loading}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </>
  );
}
