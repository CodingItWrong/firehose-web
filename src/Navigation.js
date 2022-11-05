import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Layout from './Layout';
import ReadLinks from './routes/links/Read';
import UnreadLinks from './routes/links/Unread';

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

export default function Navigation() {
  return <RouterProvider router={router} />;
}
