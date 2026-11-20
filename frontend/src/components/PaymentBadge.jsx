const styles = {
  Unpaid: 'border-red-400/20 bg-red-400/10 text-red-300',
  Partial: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
  Paid: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
};

export default function PaymentBadge({ status }) {
  return (
    <span className={`inline-flex whitespace-nowrap items-center rounded-md border px-2 py-1 text-xs font-semibold ${styles[status] || 'border-zinc-700 bg-zinc-800 text-slate-300'}`}>
      {status || 'Unknown'}
    </span>
  );
}
