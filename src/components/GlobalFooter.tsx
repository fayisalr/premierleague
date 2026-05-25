"use client";

import { usePathname } from 'next/navigation';

export default function GlobalFooter() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/login')) {
    return null;
  }

  return (
    <footer style={{ width: '100%', borderTop: '1px solid var(--outline-variant)', background: 'var(--surface-container-lowest)', marginTop: '64px' }}>
      <div className="container" style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingTop: '32px', 
        paddingBottom: '32px', 
        gap: '24px' 
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span className="display-lg" style={{ fontSize: '18px', color: 'var(--on-surface)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>KYC Super League</span>
          <p className="label-caps" style={{ color: 'var(--tertiary)', textTransform: 'uppercase' }}>© 2026 KYC Super League. ARTS & SPORTS CLUB KOMBAKKAL KUNNU</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
          <a href="#" className="label-caps" style={{ color: 'var(--on-surface-variant)', textTransform: 'uppercase', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" className="label-caps" style={{ color: 'var(--on-surface-variant)', textTransform: 'uppercase', textDecoration: 'none' }}>Terms of Service</a>
          <a href="#" className="label-caps" style={{ color: 'var(--on-surface-variant)', textTransform: 'uppercase', textDecoration: 'none' }}>Tournament Rules</a>
          <a href="#" className="label-caps" style={{ color: 'var(--on-surface-variant)', textTransform: 'uppercase', textDecoration: 'none' }}>Contact Support</a>
        </div>
      </div>
    </footer>
  );
}
