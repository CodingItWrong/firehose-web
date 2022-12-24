import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import domainForUrl from '../../utils/domainForUrl';
import Tag from '../Tag';

export default function BookmarkRow({
  bookmark,
  path,
  onMarkRead,
  onMarkUnread,
  onDelete,
}) {
  const navigate = useNavigate();
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
      <a
        href={bookmark.attributes.url}
        target="_blank"
        rel="noreferrer"
        className="bookmark__url"
      >
        {domainForUrl(url)}
      </a>
    );
  }

  return (
    <li className="bookmark">
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
        <div className="bookmark__title">{renderTitle()}</div>
        {comment ? <div>{comment}</div> : null}
        <div>
          {renderUrl()}
          <Source source={source} />
        </div>
        {tags.length > 0 && (
          <ul className="tag-list">
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
        <ButtonWithSpacing
          data-cy="edit-link"
          onClick={() => navigate(`${path}/${bookmark.id}`)}
        >
          Edit
        </ButtonWithSpacing>{' '}
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
  return (
    <button {...props} className="solid-button">
      {children}
    </button>
  );
}

function Source({source}) {
  if (!source) {
    return null;
  }

  function renderSource() {
    const domain = domainForUrl(source);
    const contents = (
      <span className="bookmark__source">From {domain || source}</span>
    );
    const wrapper = domain ? (
      <a
        href={source}
        target="_blank"
        rel="noreferrer"
        className="bookmark__url"
      >
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
