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
        disabled={pageNumberAtMin}
        onClick={onDecrement}
        className="solid-button"
        data-cy="previous-page-button"
      >
        &lt;
      </button>
      <span>
        {' '}
        Page {pageNumber} of {maxPageNumber}{' '}
      </span>
      <button
        type="button"
        disabled={pageNumberAtMax}
        onClick={onIncrement}
        className="solid-button"
        data-cy="next-page-button"
      >
        &gt;
      </button>
    </div>
  );
}
