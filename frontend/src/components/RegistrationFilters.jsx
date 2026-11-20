import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce.js';

export default function RegistrationFilters({
  participantName,
  type,
  status,
  onParticipantNameChange,
  onTypeChange,
  onStatusChange,
  onClear,
}) {
  const [searchText, setSearchText] = useState(participantName);
  const debouncedSearch = useDebounce(searchText, 400);

  useEffect(() => setSearchText(participantName), [participantName]);

  useEffect(() => {
    if (debouncedSearch !== participantName) {
      onParticipantNameChange(debouncedSearch);
    }
  }, [debouncedSearch, participantName, onParticipantNameChange]);

  const controlClass =
    'h-11 w-full rounded-lg border border-zinc-700 bg-zinc-950/70 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-zinc-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20';

  return (
    <section
      className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-[0_12px_35px_rgba(0,0,0,0.16)]"
      aria-label="Registration filters"
    >
      <div className="mb-3 flex items-center gap-2">
        <svg
          className="h-4 w-4 text-emerald-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M4 5h16M7 12h10M10 19h4" />
        </svg>
        <h2 className="text-sm font-semibold text-white">Registration Filters</h2>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-[minmax(240px,2fr)_minmax(150px,1fr)_minmax(170px,1fr)_auto]">
        <label className="relative">
          <span className="sr-only">Search participant name</span>
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
          <input
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search participant name..."
            className={`${controlClass} pl-10`}
          />
        </label>

        <label>
          <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Type
          </span>
          <select
            value={type}
            onChange={(event) => onTypeChange(event.target.value)}
            className={controlClass}
          >
            <option>All</option>
            <option>Exhibitor</option>
            <option>Competitor</option>
            <option>VIP</option>
          </select>
        </label>

        <label>
          <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Status
          </span>
          <select
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            className={controlClass}
          >
            <option>All</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>CheckedIn</option>
            <option>Cancelled</option>
          </select>
        </label>

        <div className="flex items-end md:col-span-2 lg:col-span-1">
          <button
            type="button"
            onClick={onClear}
            className="h-11 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 text-sm font-semibold text-slate-300 transition hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300 lg:w-auto"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </section>
  );
}
