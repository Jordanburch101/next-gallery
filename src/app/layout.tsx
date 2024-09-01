import "~/styles/globals.css";

import { ClerkProvider } from '@clerk/nextjs'

import { GeistSans } from "geist/font/sans";
import TopNav from "./_components/topnav";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Gallery",
  description: "A gallery app built with Next.js",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <TopNav />
          {children}
          </body>
      </html>
    </ClerkProvider>
  );
}
