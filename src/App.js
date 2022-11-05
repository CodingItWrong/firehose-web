import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import TokenLoadBuffer from './components/TokenLoadBuffer';
import {TokenProvider, useToken} from './data/token';
import Detail from './routes/Detail';
import Home from './routes/Home';
import SignIn from './routes/SignIn';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/detail',
    element: <Detail />,
  },
]);

export default function App() {
  return (
    <TokenProvider>
      <TokenLoadBuffer>
        <Body />
      </TokenLoadBuffer>
    </TokenProvider>
  );
}

function Body() {
  const {isLoggedIn, clearToken} = useToken();

  if (isLoggedIn) {
    return (
      <div>
        <button type="button" onClick={clearToken}>
          Sign Out
        </button>
        <RouterProvider router={router} />
      </div>
    );
  } else {
    return <SignIn />;
  }
}
