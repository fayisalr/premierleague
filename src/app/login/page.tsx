"use client";

import React, { useState } from 'react';
import { useTournament } from '@/components/TournamentContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { login } = useTournament();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      router.push('/admin');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)', position: 'relative' }}>
      {/* Background Decorative */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      
      <div className="card" style={{ zIndex: 10, width: '100%', maxWidth: '400px', padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--primary)', marginBottom: '16px' }}>admin_panel_settings</span>
        <h1 className="headline-md" style={{ color: 'var(--on-surface)', marginBottom: '8px' }}>Admin Access</h1>
        <p className="body-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '32px' }}>Enter your credentials to access the control panel.</p>
        
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={{ width: '100%', background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '16px', fontSize: '16px' }}
          />
          {error && <p className="label-caps" style={{ color: 'var(--error)' }}>{error}</p>}
          <button type="submit" className="label-caps" style={{ width: '100%', background: 'var(--primary)', color: 'var(--on-primary)', border: 'none', padding: '16px', cursor: 'pointer', marginTop: '8px' }}>
            LOGIN TO DASHBOARD
          </button>
        </form>
      </div>
    </main>
  );
}
