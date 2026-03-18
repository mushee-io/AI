import { NextResponse } from "next/server";
import { TOOL_PRICING, ToolKey } from "@/lib/config";

const DEFAULT_MODEL = process.env.CHAINGPT_MODEL || "general_assistant";

type RunBody = {
  tool?: ToolKey;
  input?: string;
  instruction?: string;
  txHash?: string;
  amount?: string;
  wallet?: string;
};

function extractOutput(data: any, rawText: string) {
  if (data && typeof data === "object") {
    const candidates = [
      data?.data?.bot,
      data?.data?.answer,
      data?.data?.response,
      data?.bot,
      data?.answer,
      data?.response,
      data?.message,
    ];

    const firstString = candidates.find((value) => typeof value === "string" && value.trim());
    if (firstString) return firstString.trim();
  }

  return rawText.trim();
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RunBody;
    const { tool, input, instruction, txHash, amount, wallet } = body;

    if (!tool || !(tool in TOOL_PRICING)) {
      return NextResponse.json({ error: "Invalid tool." }, { status: 400 });
    }
    if (!input?.trim()) {
      return NextResponse.json({ error: "Input is required." }, { status: 400 });
    }
    if (!txHash) {
      return NextResponse.json({ error: "Payment transaction hash is required before execution." }, { status: 400 });
    }

    const apiKey = process.env.CHAINGPT_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "CHAINGPT_API_KEY is missing." }, { status: 500 });
    }

    const question = `${instruction || "Help the user with the request."}

User input:
${input}

Branding note: respond as Mushee AI. Keep the tone premium, clear, and useful.`;

    const payload = {
      model: DEFAULT_MODEL,
      question,
      chatHistory: "off",
      useCustomContext: true,
      contextInjection: {
        companyName: "Mushee",
        companyDescription: "Mushee is an AI workspace that lets users pay in Polygon USDC before executing premium AI actions.",
        companyRole: "AI payments and productivity platform",
        aiTone: "PRE_SET_TONE",
        selectedTone: "PROFESSIONAL",
      },
    };

    const response = await fetch("https://api.chaingpt.org/chat/stream", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const rawText = await response.text();
    let data: any = null;

    try {
      data = rawText ? JSON.parse(rawText) : null;
    } catch {
      data = null;
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data?.message || data?.error || rawText || "ChainGPT request failed.",
          status: response.status,
        },
        { status: response.status }
      );
    }

    if (data && typeof data === "object" && data?.status === false) {
      return NextResponse.json(
        { error: data?.message || "ChainGPT request failed.", details: data },
        { status: 500 }
      );
    }

    const output = extractOutput(data, rawText) || "No result returned.";

    return NextResponse.json({
      ok: true,
      output,
      meta: {
        txHash,
        wallet,
        amount,
        tool,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown server error." },
      { status: 500 }
    );
  }
}
