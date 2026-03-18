import Link from "next/link";
import { TOOL_PRICING } from "@/lib/config";

const features = [
  "Pay in Polygon USDC before execution",
  "Run AI actions from a clean operator workspace",
  "Keep wallet-native settlement and treasury flow",
  "Swap the model layer to ChainGPT without changing UX",
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-ink">
      <div className="hero-stripe" />
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8">
        <header className="glass-panel sticky top-4 z-20 flex items-center justify-between rounded-[28px] px-5 py-4">
          <div>
            <div className="text-lg font-semibold tracking-tight">Mushee</div>
            <div className="text-sm text-muted">Premium AI actions with onchain settlement</div>
          </div>
          <div className="hidden items-center gap-3 text-sm text-muted md:flex">
            <a href="https://x.com/mushee_io" target="_blank">X</a>
            <a href="https://mushee.xyz/" target="_blank">Website</a>
            <Link className="button-primary" href="/dashboard">Open Dashboard</Link>
          </div>
        </header>

        <section className="relative grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div>
            <div className="pill">White + purple premium interface · Polygon USDC rail</div>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Your AI product should look
              <span className="text-gradient"> fundable on sight.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
              Mushee is the polished front door for your AI actions business: a clean pre-launch page, an investor-ready workspace,
              and a wallet-native payment flow that charges users in USDC before every run.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard" className="button-primary">Launch Mushee AI</Link>
              <a href="#pricing" className="button-secondary">See usage pricing</a>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature} className="glass-panel rounded-3xl px-4 py-4 text-sm text-muted">
                  <div className="mb-2 h-2 w-2 rounded-full bg-accent" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="glass-panel mesh-bg relative overflow-hidden rounded-[36px] p-6 sm:p-8">
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm text-muted">Mushee AI preview</div>
                  <div className="mt-1 text-2xl font-semibold tracking-tight">Investor-grade dashboard surface</div>
                </div>
                <div className="pill">ChainGPT engine</div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="glass-panel rounded-3xl p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-muted">Wallet</div>
                  <div className="mt-3 text-3xl font-semibold">8.42</div>
                  <div className="text-sm text-muted">USDC available</div>
                </div>
                <div className="glass-panel rounded-3xl p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-muted">Spend today</div>
                  <div className="mt-3 text-3xl font-semibold">0.14</div>
                  <div className="text-sm text-muted">USDC settled</div>
                </div>
                <div className="glass-panel rounded-3xl p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-muted">Requests</div>
                  <div className="mt-3 text-3xl font-semibold">12</div>
                  <div className="text-sm text-muted">runs completed</div>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.88fr]">
                <div className="glass-panel rounded-[28px] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-muted">Workspace</div>
                      <div className="mt-1 text-xl font-semibold">Prompt, pay, run</div>
                    </div>
                    <div className="rounded-full bg-white/70 px-3 py-1 text-xs text-muted">0.005 USDC from</div>
                  </div>
                  <div className="mt-4 rounded-[24px] border border-edge bg-white/80 p-4 text-sm text-muted shadow-soft">
                    Help me explain why onchain payments make AI products easier to trust for users and investors.
                  </div>
                  <div className="mt-4 rounded-[24px] bg-[linear-gradient(135deg,rgba(109,68,255,0.16),rgba(166,126,255,0.08))] p-4 text-sm leading-7 text-ink">
                    Mushee AI responds inside a premium workspace while the payment layer stays verifiable on Polygon. This creates a product story that feels elegant to users and legible to investors.
                  </div>
                </div>

                <div className="glass-panel rounded-[28px] p-5">
                  <div className="text-sm font-medium text-muted">Usage menu</div>
                  <div className="mt-4 space-y-3">
                    {Object.entries(TOOL_PRICING).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between rounded-2xl border border-edge bg-white/70 px-4 py-3 text-sm">
                        <div>
                          <div className="font-medium text-ink">{value.label}</div>
                          <div className="text-muted">Mushee AI action</div>
                        </div>
                        <div className="font-semibold text-[#5932dd]">{value.price} USDC</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 py-4 md:grid-cols-3">
          {[
            ["Premium first impression", "White, purple, airy depth, soft glass panels, and cleaner hierarchy from the very first scroll."],
            ["Model story updated", "The product speaks as Mushee AI while the backend route now targets ChainGPT credits."],
            ["Same commercial logic", "Polygon, treasury transfer, wallet connect, and usage pricing stay intact so you do not lose the original mechanics."],
          ].map(([title, desc]) => (
            <div key={title} className="glass-panel rounded-[30px] p-6">
              <div className="text-lg font-semibold tracking-tight">{title}</div>
              <p className="mt-3 text-sm leading-7 text-muted">{desc}</p>
            </div>
          ))}
        </section>

        <section id="pricing" className="py-12 sm:py-16">
          <div className="mb-6 max-w-2xl">
            <div className="pill">Usage pricing</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Everything stays pay-per-request.</h2>
            <p className="mt-3 text-base leading-7 text-muted">The visual system is new, but the amount logic is preserved so you can keep the same commercial flow during tomorrow’s presentation.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {Object.entries(TOOL_PRICING).map(([key, value]) => (
              <div key={key} className="glass-panel rounded-[30px] p-5">
                <div className="text-sm uppercase tracking-[0.2em] text-muted">{key}</div>
                <div className="mt-3 text-2xl font-semibold">{value.label}</div>
                <div className="mt-4 text-sm leading-7 text-muted">User pays first with Polygon USDC, then Mushee AI returns the result.</div>
                <div className="mt-6 text-xl font-semibold text-[#5932dd]">{value.price} USDC</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
