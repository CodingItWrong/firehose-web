import {Link} from 'react-router-dom';
import {useToken} from './data/token';

export default function Layout() {
  const {clearToken} = useToken();

  return (
    <>
      <button type="button" onClick={clearToken}>
        Sign Out
      </button>
      <nav>
        <ul>
          <li>
            <Link to="/">Unread</Link>
          </li>
          <li>
            <Link to="/links/read">Read</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
