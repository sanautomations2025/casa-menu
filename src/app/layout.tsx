import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';  // ← this one line activates Bootstrap

export const metadata: Metadata = {
  title: "Casa Cafe Menu",
  description: "QR Menu for Casa Cafe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}