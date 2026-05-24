"use client";

import Link from 'next/link';
import { useTournament } from './TournamentContext';

export default function Navigation() {
  const { isAdmin, logout } = useTournament();

  return (
    <header style={{
      borderBottom: '1px solid var(--outline-variant)',
      backgroundColor: 'var(--surface)',
      padding: 'var(--spacing-base) 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <Link href="/" className="headline-md" style={{ color: 'var(--primary)', whiteSpace: 'nowrap' }}>
            KYC SUPER LEAGUE
          </Link>
        </div>
        
        <nav style={{
          display: 'flex',
          gap: 'var(--spacing-gutter)',
          justifyContent: 'center',
          flex: 2
        }}>
          <Link href="/" className="label-caps" style={{ color: 'var(--on-surface)' }}>Home</Link>
          <Link href="/teams" className="label-caps" style={{ color: 'var(--on-surface-variant)' }}>Teams</Link>
          <Link href="/players" className="label-caps" style={{ color: 'var(--on-surface-variant)' }}>Players</Link>
          <Link href="/standings" className="label-caps" style={{ color: 'var(--on-surface-variant)' }}>Standings</Link>
          <Link href="/fixtures" className="label-caps" style={{ color: 'var(--on-surface-variant)' }}>Fixtures</Link>
          <Link href="/gallery" className="label-caps" style={{ color: 'var(--on-surface-variant)' }}>Gallery</Link>
          {isAdmin && <Link href="/admin" className="label-caps" style={{ color: 'var(--primary)' }}>Admin Dashboard</Link>}
        </nav>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          {isAdmin ? (
            <button onClick={logout} className="label-caps" style={{ background: 'transparent', color: 'var(--on-surface)', border: '1px solid var(--outline-variant)', padding: '12px 24px', cursor: 'pointer' }}>Logout</button>
          ) : (
            <Link href="/login" className="label-caps" style={{ background: 'var(--secondary-container)', color: 'var(--on-secondary-container)', padding: '12px 24px', cursor: 'pointer', display: 'inline-block' }}>Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
