import {useState} from 'react';

export default function SearchForm({value, onSubmit}) {
  const [searchText, setSearchText] = useState(value ?? '');

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(searchText);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        autoCapitalize="none"
        autoCorrect="off"
      />
    </form>
  );
}
