import { TOOL_PRICING, ToolKey } from "@/lib/config";

export function ToolSelector({ tool, onChange }: { tool: ToolKey; onChange: (tool: ToolKey) => void }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {(Object.keys(TOOL_PRICING) as ToolKey[]).map((item) => {
        const active = item === tool;
        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={`rounded-[24px] border px-4 py-4 text-left transition ${
              active
                ? "border-transparent bg-[linear-gradient(135deg,rgba(109,68,255,0.16),rgba(166,126,255,0.10))] shadow-soft"
                : "border-edge bg-white/75 hover:bg-white"
            }`}
          >
            <div className="text-sm font-semibold text-ink">{TOOL_PRICING[item].label}</div>
            <div className="mt-1 text-xs text-muted">{TOOL_PRICING[item].price} USDC per run</div>
          </button>
        );
      })}
    </div>
  );
}
