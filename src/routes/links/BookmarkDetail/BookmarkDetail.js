import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useBookmarks} from '../../../data/bookmarks';
import BookmarkDetailForm from './BookmarkDetailForm';

export default function BookmarkDetail({parentPath}) {
  console.log('BookmarkDetail', id);
  const {id} = useParams();
  const navigate = useNavigate();
  console.log({id});
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
      navigate(parentPath);
    } catch (e) {
      console.error(e);
    }
  }

  function handleCancel() {
    navigate(parentPath);
  }

  if (!bookmark) {
    return null; // TODO: loading state
  } else {
    return (
      <BookmarkDetailForm
        attributes={bookmark.attributes}
        onCancel={handleCancel}
        onSave={handleSave}
      />
    );
  }
}
