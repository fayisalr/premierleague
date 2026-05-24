"use client";

import React from 'react';
import { useTournament } from '@/components/TournamentContext';

export default function Players() {
  const { players, teams } = useTournament();

  const getTeam = (teamId: string) => teams.find(t => t.id === teamId);

  return (
    <main className="container" style={{ minHeight: '100vh', paddingBottom: '96px', paddingTop: '48px' }}>
      
      {/* Hero Section */}
      <header style={{ marginBottom: '64px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px' }}>
        <div>
          <span className="label-caps" style={{ color: 'var(--tertiary)', marginBottom: '8px', display: 'block' }}>SEASON 2024/25</span>
          <h1 className="display-lg" style={{ color: 'var(--on-surface)', textTransform: 'uppercase', lineHeight: 1 }}>League Players</h1>
        </div>
      </header>

      {/* Players Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
        {players.map(player => {
          const team = getTeam(player.teamId);
          return (
            <div key={player.id} className="card" style={{ background: 'var(--surface-container)', border: '1px solid var(--outline-variant)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ height: '280px', width: '100%', position: 'relative' }}>
                <img src={player.imageUrl} alt={player.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--surface-container), transparent)' }}></div>
                <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="stats-md" style={{ color: 'var(--on-surface)', fontSize: '20px' }}>{player.number}</span>
                </div>
              </div>
              <div style={{ padding: '24px', position: 'relative', zIndex: 10, marginTop: '-48px' }}>
                <span className="label-caps" style={{ color: 'var(--primary)', marginBottom: '4px', display: 'block' }}>{player.position}</span>
                <h3 className="headline-md" style={{ color: 'var(--on-surface)', textTransform: 'uppercase', marginBottom: '16px' }}>{player.name}</h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  {team && (
                    <>
                      <img src={team.img} alt={team.name} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                      <span className="label-caps" style={{ color: 'var(--on-surface-variant)' }}>{team.name}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>

    </main>
  );
}
