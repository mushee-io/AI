import Link from "next/link";

const nav = ["Workspace", "Models", "Payments", "Activity", "Billing", "Settings"];

export function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-[280px] shrink-0 p-5 lg:block">
      <div className="glass-panel sticky top-5 rounded-[32px] p-5">
        <div className="text-xl font-semibold tracking-tight">Mushee</div>
        <div className="mt-2 text-sm leading-6 text-muted">Premium AI workspace with wallet-native settlement.</div>

        <nav className="mt-8 space-y-2">
          {nav.map((item, idx) => (
            <Link
              href="/dashboard"
              key={item}
              className={`block rounded-2xl px-4 py-3 text-sm transition ${idx === 0 ? "bg-[linear-gradient(135deg,rgba(109,68,255,0.16),rgba(166,126,255,0.08))] text-ink" : "text-muted hover:bg-white/70 hover:text-ink"}`}
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="mt-8 rounded-[28px] border border-edge bg-white/70 p-4 text-sm text-muted">
          <div className="text-xs uppercase tracking-[0.18em] text-muted">Active mode</div>
          <div className="mt-3 font-medium text-ink">Polygon USDC payment before execution</div>
          <div className="mt-2 leading-6">Treasury collection remains onchain while the assistant experience is rebranded as Mushee AI.</div>
        </div>
      </div>
    </aside>
  );
}
