import {Link} from 'react-router-dom';
import {useToken} from './data/token';

export default function Layout() {
  const {clearToken} = useToken();

  return (
    <header className="site-header">
      <h1 className="site-header__title">Firehose</h1>
      <nav>
        <ul className="site-nav__list">
          <NavItem>
            <Link to="/">Unread</Link>
          </NavItem>
          <NavItem>
            <Link to="/links/read" data-cy="read-link">
              Read
            </Link>
          </NavItem>
          <NavItem>
            {' '}
            <Link to="/tags" data-cy="tags-link">
              Tags
            </Link>
          </NavItem>
          <NavItem>
            {' '}
            <button
              type="button"
              data-cy="sign-out-button"
              onClick={clearToken}
              className="link"
            >
              Sign Out
            </button>
          </NavItem>
        </ul>
      </nav>
    </header>
  );
}

function NavItem({children}) {
  return <li className="site-nav__list-item">{children}</li>;
}
