import { useEffect, useState } from 'react';
import KpiCards from '../components/KpiCards.jsx';
import RegistrationFilters from '../components/RegistrationFilters.jsx';
import RegistrationTable from '../components/RegistrationTable.jsx';
import Pagination from '../components/Pagination.jsx';
import { getRegistrations, getSummary } from '../api/sample-data.js';

const php = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  currencyDisplay: 'narrowSymbol',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const navigation = [
  { name: 'Dashboard', icon: 'grid' },
  { name: 'Registrations', icon: 'registrations' },
  { name: 'Payments', icon: 'payments' },
  { name: 'Reports', icon: 'reports' },
  { name: 'Settings', icon: 'settings' },
];

function NavIcon({ type }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    registrations: <><path d="M7 3h10a2 2 0 0 1 2 2v14l-3-2-4 2-4-2-3 2V5a2 2 0 0 1 2-2Z"/><path d="M9 8h6M9 12h6"/></>,
    payments: <><circle cx="12" cy="12" r="9"/><path d="M16 8.5c-.8-.7-2-1-3.2-1-1.8 0-3.1.8-3.1 2.1 0 3.2 6.5 1.3 6.5 4.8 0 1.3-1.3 2.1-3.3 2.1-1.4 0-2.8-.4-3.7-1.2M12 5.5v13"/></>,
    reports: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-2.6V20a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L7.6 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 6.4 14H6v-2.6h.4A1.7 1.7 0 0 0 8 10.4a1.7 1.7 0 0 0-.3-1.9L7.6 8l1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 12.4 5v-.2H15V5a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 8l-.1.1a1.7 1.7 0 0 0-.3 1.9A1.7 1.7 0 0 0 21 11h.2v2.6H21a1.7 1.7 0 0 0-1.6 1.4Z"/></>,
  };
  return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">{paths[type]}</svg>;
}

