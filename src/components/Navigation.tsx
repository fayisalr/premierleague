"use client";

import Link from 'next/link';
import { useTournament } from './TournamentContext';
import React, { useState } from 'react';

export default function Navigation() {
  const { isAdmin, logout } = useTournament();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header style={{
      borderBottom: '1px solid var(--outline-variant)',
      backgroundColor: 'var(--surface)',
      padding: '16px 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
      }}>
        {/* Logo */}
        <div style={{ zIndex: 101 }}>
          <Link href="/" onClick={closeMenu} className="headline-md" style={{ color: 'var(--primary)', whiteSpace: 'nowrap', fontSize: '24px' }}>
            KYC SUPER LEAGUE
          </Link>
        </div>
        
        {/* Desktop Nav Links */}
        <nav className="desktop-nav" style={{
          display: 'flex',
          gap: 'var(--spacing-gutter)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Link href="/" className="label-caps" style={{ color: 'var(--on-surface)' }}>Home</Link>
          <Link href="/teams" className="label-caps" style={{ color: 'var(--on-surface-variant)' }}>Teams</Link>
          <Link href="/players" className="label-caps" style={{ color: 'var(--on-surface-variant)' }}>Players</Link>
          <Link href="/standings" className="label-caps" style={{ color: 'var(--on-surface-variant)' }}>Standings</Link>
          <Link href="/fixtures" className="label-caps" style={{ color: 'var(--on-surface-variant)' }}>Fixtures</Link>
          <Link href="/gallery" className="label-caps" style={{ color: 'var(--on-surface-variant)' }}>Gallery</Link>
          {isAdmin && <Link href="/admin" className="label-caps" style={{ color: 'var(--primary)' }}>Admin</Link>}
        </nav>

        {/* Desktop Action Button */}
        <div className="desktop-action" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {isAdmin ? (
            <button onClick={handleLogout} className="label-caps" style={{ background: 'transparent', color: 'var(--on-surface)', border: '1px solid var(--outline-variant)', padding: '12px 24px', cursor: 'pointer' }}>Logout</button>
          ) : (
            <Link href="/login" className="label-caps" style={{ background: 'var(--secondary-container)', color: 'var(--on-secondary-container)', padding: '12px 24px', cursor: 'pointer', display: 'inline-block' }}>Login</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className="mobile-toggle"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--on-surface)',
            cursor: 'pointer',
            display: 'none',
            zIndex: 101,
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px'
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>

        {/* Mobile Nav Overlay */}
        {isOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--surface-container-lowest)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '32px',
            zIndex: 100,
            padding: '24px',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
            }}>
              <Link href="/" onClick={closeMenu} className="label-caps" style={{ color: 'var(--on-surface)', fontSize: '20px' }}>Home</Link>
              <Link href="/teams" onClick={closeMenu} className="label-caps" style={{ color: 'var(--on-surface-variant)', fontSize: '20px' }}>Teams</Link>
              <Link href="/players" onClick={closeMenu} className="label-caps" style={{ color: 'var(--on-surface-variant)', fontSize: '20px' }}>Players</Link>
              <Link href="/standings" onClick={closeMenu} className="label-caps" style={{ color: 'var(--on-surface-variant)', fontSize: '20px' }}>Standings</Link>
              <Link href="/fixtures" onClick={closeMenu} className="label-caps" style={{ color: 'var(--on-surface-variant)', fontSize: '20px' }}>Fixtures</Link>
              <Link href="/gallery" onClick={closeMenu} className="label-caps" style={{ color: 'var(--on-surface-variant)', fontSize: '20px' }}>Gallery</Link>
              {isAdmin && <Link href="/admin" onClick={closeMenu} className="label-caps" style={{ color: 'var(--primary)', fontSize: '20px' }}>Admin Dashboard</Link>}
            </nav>
            
            <div style={{ width: '100%', maxWidth: '200px', display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              {isAdmin ? (
                <button onClick={handleLogout} className="label-caps" style={{ width: '100%', background: 'transparent', color: 'var(--on-surface)', border: '1px solid var(--outline-variant)', padding: '16px', cursor: 'pointer', textAlign: 'center' }}>Logout</button>
              ) : (
                <Link href="/login" onClick={closeMenu} className="label-caps" style={{ width: '100%', background: 'var(--secondary-container)', color: 'var(--on-secondary-container)', padding: '16px', cursor: 'pointer', display: 'block', textAlign: 'center' }}>Login</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
