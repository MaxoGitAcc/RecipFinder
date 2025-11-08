import "@/styles/globals.css";
import { Metadata, Viewport } from "next";


import { Providers } from "./providers";


export const metadata: Metadata = {
  title: "RecipFinder"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body >
          {children}
      </body>
    </html>
  );
}
