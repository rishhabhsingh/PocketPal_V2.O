import "./globals.css";
import SessionWrapper from "@/components/sessionWrapper";
import { Toaster } from "sonner";

export const metadata = {
  title: "AI Finance Analyzer",
  description: "Track expenses, visualize spending patterns, and get AI-powered insights to optimize your financial health.",
  icons: {
    icon: '/favicon-simple.svg',
    shortcut: '/favicon-simple.svg',
    apple: '/favicon-simple.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
         <Toaster position="top-right" richColors />
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
