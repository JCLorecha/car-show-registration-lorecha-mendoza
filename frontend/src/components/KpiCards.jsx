import KpiCard from './KpiCard.jsx';

const php = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  currencyDisplay: 'narrowSymbol',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const iconClass = 'h-5 w-5';

function RegistrationsIcon() {
  return (
    <svg
      className={iconClass}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M7 3h10a2 2 0 0 1 2 2v14l-3-2-4 2-4-2-3 2V5a2 2 0 0 1 2-2Z" />
      <path d="M8 8h8M8 12h8" />
    </svg>
  );
}

function PaymentsIcon() {
  return (
    <svg
      className={iconClass}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M16 8.5c-.8-.7-2-1-3.2-1-1.8 0-3.1.8-3.1 2.1 0 3.2 6.5 1.3 6.5 4.8 0 1.3-1.3 2.1-3.3 2.1-1.4 0-2.8-.4-3.7-1.2M12 5.5v13" />
    </svg>
  );
}

function StatusIcon() {
  return (
    <svg
      className={iconClass}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M20 11.1V12a8 8 0 1 1-4.7-7.3" />
      <path d="m8.5 11.5 2.5 2.5 7-7" />
    </svg>
  );
}

export default function KpiCards({ summary }) {
  if (!summary) return null;

  const collectionRate = summary.totalFees
    ? (Number(summary.totalPayments) / Number(summary.totalFees)) * 100
    : 0;

  return (
    <section
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
      aria-label="Registration summary"
    >
      <KpiCard
        label="Total Registrations"
        value={summary.totalRegistrations ?? 0}
        accent="emerald"
        icon={<RegistrationsIcon />}
      />
      <KpiCard
        label="Total Payments"
        value={php.format(Number(summary.totalPayments || 0))}
        accent="emerald"
        icon={<PaymentsIcon />}
      />
      <KpiCard
        label="Uncollected Payments"
        value={php.format(Number(summary.uncollectedPayments || 0))}
        accent="amber"
        icon={<PaymentsIcon />}
      />
      <KpiCard
        label="Confirmed"
        value={summary.confirmed ?? 0}
        accent="emerald"
        icon={<StatusIcon />}
      />
      <KpiCard
        label="Checked In"
        value={summary.checkedIn ?? 0}
        accent="cyan"
        icon={<StatusIcon />}
      />
      <KpiCard
        label="Collection Rate"
        value={`${collectionRate.toFixed(1)}%`}
        accent="emerald"
        icon={<PaymentsIcon />}
      />
    </section>
  );
}
