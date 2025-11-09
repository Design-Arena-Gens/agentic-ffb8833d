"use client";

import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { Dashboard } from '@components/Dashboard';
import { AssistantPanel } from '@components/AssistantPanel';
import { SignalBadge } from '@components/SignalBadge';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function HomePage() {
  const [symbol, setSymbol] = useState<string>('BTCUSDT');
  const [interval, setInterval] = useState<string>('1m');

  const params = useMemo(() => new URLSearchParams({ symbol, interval }).toString(), [symbol, interval]);
  const { data, isLoading, error } = useSWR(`/api/market?${params}`, fetcher, { refreshInterval: 10_000 });

  return (
    <div className="grid">
      <div className="card">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="row">
            <select className="select" value={symbol} onChange={(e) => setSymbol(e.target.value)}>
              <option>BTCUSDT</option>
              <option>ETHUSDT</option>
              <option>SOLUSDT</option>
              <option>BNBUSDT</option>
            </select>
            <select className="select" value={interval} onChange={(e) => setInterval(e.target.value)}>
              <option>1m</option>
              <option>3m</option>
              <option>5m</option>
            </select>
          </div>
          <div>
            {data?.signal ? (
              <SignalBadge signal={data.signal} />
            ) : (
              <span className="badge gray">No signal</span>
            )}
          </div>
        </div>
        <Dashboard data={data} loading={isLoading} error={!!error} />
      </div>
      <div className="card">
        <AssistantPanel latest={data} symbol={symbol} />
      </div>
    </div>
  );
}
