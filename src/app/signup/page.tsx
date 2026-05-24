"use client";

import React, { useState } from 'react';
import { useTournament } from '@/components/TournamentContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const { signup } = useTournament();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');
    
    const { success, error: signupError } = await signup(email, password);
    setLoading(false);
    
    if (success) {
      setSuccessMsg('Account created successfully! If email confirmation is required, please check your inbox. Otherwise, you will be redirected to login shortly.');
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } else {
      setError(signupError || 'Failed to sign up');
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)', position: 'relative' }}>
      {/* Background Decorative */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      
      <div className="card" style={{ zIndex: 10, width: '100%', maxWidth: '400px', padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--primary)', marginBottom: '16px' }}>person_add</span>
        <h1 className="headline-md" style={{ color: 'var(--on-surface)', marginBottom: '8px' }}>Create Account</h1>
        <p className="body-sm" style={{ color: 'var(--on-surface-variant)', marginBottom: '32px', textAlign: 'center' }}>Sign up to manage the tournament.</p>
        
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            style={{ width: '100%', background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '16px', fontSize: '16px' }}
          />
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            minLength={6}
            style={{ width: '100%', background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '16px', fontSize: '16px' }}
          />
          {error && <p className="label-caps" style={{ color: 'var(--error)' }}>{error}</p>}
          {successMsg && <p className="label-caps" style={{ color: 'var(--primary)' }}>{successMsg}</p>}
          <button disabled={loading} type="submit" className="label-caps" style={{ width: '100%', background: 'var(--primary)', color: 'var(--on-primary)', border: 'none', padding: '16px', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
          </button>
        </form>

        <p className="body-sm" style={{ marginTop: '24px', color: 'var(--on-surface-variant)' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Log in</Link>
        </p>
      </div>
    </main>
  );
}
