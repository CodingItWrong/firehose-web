import {useEffect, useState} from 'react';
import {useNavigate, useParams, useResolvedPath} from 'react-router-dom';
import {useBookmarks} from '../../../data/bookmarks';
import BookmarkDetailForm from './BookmarkDetailForm';

export default function BookmarkDetail({parentPath}) {
  const {pathname} = useResolvedPath();
  const parentPathToUse =
    parentPath ?? pathname.substring(0, pathname.lastIndexOf('/'));
  const {id} = useParams();
  const navigate = useNavigate();
  const bookmarkClient = useBookmarks();

  const [bookmark, setBookmark] = useState(null);

  useEffect(() => {
    bookmarkClient
      .find({id})
      .then(response => {
        setBookmark(response.data);
      })
      .catch(console.error);
  }, [bookmarkClient, id]);

  async function handleSave(attributes) {
    try {
      await bookmarkClient.update({id, attributes});
      navigate(parentPathToUse);
    } catch (e) {
      console.error(e);
    }
  }

  if (!bookmark) {
    return null; // TODO: loading state
  } else {
    return (
      <>
        <h2>Edit Link</h2>
        <BookmarkDetailForm
          attributes={bookmark.attributes}
          cancelPath={parentPathToUse}
          onSave={handleSave}
        />
      </>
    );
  }
}
