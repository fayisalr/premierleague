"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useTournament } from '@/components/TournamentContext';

export default function Home() {
  const { liveLink, highlightsLink, matches, teams, nextFixtureHomeTeamId, nextFixtureAwayTeamId, nextFixtureTime, highlightsImage, highlightsTitle, highlightsTime } = useTournament();

  const liveMatch = matches.find(m => m.status === 'LIVE');
  const liveHomeTeam = liveMatch ? teams.find(t => t.id === liveMatch.homeTeamId) : null;
  const liveAwayTeam = liveMatch ? teams.find(t => t.id === liveMatch.awayTeamId) : null;

  const nextHomeTeam = teams.find(t => t.id === nextFixtureHomeTeamId);
  const nextAwayTeam = teams.find(t => t.id === nextFixtureAwayTeamId);

  return (
    <main>
      {/* HERO BANNER */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '70vh',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4313tyLY_QsFYniLQyEISgPj9Gx8Mi7EfNb91oK2Y0IJTvJ4WuvOaeusH4n-i6zGV3ucdNSRx9hQ8tewC6PwRh403XqpCtJDmPjxPdTsYVtL_aMOaGjCXX2XOyr_8SL1v0UH-1Mrmnd_8EWehRo5HjKOcIiWFyURSHMi_stfmK6WWwAplP2CKZUoQCBMEE7ZwLBGiYsRMl-g80SrjnuIcC7T_lLhStj8jZsngddha1iGMVJv6psLshmmpyUJTSrZ8ft9gDV1mSvU" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--surface), rgba(18, 20, 20, 0.4), transparent)' }}></div>
        </div>
        
        <div className="container" style={{ position: 'relative', zIndex: 10, paddingBottom: '64px' }}>
          <div style={{ maxWidth: '768px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ 
              backgroundColor: 'var(--secondary-container)', 
              color: 'var(--on-secondary-container)', 
              padding: '4px 12px', 
              display: 'inline-block',
              width: 'fit-content'
            }} className="label-caps">SEASON 2026 LIVE</span>
            
            <h1 className="display-lg" style={{ color: 'var(--primary)', textTransform: 'uppercase' }}>
              WHERE LEGENDS ARE FORGED IN FIVE
            </h1>
            
            <p className="body-lg" style={{ color: 'var(--on-surface-variant)', maxWidth: '600px' }}>
              Real-time analytics, high-intensity competition, and the search for the world's most elite small-sided squads. 
              Tracking every touch, every goal, and every moment of brilliance.
            </p>
            
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap' }}>
              <a href={liveLink || "#"} target={liveLink ? "_blank" : undefined} style={{
                backgroundColor: 'var(--secondary-container)',
                color: 'white',
                padding: '16px 32px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none'
              }} className="label-caps">
                <span>WATCH LIVE NOW</span>
                <span className="material-symbols-outlined" style={{ textTransform: 'none' }}>play_circle</span>
              </a>
              
              <Link href="/fixtures" style={{
                backgroundColor: 'transparent',
                border: '1px solid var(--outline)',
                color: 'var(--on-surface)',
                padding: '16px 32px',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }} className="label-caps">
                VIEW FIXTURES
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD CONTENT - BENTO GRID */}
      <section className="container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="grid">
          
          {/* FEATURED HIGHLIGHTS (Bento Large) */}
          <div className="card bento-col-8" style={{ 
            position: 'relative', 
            padding: 0, 
            height: '500px', 
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'flex-end'
          }}>
            <img 
              src={highlightsImage || "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800"}
              alt="Match Highlights"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--surface-container-lowest), transparent)' }}></div>
            <div style={{ position: 'relative', padding: '32px', width: '100%', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span className="label-caps" style={{ background: 'var(--primary)', color: 'var(--on-primary)', padding: '2px 8px' }}>MATCH HIGHLIGHTS</span>
                <span className="label-caps" style={{ color: 'var(--on-surface-variant)' }}>{highlightsTime || '2 HOURS AGO'}</span>
              </div>
              <h2 className="headline-md" style={{ color: 'white', marginBottom: '16px' }}>{highlightsTitle || 'RAPTORS CRUSH DEFENSE IN 5-0 SWEEP'}</h2>
              <a href={highlightsLink || "#"} target={highlightsLink ? "_blank" : undefined} style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '12px 24px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none'
              }} className="label-caps">
                <span>PLAY HIGHLIGHTS</span>
                <span className="material-symbols-outlined" style={{ textTransform: 'none' }}>smart_display</span>
              </a>
            </div>
          </div>

          {/* TOP SCORERS (Bento Tall) */}
          <div className="card bento-col-4" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 className="headline-md" style={{ color: 'var(--primary)', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '16px', marginBottom: '32px' }}>TOP STRIKERS</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
              {[
                { rank: '01', name: 'LEO VALDEZ', team: 'THE TITANS', goals: '24' },
                { rank: '02', name: 'MARCUS REED', team: 'RAPTORS FC', goals: '19' },
                { rank: '03', name: 'SAUL GOMEZ', team: 'STRIKERS UNT', goals: '18' }
              ].map((player) => (
                <div key={player.rank} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span className="stats-xl" style={{ color: 'var(--outline-variant)' }}>{player.rank}</span>
                    <div>
                      <p className="label-caps" style={{ color: 'var(--on-surface)' }}>{player.name}</p>
                      <p className="body-sm" style={{ color: 'var(--on-surface-variant)' }}>{player.team}</p>
                    </div>
                  </div>
                  <span className="stats-xl" style={{ color: player.rank === '01' ? 'var(--primary)' : 'white' }}>{player.goals}</span>
                </div>
              ))}
            </div>
            
            <button style={{
              width: '100%',
              marginTop: '32px',
              background: 'transparent',
              border: '1px solid var(--outline-variant)',
              color: 'var(--on-surface-variant)',
              padding: '16px',
              cursor: 'pointer'
            }} className="label-caps">
              VIEW FULL LEADERBOARD
            </button>
          </div>

          {/* LIVE STATS CENTER (Bento Medium) */}
          {liveMatch && liveHomeTeam && liveAwayTeam ? (
            <div className="card bento-col-6" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)', borderColor: 'rgba(172, 207, 179, 0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '48px' }}>
                <div>
                  <span className="label-caps" style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="live-dot" style={{ width: '8px', height: '8px', background: 'var(--secondary-container)', borderRadius: '50%' }}></span>
                    MATCH CENTER LIVE
                  </span>
                  <h3 className="headline-md" style={{ color: 'white' }}>{liveHomeTeam.name.toUpperCase()} VS {liveAwayTeam.name.toUpperCase()}</h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="stats-xl" style={{ color: 'var(--secondary)' }}>{liveMatch.homeScore ?? 0} - {liveMatch.awayScore ?? 0}</span>
                  <p className="label-caps" style={{ color: 'var(--on-surface-variant)' }}>{liveMatch.time.toUpperCase()}</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: 'POSSESSION', value: `${liveMatch.stats?.possessionHome ?? 50}% - ${liveMatch.stats?.possessionAway ?? 50}%`, percent: `${liveMatch.stats?.possessionHome ?? 50}%`, color: 'var(--primary)' },
                  { label: 'SHOTS ON TARGET', value: `${liveMatch.stats?.shotsHome ?? 0} - ${liveMatch.stats?.shotsAway ?? 0}`, percent: liveMatch.stats ? `${(liveMatch.stats.shotsHome / ((liveMatch.stats.shotsHome + liveMatch.stats.shotsAway) || 1)) * 100}%` : '50%', color: 'var(--secondary)' },
                  { label: 'FOULS', value: `${liveMatch.stats?.foulsHome ?? 0} - ${liveMatch.stats?.foulsAway ?? 0}`, percent: liveMatch.stats ? `${(liveMatch.stats.foulsHome / ((liveMatch.stats.foulsHome + liveMatch.stats.foulsAway) || 1)) * 100}%` : '50%', color: 'var(--error)' }
                ].map(stat => (
                  <div key={stat.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span className="label-caps" style={{ color: 'var(--on-surface-variant)' }}>{stat.label}</span>
                      <span className="label-caps" style={{ color: 'var(--on-surface)' }}>{stat.value}</span>
                    </div>
                    <div style={{ height: '4px', background: 'var(--surface-container-highest)', width: '100%' }}>
                      <div style={{ height: '100%', background: stat.color, width: stat.percent }}></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
                <a href={liveLink || "#"} target={liveLink ? "_blank" : undefined} className="label-caps" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                  LIVE COMMENTARY
                  <span className="material-symbols-outlined" style={{ textTransform: 'none' }}>arrow_forward</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="card bento-col-6" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <h3 className="headline-md" style={{ color: 'var(--on-surface-variant)' }}>NO LIVE MATCHES</h3>
            </div>
          )}

          {/* UPCOMING FIXTURE (Bento Small) */}
          <div className="card bento-col-6" style={{ background: 'var(--surface-container-high)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 className="headline-md" style={{ color: 'white', marginBottom: '24px' }}>NEXT FIXTURE</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '24px 0', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                {/* Home Team */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '64px', height: '64px', background: 'var(--surface-container-highest)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)', padding: '8px' }}>
                    {nextHomeTeam ? (
                      <img src={nextHomeTeam.img} alt={nextHomeTeam.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                      <span className="material-symbols-outlined" style={{ fontSize: '40px', color: 'var(--primary)' }}>shield</span>
                    )}
                  </div>
                  <span className="label-caps" style={{ textAlign: 'center' }}>{nextHomeTeam ? nextHomeTeam.name : 'HOME'}</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span className="stats-md" style={{ color: 'var(--on-surface-variant)' }}>VS</span>
                  <span className="label-caps" style={{ color: 'var(--secondary)', textAlign: 'center' }}>{nextFixtureTime || '20:00 GMT'}</span>
                </div>
                
                {/* Away Team */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '64px', height: '64px', background: 'var(--surface-container-highest)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)', padding: '8px' }}>
                    {nextAwayTeam ? (
                      <img src={nextAwayTeam.img} alt={nextAwayTeam.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                      <span className="material-symbols-outlined" style={{ fontSize: '40px', color: 'white' }}>tsunami</span>
                    )}
                  </div>
                  <span className="label-caps" style={{ textAlign: 'center' }}>{nextAwayTeam ? nextAwayTeam.name : 'AWAY'}</span>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
              <button style={{ flex: 1, background: 'var(--primary)', color: 'var(--on-primary)', border: 'none', padding: '16px', cursor: 'pointer' }} className="label-caps">NOTIFY ME</button>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
