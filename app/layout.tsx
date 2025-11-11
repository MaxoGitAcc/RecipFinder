import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Metadata } from "next";


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
      <head>
      <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
      </head>
        <body>
          <Navbar />
          {children}
        </body>
    </html>
  );
}
