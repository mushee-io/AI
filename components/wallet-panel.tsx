"use client";

import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { polygon } from "wagmi/chains";
import { MUSHEE_TREASURY, POLYGON_USDC } from "@/lib/config";

function short(addr?: string) {
  if (!addr) return "Not connected";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function WalletPanel() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const onPolygon = chain?.id === polygon.id;

  const nativeBalance = useBalance({
    address,
    chainId: polygon.id,
    query: {
      enabled: !!address && onPolygon,
      refetchInterval: 5000,
    },
  });

  const usdcBalance = useBalance({
    address,
    token: POLYGON_USDC,
    chainId: polygon.id,
    query: {
      enabled: !!address && onPolygon,
      refetchInterval: 5000,
    },
  });

  return (
    <div className="glass-panel rounded-[32px] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold tracking-tight text-ink">Wallet</div>
          <div className="text-sm text-muted">{onPolygon ? "Polygon mainnet ready" : "Switch to Polygon mainnet"}</div>
        </div>
        {isConnected ? (
          <button onClick={() => disconnect()} className="button-secondary px-3 py-2 text-xs">
            Disconnect
          </button>
        ) : null}
      </div>

      <div className="mt-4 space-y-3 text-sm">
        <div className="rounded-[24px] border border-edge bg-white/75 p-4">
          <div className="text-muted">Address</div>
          <div className="mt-1 font-medium text-ink">{short(address)}</div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[24px] border border-edge bg-white/75 p-4">
            <div className="text-muted">USDC</div>
            <div className="mt-1 font-medium text-ink">
              {usdcBalance.isLoading ? "Loading..." : usdcBalance.data ? Number(usdcBalance.data.formatted).toFixed(3) : "0.000"}
            </div>
          </div>

          <div className="rounded-[24px] border border-edge bg-white/75 p-4">
            <div className="text-muted">POL</div>
            <div className="mt-1 font-medium text-ink">
              {nativeBalance.isLoading ? "Loading..." : nativeBalance.data ? Number(nativeBalance.data.formatted).toFixed(4) : "0.0000"}
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-edge bg-white/75 p-4 text-muted">
          <div className="text-muted">Treasury</div>
          <div className="mt-1 break-all text-xs text-ink">{MUSHEE_TREASURY}</div>
        </div>

        {!isConnected ? (
          <div className="space-y-2">
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                className="button-primary w-full"
                disabled={isPending}
              >
                Connect {connector.name}
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-[24px] border border-edge bg-[linear-gradient(135deg,rgba(109,68,255,0.08),rgba(166,126,255,0.06))] p-4 text-sm text-muted">
            {onPolygon ? "Connected on Polygon. Keep some POL in the wallet for gas." : "Please switch your wallet to Polygon mainnet before running Mushee AI."}
          </div>
        )}
      </div>
    </div>
  );
}
