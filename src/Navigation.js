import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Layout from './Layout';
import BookmarkDetail from './routes/links/BookmarkDetail';
import ReadLinks from './routes/links/Read';
import UnreadLinks from './routes/links/Unread';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <UnreadLinks />,
      },
      {
        path: 'links/unread/:id',
        element: <BookmarkDetail parentPath="/" />,
      },
      {
        path: 'links/read/:id',
        element: <BookmarkDetail parentPath="/links/read" />,
      },
      {
        path: 'links/read',
        element: <ReadLinks />,
      },
    ],
  },
]);

export default function Navigation() {
  return <RouterProvider router={router} />;
}
