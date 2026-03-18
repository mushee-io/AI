# Mushee

Premium white-and-purple AI workspace with Polygon USDC payments and a ChainGPT-backed server route.

## What changed

- Rebranded UI from Mushee Flow to **Mushee / Mushee AI**
- New premium landing page and dashboard styling
- White + purple glassmorphism design system
- Backend route switched from Gemini to **ChainGPT**
- Existing Polygon USDC payment flow preserved
- Existing per-tool pricing preserved

## Environment variables

Create a `.env.local` file with:

```bash
CHAINGPT_API_KEY=your_chaingpt_secret_key
CHAINGPT_MODEL=general_assistant
NEXT_PUBLIC_MUSHEE_TREASURY_ADDRESS=0xD39De9c7A852252863F5f9C1FA32E97472230fd4
```

## Deploy on Vercel

1. Upload the project to GitHub or drag-drop into Vercel.
2. Add the environment variables above in Vercel.
3. Deploy.

## Notes

- Wallet settlement still uses Polygon mainnet USDC.
- Users pay before execution.
- The app presents the assistant as **Mushee AI** while the backend uses your ChainGPT credits.
