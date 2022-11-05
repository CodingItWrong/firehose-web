import {useState} from 'react';

export default function NewBookmarkForm({isCreating, onCreate}) {
  const [url, setUrl] = useState('');

  async function handleCreate(e) {
    e.preventDefault();
    if (url !== '') {
      try {
        await onCreate(url);
        setUrl('');
      } catch {
        // no-op
      }
    }
  }

  return (
    <form onSubmit={handleCreate}>
      <input
        type="url"
        placeholder="URL to Add"
        data-cy="url-to-add-field"
        value={url}
        onChange={e => setUrl(e.target.value)}
        autoCapitalize="none"
        autoCorrect="off"
      />
      {isCreating && <span>Saving…</span>}
    </form>
  );
}
