import type { Metadata } from "next";
import { Doto, JetBrains_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import MicrosoftClarity from "@/providers/microsoft-clarity";
import Analytics from "@/providers/analytics";
import { ThemeProvider } from "next-themes";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

const dotoFont = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
});

const jetbrainsMonoFont = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const instrumentSansFont = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kontext Lab",
  description:
    "Kontext Lab researches and implements cutting-edge identity, authorization, and authentication systems to address the foundational challenges of digital trust within emerging AI ecosystems.",
  metadataBase: new URL("https://kontext.dev"),
  openGraph: {
    images: ["/banner.png"],
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          dotoFont.variable,
          jetbrainsMonoFont.variable,
          instrumentSansFont.variable,
          "antialiased instrument-sans"
        )}
        suppressHydrationWarning
      >
        <ThemeProvider defaultTheme="dark" attribute="class" enableSystem={false} forcedTheme="dark">
          <MicrosoftClarity />
          <Analytics />
          <VercelAnalytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
