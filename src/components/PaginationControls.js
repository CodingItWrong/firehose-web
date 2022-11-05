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
      <p>
        Page {pageNumber} of {maxPageNumber}
      </p>
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
