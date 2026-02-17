import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Import the Navbar component to display it on all pages
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Log System",
  description: "Secure visitor and vehicle management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
          
          {/* Global Navigation Bar */}
          <Navbar />

          {/* Main Content Area with Responsive Padding */}
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          {/* Optional Footer */}
          <footer className="bg-gray-800 text-white py-4 text-center text-sm mt-auto">
            &copy; {new Date().getFullYear()} Digital Log System. All rights reserved.
          </footer>

        </div>
      </body>
    </html>
  );
}