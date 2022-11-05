import reverse from 'lodash/reverse';
import sortBy from 'lodash/sortBy';
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
    const sortedBookmarks = reverse(sortBy(bookmarks, 'moved-to-list-at'));
    return sortedBookmarks;
  }, [tagClient, tagName]);
  const queryKey = ['links-for-tag', tagName];

  return <BookmarkList query={query} queryKey={queryKey} />;
}
