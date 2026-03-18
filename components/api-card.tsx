export function ApiCard() {
  return (
    <div className="glass-panel rounded-[32px] p-5">
      <div className="text-lg font-semibold tracking-tight text-ink">Mushee AI backend</div>
      <div className="mt-2 text-sm leading-6 text-muted">This route now expects a ChainGPT key on the server and keeps the same front-end payment gate.</div>
      <div className="mt-4 rounded-[24px] border border-edge bg-white/75 p-4 text-sm text-muted">
        <div className="mb-3 text-xs uppercase tracking-[0.18em]">POST /api/run</div>
        <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-ink">{`{
  "tool": "summarize",
  "input": "Explain tokenized payments simply",
  "txHash": "0x..."
}`}</pre>
      </div>
    </div>
  );
}
