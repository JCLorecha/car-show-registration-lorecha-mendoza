export default function KpiCard({ label, value, accent = 'emerald', icon }) {
  const accents = {
    emerald: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
    amber: 'border-amber-500/20 bg-amber-500/10 text-amber-400',
    cyan: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-400',
    violet: 'border-violet-500/20 bg-violet-500/10 text-violet-400',
  };

  return (
    <article className="group relative min-w-0 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-[0_12px_35px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-[0_16px_38px_rgba(16,185,129,0.09)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold leading-5 uppercase tracking-[0.12em] text-slate-400">{label}</p>
          <p className="mt-3 text-2xl font-bold tabular-nums text-white sm:text-[1.65rem]">{value}</p>
        </div>
        {icon && (
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${accents[accent] || accents.emerald}`}>
            {icon}
          </div>
        )}
      </div>
    </article>
  );
}
