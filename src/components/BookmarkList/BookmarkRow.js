import {useState} from 'react';
import {Link} from 'react-router-dom';
import domainForUrl from '../../utils/domainForUrl';
import Tag from '../Tag';

export default function BookmarkRow({
  bookmark,
  path,
  onMarkRead,
  onMarkUnread,
  onDelete,
}) {
  console.log('BookmarkRow', {bookmark});
  // const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
  const [isUpdateInProgress, setIsUpdateInProgress] = useState(false);

  const {title, url, source, comment} = bookmark.attributes;

  const tagList = bookmark.attributes['tag-list'];
  const tags = tagList ? tagList.split(' ') : [];

  async function handleMarkRead() {
    setIsUpdateInProgress(true);
    try {
      await onMarkRead();
      // need to not setUpdateInProgress(false) upon success because row will be removed
    } catch {
      setIsUpdateInProgress(false);
    }
  }

  function renderTitle() {
    return (
      <a href={bookmark.attributes.url} target="_blank" rel="noreferrer">
        {title}
      </a>
    );
  }

  function renderUrl() {
    return (
      <a href={bookmark.attributes.url} target="_blank" rel="noreferrer">
        {domainForUrl(url)}
      </a>
    );
  }

  return (
    <li>
      {/*<Portal>
        <Dialog visible={isDeleteDialogVisible}>
          <Dialog.Title>Are you sure?</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Are you sure you want to delete the bookmark "{title}"?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <ButtonWithSpacing onPress={() => setIsDeleteDialogVisible(false)}>
              Cancel
            </ButtonWithSpacing>
            <ButtonWithSpacing mode="contained" onPress={onDelete}>
              Yes, Delete
            </ButtonWithSpacing>
          </Dialog.Actions>
        </Dialog>
      </Portal>*/}
      <div>
        {renderTitle()}
        {comment ? <p>{comment}</p> : null}
        <div>
          {renderUrl()}
          <Source source={source} />
        </div>
        {tags.length > 0 && (
          <ul>
            {tags.map(tag => (
              <Tag key={tag} name={tag} />
            ))}
          </ul>
        )}
      </div>
      <div>
        {bookmark.attributes.read ? (
          <ButtonWithSpacing
            data-cy="mark-unread-button"
            onClick={onMarkUnread}
          >
            Mark Unread
          </ButtonWithSpacing>
        ) : (
          <ButtonWithSpacing
            onClick={handleMarkRead}
            data-cy="mark-read-button"
            disabled={isUpdateInProgress}
          >
            Mark Read
          </ButtonWithSpacing>
        )}{' '}
        <Link to={`${path}/${bookmark.id}`} data-cy="edit-link">
          Edit
        </Link>{' '}
        <ButtonWithSpacing
          mode="contained"
          onClick={() => onDelete()}
          data-cy="delete-button"
          disabled={isUpdateInProgress}
        >
          Delete
        </ButtonWithSpacing>
      </div>
    </li>
  );
}

function ButtonWithSpacing({children, ...props}) {
  return <button {...props}>{children}</button>;
}

function Source({source}) {
  if (!source) {
    return null;
  }

  function renderSource() {
    const domain = domainForUrl(source);
    const contents = <p>From {domain || source}</p>;
    const wrapper = domain ? (
      <a href={source} target="_blank" rel="noreferrer">
        {contents}
      </a>
    ) : (
      contents
    );

    return wrapper;
  }

  return (
    <>
      {' | '}
      {renderSource()}
    </>
  );
}
