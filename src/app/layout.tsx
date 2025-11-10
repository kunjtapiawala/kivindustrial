import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KIV Industrial Parts | Kunj's Industrial Vault",
  description:
    "KIV Industrial Parts sources critical industrial components fast. Request the parts you need and receive responsive support from Kunj's Industrial Vault.",
  metadataBase: new URL("https://www.kivindustrial.com"),
  openGraph: {
    title: "KIV Industrial Parts | Kunj's Industrial Vault",
    description:
      "Tech-forward sourcing platform for industrial parts. Tell us what you need and we'll handle the rest.",
    url: "https://www.kivindustrial.com",
    siteName: "KIV Industrial Parts",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KIV Industrial Parts | Kunj's Industrial Vault",
    description:
      "Request industrial parts with rapid turnaround from KIV Industrial Parts.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-surface text-primary antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
