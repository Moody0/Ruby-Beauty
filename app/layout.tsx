import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
