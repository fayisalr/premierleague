"use client";

import { useTournament, Match } from '@/components/TournamentContext';
import React from 'react';

export default function Fixtures() {
  const { matches, teams } = useTournament();

  const getTeam = (id: string) => teams.find(t => t.id === id);

  const liveMatch = matches.find(m => m.status === 'LIVE');
  const upcomingMatch = matches.find(m => m.status === 'UPCOMING');
  const finishedMatches = matches.filter(m => m.status === 'FT');

  return (
    <main className="container" style={{ minHeight: '100vh', paddingBottom: '96px', paddingTop: '48px' }}>
      
      {/* Hero Section */}
      <header style={{ marginBottom: '64px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px' }}>
        <div>
          <span className="label-caps" style={{ color: 'var(--tertiary)', marginBottom: '8px', display: 'block' }}>SEASON 2024/25</span>
          <h1 className="display-lg" style={{ color: 'var(--on-surface)', textTransform: 'uppercase', lineHeight: 1 }}>Fixtures & Results</h1>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ display: 'flex', background: 'var(--surface-container)', border: '1px solid var(--outline-variant)', padding: '4px' }}>
            <button style={{ background: 'var(--primary)', color: 'var(--on-primary)', padding: '8px 16px', border: 'none', cursor: 'pointer' }} className="label-caps">SCHEDULE</button>
            <button style={{ background: 'transparent', color: 'var(--on-surface-variant)', padding: '8px 16px', border: 'none', cursor: 'pointer' }} className="label-caps">MY TEAM</button>
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
        
        {/* Active/Upcoming Round */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <h2 className="headline-md" style={{ color: 'var(--on-surface)', textTransform: 'uppercase', fontSize: '24px' }}>Active Matches</h2>
            <div style={{ height: '1px', flexGrow: 1, background: 'rgba(255, 255, 255, 0.1)' }}></div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            {/* LIVE MATCH */}
            {liveMatch && (() => {
              const homeTeam = getTeam(liveMatch.homeTeamId);
              const awayTeam = getTeam(liveMatch.awayTeamId);
              if (!homeTeam || !awayTeam) return null;

              return (
                <div key={liveMatch.id} className="card" style={{ borderLeft: '4px solid var(--tertiary)', background: 'rgba(255, 255, 255, 0.03)', padding: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '120px' }}>
                    <span className="label-caps" style={{ background: 'var(--tertiary)', color: 'var(--on-tertiary)', padding: '4px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="live-dot" style={{ width: '8px', height: '8px', background: 'var(--on-tertiary)', borderRadius: '50%' }}></span>
                      LIVE
                    </span>
                    <span className="stats-md" style={{ color: 'var(--on-surface-variant)' }}>{liveMatch.time}</span>
                  </div>
                  
                  <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', gap: '48px', minWidth: '300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, justifyContent: 'flex-end' }}>
                      <span className="headline-md" style={{ textTransform: 'uppercase', fontSize: '24px' }}>{homeTeam.name}</span>
                      <img src={homeTeam.img} alt={homeTeam.name} style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span className="stats-xl" style={{ color: 'var(--primary)' }}>{liveMatch.homeScore}</span>
                      <span className="stats-xl" style={{ color: 'var(--outline-variant)' }}>—</span>
                      <span className="stats-xl" style={{ color: 'var(--primary)' }}>{liveMatch.awayScore}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, justifyContent: 'flex-start' }}>
                      <img src={awayTeam.img} alt={awayTeam.name} style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
                      <span className="headline-md" style={{ textTransform: 'uppercase', fontSize: '24px' }}>{awayTeam.name}</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', minWidth: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--on-surface-variant)' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>location_on</span>
                      <span className="label-caps">{liveMatch.venue}</span>
                    </div>
                    <button style={{ color: 'var(--tertiary)', background: 'transparent', border: 'none', cursor: 'pointer', marginTop: '8px' }} className="label-caps">WATCH LIVE STREAM</button>
                  </div>
                </div>
              );
            })()}

            {/* UPCOMING MATCH */}
            {upcomingMatch && (() => {
              const homeTeam = getTeam(upcomingMatch.homeTeamId);
              const awayTeam = getTeam(upcomingMatch.awayTeamId);
              if (!homeTeam || !awayTeam) return null;

              return (
                <div key={upcomingMatch.id} className="card" style={{ background: 'var(--surface-container-low)', padding: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '120px' }}>
                    <span className="label-caps" style={{ border: '1px solid var(--outline-variant)', color: 'var(--on-surface-variant)', padding: '4px 12px' }}>UPCOMING</span>
                    <span className="stats-md" style={{ color: 'var(--on-surface)' }}>{upcomingMatch.time}</span>
                  </div>
                  
                  <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', gap: '48px', minWidth: '300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, justifyContent: 'flex-end' }}>
                      <span className="headline-md" style={{ textTransform: 'uppercase', fontSize: '24px' }}>{homeTeam.name}</span>
                      <img src={homeTeam.img} alt={homeTeam.name} style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
                    </div>
                    <div style={{ background: 'var(--surface-container-highest)', padding: '8px 24px' }}>
                      <span className="stats-md" style={{ color: 'var(--on-surface-variant)' }}>VS</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, justifyContent: 'flex-start' }}>
                      <img src={awayTeam.img} alt={awayTeam.name} style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
                      <span className="headline-md" style={{ textTransform: 'uppercase', fontSize: '24px' }}>{awayTeam.name}</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', minWidth: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--on-surface-variant)' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>location_on</span>
                      <span className="label-caps">{upcomingMatch.venue}</span>
                    </div>
                  </div>
                </div>
              );
            })()}
            
            {!liveMatch && !upcomingMatch && (
              <p className="body-lg" style={{ color: 'var(--on-surface-variant)' }}>No active or upcoming matches scheduled.</p>
            )}
          </div>
        </section>

        {/* Finished Matches Group */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <h2 className="headline-md" style={{ color: 'var(--on-surface-variant)', textTransform: 'uppercase', fontSize: '24px' }}>Recent Results</h2>
            <div style={{ height: '1px', flexGrow: 1, background: 'rgba(255, 255, 255, 0.05)' }}></div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>
            {finishedMatches.length === 0 && (
              <p className="body-lg" style={{ color: 'var(--on-surface-variant)' }}>No recent results.</p>
            )}
            {finishedMatches.map(match => {
              const homeTeam = getTeam(match.homeTeamId);
              const awayTeam = getTeam(match.awayTeamId);
              if (!homeTeam || !awayTeam) return null;

              return (
                <div key={match.id} className="card" style={{ background: 'var(--surface-container)', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={homeTeam.img} style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                        <span className="label-caps" style={{ color: match.homeScore! > match.awayScore! ? 'var(--on-surface)' : 'var(--on-surface-variant)' }}>{homeTeam.name}</span>
                      </div>
                      <span className="stats-xl" style={{ color: match.homeScore! > match.awayScore! ? 'var(--on-surface)' : 'var(--on-surface-variant)', fontSize: '32px' }}>{match.homeScore}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={awayTeam.img} style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                        <span className="label-caps" style={{ color: match.awayScore! > match.homeScore! ? 'var(--on-surface)' : 'var(--on-surface-variant)' }}>{awayTeam.name}</span>
                      </div>
                      <span className="stats-xl" style={{ color: match.awayScore! > match.homeScore! ? 'var(--on-surface)' : 'var(--on-surface-variant)', fontSize: '32px' }}>{match.awayScore}</span>
                    </div>
                  </div>
                  <div style={{ marginLeft: '32px', paddingLeft: '32px', borderLeft: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span className="label-caps" style={{ color: 'var(--outline-variant)', marginBottom: '4px' }}>FT</span>
                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>analytics</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </main>
  );
}
