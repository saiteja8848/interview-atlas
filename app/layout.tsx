import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Interview Atlas", description: "A beautiful, read-first interview preparation library." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
