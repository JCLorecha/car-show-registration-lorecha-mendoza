export default function Pagination({
  page,
  pageSize,
  totalCount,
  totalPages,
  loading,
  onPageChange,
  onPageSizeChange,
}) {
  const safeTotalPages = Math.max(1, totalPages || 1);
  const first = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const last = Math.min(page * pageSize, totalCount);

  const start = Math.max(1, page - 2);
  const end = Math.min(safeTotalPages, start + 4);
  const pageNumbers = Array.from({ length: end - start + 1 }, (_, index) => start + index);
  const controlClass = 'h-9 min-w-9 rounded-md border border-zinc-700 bg-zinc-950 text-sm font-semibold text-slate-300 transition hover:border-emerald-500/50 hover:text-emerald-300 disabled:cursor-not-allowed disabled:border-zinc-800 disabled:text-zinc-600 disabled:opacity-60';

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 shadow-[0_12px_35px_rgba(0,0,0,0.16)] lg:flex-row lg:items-center lg:justify-between">
      <div className="text-sm text-slate-400">Showing <span className="font-semibold tabular-nums text-slate-200">{first}-{last}</span> of <span className="font-semibold tabular-nums text-slate-200">{totalCount}</span></div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="mr-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Rows
          <select value={pageSize} disabled={loading} onChange={(event) => onPageSizeChange(Number(event.target.value))} className="h-9 rounded-md border border-zinc-700 bg-zinc-950 px-2 text-sm normal-case text-white outline-none focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-50">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>

        <button type="button" disabled={loading || page <= 1} onClick={() => onPageChange(page - 1)} className={`${controlClass} px-3`}>Prev</button>

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            disabled={loading}
            onClick={() => onPageChange(pageNumber)}
            className={`${controlClass} ${pageNumber === page ? 'border-emerald-500 bg-emerald-500 text-zinc-950 hover:text-zinc-950 shadow-[0_0_18px_rgba(16,185,129,0.18)]' : ''}`}
            aria-current={pageNumber === page ? 'page' : undefined}
          >
            {pageNumber}
          </button>
        ))}

        <button type="button" disabled={loading || page >= safeTotalPages} onClick={() => onPageChange(page + 1)} className={`${controlClass} px-3`}>Next</button>
      </div>
    </div>
  );
}
