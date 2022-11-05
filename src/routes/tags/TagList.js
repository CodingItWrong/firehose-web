import {useQuery} from '@tanstack/react-query';
import sortBy from 'lodash/sortBy';
import ErrorMessage from '../../components/ErrorMessage';
import NoRecordsMessage from '../../components/NoRecordsMessage';
import Tag from '../../components/Tag';
import {useTags} from '../../data/tags';

const TAGS_QUERY = 'tags';

export default function TagList() {
  const tagClient = useTags();
  const tagResult = useQuery([TAGS_QUERY], () => tagClient.all());

  const sortedTags = sortBy(tagResult?.data?.data, 'attributes.name');

  function listHeader() {
    if (tagResult.isError) {
      return <ErrorMessage>An error occurred while loading tags.</ErrorMessage>;
    } else if (sortedTags.length === 0) {
      return <NoRecordsMessage>No tags.</NoRecordsMessage>;
    } else {
      return null;
    }
  }

  return (
    <>
      {listHeader()}
      <ul>
        {sortedTags?.map(tag => (
          <Tag key={tag.attributes.name} name={tag.attributes.name} />
        ))}
      </ul>
    </>
  );
}