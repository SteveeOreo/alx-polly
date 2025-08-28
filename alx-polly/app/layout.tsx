import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/app/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next.js Polling App",
  description: "A simple polling application built with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
