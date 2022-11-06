import {useCallback} from 'react';
import {useParams} from 'react-router-dom';
import BookmarkList from '../../components/BookmarkList';
import {useTags} from '../../data/tags';

export default function TaggedLinksScreen() {
  const {tagName} = useParams();
  const tagClient = useTags();

  const query = useCallback(async () => {
    const response = await tagClient.where({
      filter: {name: tagName},
      options: {include: 'bookmarks'},
    });
    const bookmarks = response.included;
    console.log({bookmarks});
    const sortedBookmarks = bookmarks.sort(
      (a, b) =>
        a.attributes['moved-to-list-at'] < b.attributes['moved-to-list-at'],
    );
    return sortedBookmarks;
  }, [tagClient, tagName]);
  const queryKey = ['links-for-tag', tagName];

  return (
    <>
      <h2>Tag: {tagName}</h2>
      <BookmarkList
        query={query}
        queryKey={queryKey}
        path={`/tags/${tagName}`}
      />
    </>
  );
}
