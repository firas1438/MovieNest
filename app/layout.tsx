import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Providers } from "@/lib/providers/providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MovieNest",
  description: "A platform for streaming, discovering, and enjoying movies and shows across different genres.",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
            <Navbar />
            <main className="mx-auto px-8 sm:px-6 lg:px-16 py-8 min-h-[34rem]">
              {children}
            </main>
            <Footer/>
        </Providers>
      </body>
    </html>
  );
}
