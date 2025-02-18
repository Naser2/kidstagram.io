import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Toaster } from "sonner";
import AuthProvider from "@/components/AuthProvider";
import { inter } from "./fonts";
import RootLayout from "@/components/RootLayout";

export const metadata: Metadata = {
  title: "Kidstagram - Share your moments",
  description: "Kidstagram - A fun and safe way to share your favorite moments.",
  icons: {
    icon: "/kidstagram_ico.png",
    apple: "/kidstagram_ico.png",
  },
  viewport: "width=device-width, initial-scale=1, minimum-scale=1, viewport-fit=cover",
};
const siteUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://kidstagram.io";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
     <head>
        {/* SEO & Social Sharing Meta Tags */}
        <meta name="robots" content="noarchive, noimageindex" />
        <meta name="bingbot" content="noarchive" />
        <meta property="og:title" content="Kidstagram - Share your moments" />
        <meta property="og:description" content="Kidstagram - A fun and safe way to share your favorite moments." />
        <meta property="og:image" content={`${siteUrl}/kidstagram_ico.png`} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kidstagram - Share your moments" />
        <meta name="twitter:description" content="Kidstagram - A fun and safe way to share your favorite moments." />
        <meta name="twitter:image" content={`${siteUrl}/kidstagram_ico.png`} />
        <meta name="twitter:url" content={siteUrl} />

        {/* Performance Optimizations */}
        <link rel="preconnect" href={siteUrl} />
        <link rel="dns-prefetch" href={siteUrl} />
        <link rel="apple-touch-icon" sizes="192x192" href={`${siteUrl}/kidstagram_ico.png`} />
        <link rel="icon" type="image/png" sizes="192x192" href={`${siteUrl}/kidstagram_ico.png`} />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <NextSSRPlugin
              routerConfig={extractRouterConfig(ourFileRouter)}
            />
            <RootLayout>{children}</RootLayout>
            <Toaster richColors />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
