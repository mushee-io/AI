export function TopStats({ balance, spent, requests }: { balance: string; spent: string; requests: number }) {
  const items = [
    { label: "Wallet balance", value: balance, sub: "USDC available" },
    { label: "Spend today", value: spent, sub: "USDC settled" },
    { label: "Total runs", value: String(requests), sub: "session activity" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="glass-panel rounded-[30px] p-5">
          <div className="text-sm text-muted">{item.label}</div>
          <div className="mt-4 text-3xl font-semibold tracking-tight text-ink">{item.value}</div>
          <div className="mt-2 text-sm text-muted">{item.sub}</div>
        </div>
      ))}
    </div>
  );
}
