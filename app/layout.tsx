import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme";
import { Inter } from 'next/font/google';
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MovieNest",
  description: "A platform for streaming, discovering, and enjoying movies and shows across different genres.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
            <Navbar />
            <div className="mx-auto px-8 sm:px-6 lg:px-16 py-10">
              {children}
            </div>
            <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
