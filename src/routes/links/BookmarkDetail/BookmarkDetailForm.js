import {useState} from 'react';
import ButtonGroup from '../../../components/ButtonGroup';

export default function BookmarkDetailForm({attributes, onSave, onCancel}) {
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
        value={url}
        onChangeText={setUrl}
        data-cy="url-field"
      />
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        data-cy="title-field"
      />
      <TextInput
        label="Tags"
        value={tagList}
        onChangeText={setTagList}
        autoCapitalize="none"
        autoCorrect={false}
        data-cy="tags-field"
      />
      <TextInput
        label="Source"
        value={source}
        onChangeText={setSource}
        autoCapitalize="none"
        autoCorrect={false}
        data-cy="source-field"
      />
      <TextInput
        label="Comment"
        accessibilityLabel="Comment"
        value={comment}
        onChangeText={setComment}
        data-cy="comment-field"
      />
      <ButtonGroup>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" data-cy="save-button">
          Save
        </button>
      </ButtonGroup>
    </form>
  );
}

const TextInput = ({label, onChangeText, ...props}) => (
  <input
    type="text"
    placeholder={label}
    onChange={e => onChangeText(e.target.value)}
    {...props}
  />
);
