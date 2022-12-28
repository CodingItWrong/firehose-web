import {useCallback} from 'react';
import {useParams} from 'react-router-dom';
import BookmarkList from '../../components/BookmarkList';
import {useTags} from '../../data/tags';
import sort from '../../utils/sort';

export default function TaggedLinksScreen() {
  const {tagName} = useParams();
  const tagClient = useTags();

  const query = useCallback(async () => {
    const response = await tagClient.where({
      filter: {name: tagName},
      options: {include: 'bookmarks'},
    });
    const sortedBookmarks = sort(
      response.included,
      b => b.attributes['moved-to-list-at'],
    );
    sortedBookmarks.reverse();
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
