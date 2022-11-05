import ErrorMessage from '../ErrorMessage';
import LoadingIndicator from '../LoadingIndicator';
import NoRecordsMessage from '../NoRecordsMessage';
import BookmarkRow from './BookmarkRow';

export const LOADING_INDICATOR = {
  FLATLIST: 'FLATLIST', // intuitive on mobile
  STANDALONE: 'STANDALONE', // for initial loading and loading via button on web
};

export default function BookmarkFlatList({
  bookmarks,
  path,
  errorMessage,
  loadingIndicator,
  onRefresh,
  onMarkRead,
  onMarkUnread,
  onDelete,
}) {
  const refreshFromButton = () => onRefresh(LOADING_INDICATOR.STANDALONE);

  function listHeader() {
    if (errorMessage) {
      return <ErrorMessage>{errorMessage}</ErrorMessage>;
    } else if (bookmarks?.length === 0) {
      return <NoRecordsMessage>No unread links.</NoRecordsMessage>;
    } else {
      return null;
    }
  }

  return (
    <>
      {listHeader()}
      <button
        type="button"
        onClick={refreshFromButton}
        className="solid-button"
      >
        Reload
      </button>
      {loadingIndicator === LOADING_INDICATOR.STANDALONE && (
        <LoadingIndicator />
      )}
      <ul data-cy="bookmarks-list" className="bookmarks-list">
        {bookmarks.map(bookmark => (
          <BookmarkRow
            key={bookmark.id}
            bookmark={bookmark}
            path={path}
            onMarkRead={() => onMarkRead(bookmark)}
            onMarkUnread={() => onMarkUnread(bookmark)}
            onDelete={() => onDelete(bookmark)}
          />
        ))}
      </ul>
    </>
  );
}
