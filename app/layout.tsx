import "./globals.css";
import { Providers } from "@/components/providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mushee",
  description: "Mushee is a premium AI workspace with Polygon USDC payments and a ChainGPT-powered assistant experience.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
