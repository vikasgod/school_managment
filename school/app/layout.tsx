import type { Metadata } from "next";
import "./globals.css";
import Footer from "./footer";

export const metadata: Metadata = {
  title: "School ERP | Dashboard",
  description: "School management ERP dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
