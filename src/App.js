import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import TokenLoadBuffer from './components/TokenLoadBuffer';
import {TokenProvider, useToken} from './data/token';
import SignIn from './routes/SignIn';
import Unread from './routes/links/Unread';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Unread />,
  },
]);

export default function App() {
  return (
    <TokenProvider>
      <TokenLoadBuffer>
        <QueryClientProvider client={queryClient}>
          <Body />
        </QueryClientProvider>
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
