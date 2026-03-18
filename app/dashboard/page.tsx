"use client";

import { useMemo, useState } from "react";
import { erc20Abi, formatUnits, parseUnits } from "viem";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Sidebar } from "@/components/sidebar";
import { TopStats } from "@/components/top-stats";
import { ToolSelector } from "@/components/tool-selector";
import { ActivityItem, ActivityPanel } from "@/components/activity-panel";
import { ApiCard } from "@/components/api-card";
import { WalletPanel } from "@/components/wallet-panel";
import { MUSHEE_TREASURY, POLYGON_USDC, TOOL_PRICING, ToolKey } from "@/lib/config";

const PROMPTS: Record<ToolKey, string> = {
  summarize: "Summarize the user's input clearly and briefly.",
  rewrite: "Rewrite the user's input to sound more polished and natural.",
  generate: "Generate a useful response based on the user's input.",
  translate: "Translate the user's input into simple, natural English unless they specify a target language.",
};

export default function DashboardPage() {
  const [tool, setTool] = useState<ToolKey>("summarize");
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loadingStep, setLoadingStep] = useState<"idle" | "payment" | "running">("idle");
  const [error, setError] = useState("");
  const [items, setItems] = useState<ActivityItem[]>([]);
  const { address, isConnected } = useAccount();
  const { writeContractAsync, data: hash } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash });

  const usdcBalance = useReadContract({
    address: POLYGON_USDC,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const balanceNum = typeof usdcBalance.data === "bigint" ? Number(formatUnits(usdcBalance.data, 6)) : 0;
  const spentToday = items.reduce((sum, item) => sum + Number(item.amount), 0).toFixed(3);
  const currentPrice = TOOL_PRICING[tool].price;
  const canPay = balanceNum >= Number(currentPrice);

  async function handleRun() {
    setError("");
    setResponse("");

    if (!isConnected || !address) {
      setError("Connect your wallet first.");
      return;
    }
    if (!input.trim()) {
      setError("Enter text before running Mushee AI.");
      return;
    }
    if (!canPay) {
      setError(`You need at least ${currentPrice} USDC in your wallet.`);
      return;
    }

    try {
      setLoadingStep("payment");
      const txHash = await writeContractAsync({
        address: POLYGON_USDC,
        abi: erc20Abi,
        functionName: "transfer",
        args: [MUSHEE_TREASURY as `0x${string}`, parseUnits(currentPrice, 6)],
      });

      setLoadingStep("running");
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool,
          input,
          instruction: PROMPTS[tool],
          txHash,
          amount: currentPrice,
          wallet: address,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to run action.");
      }

      setResponse(data.output || "No result returned.");
      const newItem: ActivityItem = {
        id: `${Date.now()}`,
        tool: TOOL_PRICING[tool].label,
        amount: currentPrice,
        txHash,
        status: "Paid then executed",
        time: new Date().toLocaleTimeString(),
      };
      setItems((prev) => [newItem, ...prev].slice(0, 8));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoadingStep("idle");
    }
  }

  const statusText = useMemo(() => {
    if (loadingStep === "payment") return "Waiting for wallet signature";
    if (loadingStep === "running") return "Running Mushee AI with ChainGPT";
    if (receipt.isLoading) return "Waiting for chain confirmation";
    return "Ready for the next request";
  }, [loadingStep, receipt.isLoading]);

  return (
    <div className="min-h-screen lg:flex">
      <Sidebar />
      <div className="mx-auto flex w-full max-w-[1700px] flex-1 gap-6 px-4 py-5 sm:px-6 xl:px-8">
        <main className="min-w-0 flex-1 space-y-6 py-2">
          <section className="glass-panel mesh-bg relative overflow-hidden rounded-[36px] p-6 sm:p-8">
            <div className="absolute right-0 top-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(144,103,255,0.25),transparent_70%)] blur-3xl" />
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="pill">Mushee AI workspace</div>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Built On Yellow Network .</h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted sm:text-base">
                  This experience is branded as Mushee AI on the front end while the request engine runs through your Mushee API credit balance on the backend.
                </p>
              </div>
              <div className="glass-panel rounded-[28px] px-4 py-3 text-sm text-muted">{statusText}</div>
            </div>
          </section>

          <TopStats balance={balanceNum.toFixed(3)} spent={spentToday} requests={items.length} />

          <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-6">
              <section className="glass-panel rounded-[36px] p-5 sm:p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-xl font-semibold tracking-tight text-ink">Run Mushee AI</div>
                      <div className="mt-1 text-sm text-muted">Choose an action, pay in USDC, then get the result.</div>
                    </div>
                    <div className="rounded-full bg-white/70 px-3 py-1 text-xs text-muted">ChainGPT-backed · Polygon settled</div>
                  </div>

                  <ToolSelector tool={tool} onChange={setTool} />

                  <div className="rounded-[30px] border border-edge bg-white/70 p-4 sm:p-5">
                    <div className="mb-3 text-sm font-medium text-muted">Prompt</div>
                    <textarea
                      className="min-h-[220px] w-full resize-none rounded-[26px] border border-edge bg-white/90 p-5 text-base text-ink outline-none placeholder:text-[#9f95bf]"
                      placeholder="Ask Mushee AI to summarize, rewrite, generate, or translate..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-sm text-muted">
                        Estimated cost: <span className="font-semibold text-[#5932dd]">{currentPrice} USDC</span>
                      </div>
                      <button type="button" onClick={handleRun} disabled={loadingStep !== "idle"} className="button-primary disabled:opacity-60">
                        {loadingStep === "idle" ? "Pay and run Mushee AI" : "Processing..."}
                      </button>
                    </div>
                    {error ? <div className="mt-3 text-sm text-rose-500">{error}</div> : null}
                  </div>
                </div>
              </section>

              <section className="glass-panel rounded-[36px] p-5 sm:p-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xl font-semibold tracking-tight text-ink">Response</div>
                    <div className="mt-1 text-sm text-muted">Only returned after a successful payment and backend execution.</div>
                  </div>
                  <button type="button" onClick={() => navigator.clipboard.writeText(response)} className="button-secondary px-3 py-2 text-xs">
                    Copy
                  </button>
                </div>
                <div className="min-h-[240px] whitespace-pre-wrap rounded-[30px] border border-edge bg-white/75 p-5 text-sm leading-7 text-ink sm:text-base">
                  {response || "No result returned yet."}
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <WalletPanel />
              <ActivityPanel items={items} />
              <ApiCard />
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}
