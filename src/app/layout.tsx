import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FarmConnect — Fresh From Farms, Directly to You',
  description: 'FarmConnect connects farmers and customers directly — no middlemen, fairer prices, and produce that travels the shortest possible distance from soil to table.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
