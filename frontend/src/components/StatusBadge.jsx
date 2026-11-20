const styles = {
  Pending: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
  Confirmed: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
  CheckedIn: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300',
  Cancelled: 'border-rose-400/20 bg-rose-400/10 text-rose-300',
};

const labels = { CheckedIn: 'Checked In' };

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex whitespace-nowrap items-center rounded-md border px-2 py-1 text-xs font-semibold ${styles[status] || 'border-zinc-700 bg-zinc-800 text-slate-300'}`}>
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {labels[status] || status || 'Unknown'}
    </span>
  );
}
