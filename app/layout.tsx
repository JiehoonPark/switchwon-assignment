import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";

import { QueryProvider } from "@/app/providers/QueryProvider";

const pretendard = localFont({
  src: "../src/assets/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Switchwon Exchange",
  description: "환전 애플리케이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
