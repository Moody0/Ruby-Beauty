import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "arabic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Ruby Beauty - Premium Botanical Skincare Store",
    template: "%s | Ruby Beauty"
  },
  description: "Discover Ruby Beauty's premium botanical skincare collection. Natural, healthy glow from within with our cruelty-free and vegan products.",
  keywords: ["skincare", "beauty", "botanical", "natural beauty", "ruby beauty", "serum", "moisturizer", "vegan skincare"],
  authors: [{ name: "Ruby Beauty" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ruby Beauty",
    title: "Ruby Beauty - Premium Botanical Skincare Store",
    description: "Discover our new botanical collection designed for a natural, healthy glow.",
    images: [
      {
        url: "/Ruby-Beauty-Logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Ruby Beauty Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ruby Beauty - Premium Botanical Skincare Store",
    description: "Discover our new botanical collection designed for a natural, healthy glow.",
    images: ["/Ruby-Beauty-Logo.jpeg"],
  },
  icons: {
    icon: "/Ruby-Beauty-Logo.jpeg",
    shortcut: "/Ruby-Beauty-Logo.jpeg",
    apple: "/Ruby-Beauty-Logo.jpeg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning className={rubik.variable}>
      <head>
        <link
          rel="preload"
          as="image"
          href="https://lh3.googleusercontent.com/aida-public/AB6AXuB8pRgU38opDPgidWmDRVHh18-R0XsEouLP3xdxsGLZz4BX3nQjc-9PXhgFNDVECMvP80S7ZtFmpA-QwwrnKgOR8B7WY0FlM3qJCAf1J8cxpwvyt6V15oxTZz-uhtroLEp-87KWQzsp-6-2mVURrFG_Q6mWjJ5YGqT0gqwmcLOPMK6pDk77rqmdXEvvM82qGkXdLNmSeXBPXY9j9zwnT_PjJ5YAOzWa2PqrFvo1SOjMCtz71ZHQraBSPlt7TKx00ccpwm4TTWoB6b0y"
          type="image/avif"
        />
      </head>
      <body
        className={`${rubik.className} antialiased`}
        suppressHydrationWarning
      >
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
