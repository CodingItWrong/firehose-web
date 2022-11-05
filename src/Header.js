import {Link} from 'react-router-dom';
import {useToken} from './data/token';

export default function Layout() {
  const {clearToken} = useToken();

  return (
    <>
      <h1>Firehose</h1>
      <button type="button" data-cy="sign-out-button" onClick={clearToken}>
        Sign Out
      </button>
      <nav>
        <ul>
          <li>
            <Link to="/">Unread</Link>
          </li>
          <li>
            <Link to="/links/read" data-cy="read-link">
              Read
            </Link>
          </li>
          <li>
            <Link to="/tags" data-cy="tags-link">
              Tags
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
