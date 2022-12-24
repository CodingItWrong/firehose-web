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
      <div>
        <label htmlFor="url-to-add-field">URL to add</label>
      </div>
      <div className="input-row">
        <input
          type="url"
          id="url-to-add-field"
          data-cy="url-to-add-field"
          value={url}
          onChange={e => setUrl(e.target.value)}
          autoCapitalize="none"
          autoCorrect="off"
          className="solid-input"
        />
      </div>
      {isCreating && <div>Saving…</div>}
    </form>
  );
}
