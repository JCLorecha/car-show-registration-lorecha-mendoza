import StatusBadge from './StatusBadge.jsx';
import PaymentBadge from './PaymentBadge.jsx';

const php = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  currencyDisplay: 'narrowSymbol',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export default function RegistrationTable({ registrations }) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1180px] border-collapse text-left text-sm">
          <thead className="border-b border-zinc-800 bg-zinc-950/70 text-[11px] uppercase tracking-[0.12em] text-slate-400">
            <tr>
              <th className="px-4 py-3.5 font-semibold">Reg. No.</th>
              <th className="px-4 py-3.5 font-semibold">Date</th>
              <th className="px-4 py-3.5 font-semibold">Participant</th>
              <th className="px-4 py-3.5 font-semibold">Car</th>
              <th className="px-4 py-3.5 font-semibold">Type</th>
              <th className="px-4 py-3.5 font-semibold">Status</th>
              <th className="px-4 py-3.5 text-right font-semibold">Fee / Paid</th>
              <th className="px-4 py-3.5 font-semibold">Payment</th>
              <th className="px-4 py-3.5 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80">
            {registrations.map((registration) => (
              <tr key={registration.id} className="group transition hover:bg-emerald-500/[0.055]">
                <td className="whitespace-nowrap px-4 py-4 font-mono text-xs font-bold text-emerald-400">{registration.registrationNumber}</td>
                <td className="whitespace-nowrap px-4 py-4 text-slate-300">{formatDate(registration.registrationDate)}</td>
                <td className="min-w-[190px] px-4 py-4">
                  <div className="font-semibold text-white">{registration.participantName}</div>
                  {registration.contactNumber && <div className="mt-1 text-xs text-slate-400">{registration.contactNumber}</div>}
                  {registration.email && <div className="text-xs text-slate-500">{registration.email}</div>}
                </td>
                <td className="min-w-[180px] px-4 py-4">
                  <div className="font-medium text-slate-200">{registration.carMakeModel}</div>
                  {registration.plateNumber && <div className="mt-1 font-mono text-xs text-slate-400">{registration.plateNumber}</div>}
                </td>
                <td className="whitespace-nowrap px-4 py-4">
                  <span className="rounded-md border border-zinc-700 bg-zinc-800/70 px-2 py-1 text-xs font-medium text-slate-300">{registration.registrationType}</span>
                </td>
                <td className="px-4 py-4"><StatusBadge status={registration.status} /></td>
                <td className="whitespace-nowrap px-4 py-4 text-right font-medium tabular-nums text-slate-200">
                  {php.format(Number(registration.registrationFee || 0))}
                  <span className="mx-1 text-zinc-600">/</span>
                  <span className="text-emerald-400">{php.format(Number(registration.amountPaid || 0))}</span>
                </td>
                <td className="px-4 py-4"><PaymentBadge status={registration.paymentStatus} /></td>
                <td className="px-4 py-4 text-right">
                  <button type="button" className="rounded-md border border-zinc-700 bg-zinc-950/60 px-2.5 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-emerald-500/50 hover:text-emerald-300" aria-label={`View ${registration.registrationNumber}`}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
