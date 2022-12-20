export default function sort(array, getSortKey) {
  const sortedArray = [...array];
  sortedArray.sort((a, b) => {
    const aSortKey = getSortKey(a);
    const bSortKey = getSortKey(b);

    if (aSortKey < bSortKey) {
      return -1;
    } else if (aSortKey > bSortKey) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortedArray;
}