export default function RegistrationsPage() {
  const [participantName, setParticipantName] = useState('');
  const [type, setType] = useState('All');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [registrations, setRegistrations] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const [activeView, setActiveView] = useState('Registrations');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [paymentBreakdown, setPaymentBreakdown] = useState({ Paid: 0, Partial: 0, Unpaid: 0 });

  useEffect(() => {
    let active = true;
    getSummary()
      .then((result) => { if (active) setSummary(result); })
      .catch(() => { if (active) setError('Cannot reach the API...'); });
    getRegistrations({ page: 1, pageSize: 25 })
      .then((result) => {
        if (!active) return;
        const items = result.items || [];
        setPaymentBreakdown(items.reduce((acc, item) => {
          if (item.paymentStatus === 'Paid' || item.paymentStatus === 'Partial' || item.paymentStatus === 'Unpaid') acc[item.paymentStatus] += 1;
          return acc;
        }, { Paid: 0, Partial: 0, Unpaid: 0 }));
      })
      .catch(() => {});
    return () => { active = false; };
  }, [retryCount]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    getRegistrations({ participantName, type, status, page, pageSize })
      .then((result) => {
        if (!active) return;
        setRegistrations(result.items || []);
        setPage(result.page || 1);
        setPageSize(result.pageSize || pageSize);
        setTotalCount(result.totalCount || 0);
        setTotalPages(result.totalPages || 1);
      })
      .catch(() => { if (active) { setError('Cannot reach the API...'); setRegistrations([]); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [participantName, type, status, page, pageSize, retryCount]);

  const clearFilters = () => { setParticipantName(''); setType('All'); setStatus('All'); setPage(1); };
  const changeParticipantName = (value) => { setParticipantName(value); setPage(1); };
  const changeType = (value) => { setType(value); setPage(1); };
  const changeStatus = (value) => { setStatus(value); setPage(1); };
  const changePageSize = (value) => { setPageSize(value); setPage(1); };

  const selectView = (view) => { setActiveView(view); setSidebarOpen(false); };

  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();

  const sidebar = (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-zinc-800 bg-[#09090b] px-3 py-5 shadow-2xl lg:shadow-none">
      <div className="flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 16h14l-1.5-5H6.5L5 16Z"/><path d="M7 16v2M17 16v2M4 16h16M8 11l1-3h6l1 3"/><circle cx="8" cy="16" r="1"/><circle cx="16" cy="16" r="1"/></svg>
        </div>
        <div><p className="text-sm font-bold text-white">CAR SHOW</p><p className="text-xs font-semibold tracking-[0.18em] text-emerald-400">2027</p></div>
      </div>

      <nav className="mt-8 space-y-1.5" aria-label="Main navigation">
        {navigation.map((item) => {
          const active = activeView === item.name || (item.name === 'Registrations' && activeView === 'Registrations');
          return (
            <button key={item.name} type="button" onClick={() => selectView(item.name)} className={`flex h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-semibold transition ${active ? 'border border-emerald-500/20 bg-emerald-500/12 text-emerald-300 shadow-[inset_3px_0_0_#10b981]' : 'border border-transparent text-slate-400 hover:border-zinc-800 hover:bg-zinc-900 hover:text-white'}`}>
              <NavIcon type={item.icon} /><span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-zinc-800 px-2 pt-4">
        <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-xs font-bold text-emerald-400">AO</div><div><p className="text-xs font-semibold text-white">Event Operator</p><p className="text-[11px] text-slate-500">Operations</p></div></div>
      </div>
    </aside>
  );

  const registrationView = (
    <>
      <KpiCards summary={summary} />
      <RegistrationFilters participantName={participantName} type={type} status={status} onParticipantNameChange={changeParticipantName} onTypeChange={changeType} onStatusChange={changeStatus} onClear={clearFilters} />
      {loading ? (
        <div className="flex min-h-72 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-sm font-medium text-slate-300" role="status"><span className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-zinc-700 border-t-emerald-400" />Loading registrations...</div>
      ) : error ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-12 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-red-400/20 bg-red-400/10 text-red-400"><svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 17h.01"/></svg></div><p className="mt-4 font-semibold text-white">Cannot reach the API...</p><button type="button" onClick={() => setRetryCount((count) => count + 1)} className="mt-5 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-bold text-zinc-950 hover:bg-emerald-400">Try Again</button></div>
      ) : registrations.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-12 text-center"><p className="font-semibold text-white">No registrations match your filters</p><button type="button" onClick={clearFilters} className="mt-5 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:border-emerald-500/50 hover:text-emerald-300">Clear Filters</button></div>
      ) : <RegistrationTable registrations={registrations} />}
      {!loading && !error && registrations.length > 0 && <Pagination page={page} pageSize={pageSize} totalCount={totalCount} totalPages={totalPages} loading={loading} onPageChange={setPage} onPageSizeChange={changePageSize} />}
    </>
  );

  const paymentsView = (
    <section className="grid gap-4 md:grid-cols-3">
      {['Paid', 'Partial', 'Unpaid'].map((item) => <article key={item} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{item}</p><p className="mt-3 text-3xl font-bold tabular-nums text-white">{paymentBreakdown[item]}</p><p className="mt-1 text-sm text-slate-500">registrations</p></article>)}
      <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 md:col-span-2"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Collected</p><p className="mt-3 text-3xl font-bold tabular-nums text-emerald-400">{php.format(summary?.totalPayments || 0)}</p></article>
      <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Uncollected</p><p className="mt-3 text-3xl font-bold tabular-nums text-amber-400">{php.format(summary?.uncollectedPayments || 0)}</p></article>
    </section>
  );

  const reportsView = (
    <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"><h2 className="text-sm font-semibold text-white">Registration Report Preview</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{[['Total registrations', summary?.totalRegistrations], ['Confirmed', summary?.confirmed], ['Checked in', summary?.checkedIn], ['Cancelled', summary?.cancelled]].map(([label, value]) => <div key={label} className="rounded-lg border border-zinc-800 bg-zinc-950 p-4"><p className="text-xs text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold tabular-nums text-white">{value ?? 0}</p></div>)}</div></article>
      <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"><h2 className="text-sm font-semibold text-white">Export Preview</h2><p className="mt-2 text-sm leading-6 text-slate-400">Registration and payment summaries are ready for operational reporting.</p><button type="button" className="mt-5 h-10 w-full rounded-lg border border-zinc-700 bg-zinc-950 text-sm font-semibold text-slate-300 hover:border-emerald-500/50 hover:text-emerald-300">Generate CSV Preview</button></article>
    </section>
  );

  const settingsView = (
    <section className="max-w-3xl rounded-xl border border-zinc-800 bg-zinc-900 p-5"><h2 className="text-sm font-semibold text-white">System Configuration</h2><div className="mt-5 divide-y divide-zinc-800"><div className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-medium text-slate-200">Data Source Mode</p><p className="mt-1 text-xs text-slate-500">Active dashboard data provider</p></div><span className="w-fit rounded-md border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">Sample Data</span></div><div className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-medium text-slate-200">API Base URL</p><p className="mt-1 break-all text-xs text-slate-500">{apiBaseUrl || 'Not configured'}</p></div><span className="rounded-md border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-xs text-slate-400">C# API Ready</span></div></div></section>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {sidebarOpen && <><button type="button" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-30 bg-black/70 lg:hidden"/><div className="lg:hidden">{sidebar}</div></>}
      <div className="hidden lg:block">{sidebar}</div>

      <main className="min-h-screen lg:ml-60">
        <header className="sticky top-0 z-20 border-b border-zinc-800/90 bg-zinc-950/95 backdrop-blur-xl">
          <div className="flex h-[72px] items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3"><button type="button" onClick={() => setSidebarOpen(true)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-slate-300 lg:hidden" aria-label="Open navigation"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400 sm:text-xs">Car Show 2027</p><h1 className="truncate text-lg font-bold text-white sm:text-xl">{activeView} {activeView === 'Registrations' ? 'Dashboard' : ''}</h1></div></div>
            <div className="ml-3 flex shrink-0 items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-2 sm:px-3"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"/><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"/></span><span className="hidden text-xs font-medium text-slate-300 sm:inline">Event Operations Active</span></div>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] space-y-5 px-4 py-5 sm:px-6 lg:px-8">
          {activeView === 'Registrations' || activeView === 'Dashboard' ? registrationView : activeView === 'Payments' ? paymentsView : activeView === 'Reports' ? reportsView : settingsView}
        </div>
      </main>
    </div>
  );
}
