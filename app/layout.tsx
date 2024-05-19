import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import PageHeader from "@/components/apps/header";
import Sidebar from "@/components/apps/sidebar";
import { ThemeProvider } from "@/components/apps/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Menghitung Hidup",
  description: "Kalkulator untuk menghitung kebutuhan dan mimpimu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <div className="grid h-screen w-full">
          <div className="flex flex-col">
            <PageHeader/>
            {children}
          </div>
        </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
