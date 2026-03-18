export type ActivityItem = {
  id: string;
  tool: string;
  amount: string;
  txHash?: string;
  status: string;
  time: string;
};

export function ActivityPanel({ items }: { items: ActivityItem[] }) {
  return (
    <div className="glass-panel rounded-[32px] p-5">
      <div>
        <div className="text-lg font-semibold tracking-tight text-ink">Recent activity</div>
        <div className="text-sm text-muted">Latest wallet and assistant actions</div>
      </div>
      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-edge bg-white/50 p-4 text-sm text-muted">No runs yet. The first paid action will appear here.</div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="rounded-[24px] border border-edge bg-white/75 p-4">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-ink">{item.tool}</span>
                <span className="font-medium text-[#5932dd]">{item.amount} USDC</span>
              </div>
              <div className="mt-2 text-xs text-muted">{item.status} · {item.time}</div>
              {item.txHash ? <div className="mt-2 truncate text-xs text-muted">Tx: {item.txHash}</div> : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
