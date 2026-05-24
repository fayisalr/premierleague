"use client";

import React, { useState } from 'react';
import { useTournament, Team, Player } from '@/components/TournamentContext';

export default function Teams() {
  const { teams, players } = useTournament();
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  const selectedTeam = teams.find(t => t.id === selectedTeamId);
  const teamPlayers = players.filter(p => p.teamId === selectedTeamId);

  return (
    <main style={{
      minHeight: '100vh',
      backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
      backgroundSize: '24px 24px',
      position: 'relative'
    }}>
      {/* Hero Section */}
      <section className="container" style={{ padding: '64px var(--spacing-margin-mobile)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span className="label-caps" style={{ color: 'var(--tertiary)', letterSpacing: '0.2em' }}>Season 2024/25</span>
          <h1 className="display-lg" style={{ color: 'var(--on-surface)', textTransform: 'uppercase' }}>THE CONTENDERS</h1>
          <p className="body-lg" style={{ maxWidth: '600px', color: 'var(--on-surface-variant)' }}>
            Explore the elite squads battling for the championship. High-performance data, roster depth, and team legacy defined in one view.
          </p>
        </div>
      </section>

      {/* Teams Grid */}
      <section className="container" style={{ paddingBottom: '96px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'var(--spacing-gutter)'
        }}>
          {teams.map(team => (
            <div key={team.id} className="card" style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              padding: '32px',
              transition: 'all 0.5s'
            }}>
              <div style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ width: '96px', height: '96px', margin: '0 auto 32px auto', transition: 'all 0.3s' }}>
                  <img src={team.img} alt={team.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <h3 className="headline-md" style={{ color: 'var(--on-surface)', marginBottom: '8px', textAlign: 'center', fontSize: '24px' }}>{team.name}</h3>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderTop: '1px solid var(--outline-variant)', borderBottom: '1px solid var(--outline-variant)', marginBottom: '32px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <p className="label-caps" style={{ fontSize: '10px', color: 'var(--on-surface-variant)', marginBottom: '4px' }}>Rank</p>
                    <p className="stats-md" style={{ color: team.color, fontSize: '20px' }}>{team.rank}</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p className="label-caps" style={{ fontSize: '10px', color: 'var(--on-surface-variant)', marginBottom: '4px' }}>Win Rate</p>
                    <p className="stats-md" style={{ color: 'var(--on-surface)', fontSize: '20px' }}>{team.winRate}</p>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedTeamId(team.id)}
                  className="btn-roster label-caps">
                  <span>View Roster</span>
                  <span className="material-symbols-outlined" style={{ textTransform: 'none' }}>arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roster Modal */}
      {selectedTeamId && selectedTeam && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div style={{
            background: 'var(--surface-container)',
            border: `1px solid ${selectedTeam.color}`,
            width: '100%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '32px',
            position: 'relative'
          }}>
            <button 
              onClick={() => setSelectedTeamId(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--on-surface-variant)', cursor: 'pointer' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>close</span>
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
              <img src={selectedTeam.img} alt={selectedTeam.name} style={{ width: '64px', height: '64px' }} />
              <div>
                <h2 className="display-lg" style={{ fontSize: '48px', color: selectedTeam.color, textTransform: 'uppercase' }}>{selectedTeam.name}</h2>
                <span className="label-caps" style={{ color: 'var(--on-surface-variant)' }}>Official Roster</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '48px' }}>
              {teamPlayers.length === 0 && (
                <p className="body-lg" style={{ color: 'var(--on-surface-variant)' }}>No players assigned yet.</p>
              )}
              {teamPlayers.map(player => (
                <div key={player.id} style={{ background: 'var(--surface-container-high)', border: '1px solid var(--outline-variant)', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img src={player.imageUrl} alt={player.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <span className="headline-md" style={{ fontSize: '18px', color: 'var(--on-surface)', display: 'block', textTransform: 'uppercase' }}>{player.name}</span>
                    <span className="label-caps" style={{ color: 'var(--primary)' }}>{player.position} #{player.number}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Data Strip */}
      <aside style={{ width: '100%', background: 'var(--surface-container-high)', padding: '48px 0', borderTop: '1px solid var(--outline-variant)', borderBottom: '1px solid var(--outline-variant)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px', whiteSpace: 'nowrap' }}>
          <span className="display-lg" style={{ fontSize: '36px', color: 'var(--outline-variant)', opacity: 0.2 }}>Live Performance Tracking</span>
          <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--tertiary)', boxShadow: '0 0 15px var(--tertiary)' }}></span>
          <span className="display-lg" style={{ fontSize: '36px', color: 'var(--outline-variant)', opacity: 0.2 }}>Real-Time Scouting Reports</span>
          <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 15px var(--primary)' }}></span>
          <span className="display-lg" style={{ fontSize: '36px', color: 'var(--outline-variant)', opacity: 0.2 }}>Elite Tournament Systems</span>
          <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--secondary-container)', boxShadow: '0 0 15px var(--secondary-container)' }}></span>
        </div>
      </aside>
    </main>
  );
}
