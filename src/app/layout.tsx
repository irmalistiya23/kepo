"use client";

import Sidebar from "@/components/layout/dashboard/Sidebar";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";

const createRoutePatterns = (base: string, paths: string[]): string[] => 
  paths.map(path => `${base}${path}`);

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  if (pathname.includes("/dashboard")) {
    return(
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Sidebar>
          {children}
        </Sidebar>
      </body>
    </html>
    )
  }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {}
        {children}
      </body>
    </html>
  );
}
