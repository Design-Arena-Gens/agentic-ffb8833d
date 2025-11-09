import './globals.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="header">
            <h1>Adaptive Liquidity Compression Model (ALCM)</h1>
            <p className="muted">Futures scalping assistant powered by Binance public data</p>
          </header>
          <main>{children}</main>
          <footer className="footer">Not financial advice. Use at your own risk.</footer>
        </div>
      </body>
    </html>
  );
}
