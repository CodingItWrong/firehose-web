import {useQuery} from '@tanstack/react-query';
import ErrorMessage from '../../components/ErrorMessage';
import NoRecordsMessage from '../../components/NoRecordsMessage';
import Tag from '../../components/Tag';
import {useTags} from '../../data/tags';

const TAGS_QUERY = 'tags';

export default function TagList() {
  const tagClient = useTags();
  const tagResult = useQuery([TAGS_QUERY], () => tagClient.all());

  const sortedTags =
    tagResult?.data?.data?.sort(
      (a, b) => a.attributes.name > b.attributes.name,
    ) ?? [];

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
      <h2>Tags</h2>
      {listHeader()}
      <ul className="tag-list">
        {sortedTags?.map(tag => (
          <Tag key={tag.id} name={tag.attributes.name} />
        ))}
      </ul>
    </>
  );
}
