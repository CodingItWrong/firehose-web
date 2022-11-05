import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Layout from './Layout';
import BookmarkDetail from './routes/links/BookmarkDetail';
import ReadLinks from './routes/links/Read';
import UnreadLinks from './routes/links/Unread';
import TagList from './routes/tags/TagList';
import TaggedLinks from './routes/tags/TaggedLinks';

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
        element: <BookmarkDetail />,
      },
      {
        path: 'links/read',
        element: <ReadLinks />,
      },
      {
        path: 'tags/:tagName/:id',
        element: <BookmarkDetail />,
      },
      {
        path: 'tags/:tagName',
        element: <TaggedLinks />,
      },
      {
        path: 'tags',
        element: <TagList />,
      },
    ],
  },
]);

export default function Navigation() {
  return <RouterProvider router={router} />;
}
