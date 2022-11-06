import {useState} from 'react';
import {Link} from 'react-router-dom';
import ButtonGroup from '../../../components/ButtonGroup';

export default function BookmarkDetailForm({attributes, onSave, cancelPath}) {
  const [url, setUrl] = useState(attributes.url);
  const [title, setTitle] = useState(attributes.title);
  const [tagList, setTagList] = useState(attributes['tag-list']);
  const [source, setSource] = useState(attributes.source);
  const [comment, setComment] = useState(attributes.comment);

  function handleSave(e) {
    e.preventDefault();
    return onSave({url, title, source, comment, 'tag-list': tagList});
  }

  return (
    <form onSubmit={handleSave}>
      <TextInput
        type="url"
        label="URL"
        value={url ?? ''}
        onChangeText={setUrl}
        className="solid-input"
        data-cy="url-field"
      />
      <TextInput
        label="Title"
        value={title ?? ''}
        onChangeText={setTitle}
        className="solid-input"
        data-cy="title-field"
      />
      <TextInput
        label="Tags"
        value={tagList ?? ''}
        onChangeText={setTagList}
        autoCapitalize="none"
        autoCorrect="off"
        className="solid-input"
        data-cy="tags-field"
      />
      <TextInput
        label="Source"
        value={source ?? ''}
        onChangeText={setSource}
        autoCapitalize="none"
        autoCorrect="off"
        className="solid-input"
        data-cy="source-field"
      />
      <TextInput
        label="Comment"
        value={comment ?? ''}
        onChangeText={setComment}
        className="solid-input"
        data-cy="comment-field"
      />
      <ButtonGroup>
        <Link to={cancelPath} className="solid-button">
          Cancel
        </Link>
        <button type="submit" className="solid-button" data-cy="save-button">
          Save
        </button>
      </ButtonGroup>
    </form>
  );
}

const TextInput = ({label, onChangeText, ...props}) => {
  const id = `field-${label}`;
  return (
    <>
      <div>
        <label htmlFor={id}>{label}</label>
      </div>
      <div>
        <input
          type="text"
          id={id}
          onChange={e => onChangeText(e.target.value)}
          {...props}
        />
      </div>
    </>
  );
};
