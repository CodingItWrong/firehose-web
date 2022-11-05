export default function PaginationControls({
  pageNumber,
  maxPageNumber,
  onIncrement,
  onDecrement,
}) {
  const pageNumberAtMin = pageNumber <= 1;
  const pageNumberAtMax = pageNumber >= maxPageNumber;

  return (
    <div>
      <button
        type="button"
        data-cy="previous-page-button"
        disabled={pageNumberAtMin}
        onClick={onDecrement}
      >
        &lt;
      </button>
      <span>
        {' '}
        Page {pageNumber} of {maxPageNumber}{' '}
      </span>
      <button
        type="button"
        data-cy="next-page-button"
        disabled={pageNumberAtMax}
        onClick={onIncrement}
      >
        &gt;
      </button>
    </div>
  );
}
