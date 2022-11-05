import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Layout from './Layout';
import TokenLoadBuffer from './components/TokenLoadBuffer';
import {TokenProvider, useToken} from './data/token';
import SignIn from './routes/SignIn';
import ReadLinks from './routes/links/Read';
import UnreadLinks from './routes/links/Unread';

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
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <UnreadLinks />,
      },
      {
        path: '/links/read',
        element: <ReadLinks />,
      },
    ],
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
        <RouterProvider router={router} />
      </div>
    );
  } else {
    return <SignIn />;
  }
}
