"use client";

import { useTournament } from '@/components/TournamentContext';

export default function Standings() {
  const { standings, teams } = useTournament();

  // Sort standings by points descending
  const sortedStandings = [...standings].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    return b.gd - a.gd;
  });

  const getIcon = (teamId: string) => {
    switch (teamId) {
      case 'team-1': return 'shield';
      case 'team-2': return 'swords';
      case 'team-3': return 'bolt';
      case 'team-4': return 'diamond';
      case 'team-5': return 'tsunami';
      default: return 'sports_soccer';
    }
  };

  return (
    <main className="container" style={{ minHeight: '100vh', paddingBottom: '96px', paddingTop: '64px' }}>
      {/* Hero Section / Title */}
      <section style={{ marginBottom: '64px' }}>
        <h1 className="display-lg" style={{ color: 'var(--on-surface)', textTransform: 'uppercase', marginBottom: '16px' }}>League Standings</h1>
        <div style={{ height: '4px', width: '96px', background: 'var(--tertiary)', marginBottom: '32px' }}></div>
        <p className="body-lg" style={{ maxWidth: '600px', color: 'var(--on-surface-variant)', borderLeft: '4px solid var(--primary)', paddingLeft: '24px', paddingTop: '8px', paddingBottom: '8px' }}>
          Real-time performance metrics for the Elite Five. Tracking every goal, every victory, and every heartbeat on the pitch. Precision data for the modern game.
        </p>
      </section>

      {/* Standings Bento Grid */}
      <div className="grid">
        
        {/* Main Leaderboard */}
        <div className="bento-col-8" style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ background: 'var(--surface-container)', padding: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="headline-md" style={{ color: 'var(--on-surface)', textTransform: 'uppercase' }}>Current Table</h2>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--tertiary)' }}>
              <span style={{ width: '8px', height: '8px', background: 'var(--tertiary)', borderRadius: '50%' }}></span>
              <span className="label-caps">Live Updates</span>
            </span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--surface-container-high)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th className="label-caps" style={{ padding: '24px', color: 'var(--on-surface-variant)' }}>Pos</th>
                  <th className="label-caps" style={{ padding: '24px', color: 'var(--on-surface-variant)' }}>Team</th>
                  <th className="label-caps" style={{ padding: '24px', color: 'var(--on-surface-variant)', textAlign: 'center' }}>P</th>
                  <th className="label-caps" style={{ padding: '24px', color: 'var(--on-surface-variant)', textAlign: 'center' }}>W</th>
                  <th className="label-caps" style={{ padding: '24px', color: 'var(--on-surface-variant)', textAlign: 'center' }}>L</th>
                  <th className="label-caps" style={{ padding: '24px', color: 'var(--on-surface-variant)', textAlign: 'center' }}>GD</th>
                  <th className="label-caps" style={{ padding: '24px', color: 'var(--primary)', textAlign: 'center' }}>Pts</th>
                </tr>
              </thead>
              <tbody>
                {sortedStandings.map((row, index) => {
                  const team = teams.find(t => t.id === row.teamId);
                  if (!team) return null;
                  const isTop = index === 0;
                  const pos = String(index + 1).padStart(2, '0');

                  return (
                    <tr key={row.teamId} style={{ 
                      background: isTop ? 'rgba(172, 207, 179, 0.1)' : 'transparent',
                      borderLeft: isTop ? '4px solid var(--tertiary)' : 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      boxShadow: isTop ? 'inset 0 0 20px rgba(176, 213, 0, 0.1)' : 'none',
                      transition: 'all 0.3s'
                    }}>
                      <td className="stats-md" style={{ padding: '24px', color: isTop ? 'var(--tertiary)' : 'var(--on-surface-variant)' }}>{pos}</td>
                      <td style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ width: '40px', height: '40px', background: 'var(--surface-container-highest)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${isTop ? 'var(--tertiary)' : 'rgba(255,255,255,0.1)'}` }}>
                            <span className="material-symbols-outlined" style={{ color: isTop ? 'var(--tertiary)' : 'var(--on-surface-variant)' }}>{getIcon(row.teamId)}</span>
                          </div>
                          <span className="headline-md" style={{ fontSize: '20px', textTransform: 'uppercase', color: 'var(--on-surface)' }}>{team.name}</span>
                        </div>
                      </td>
                      <td className="stats-md" style={{ padding: '24px', textAlign: 'center', color: 'var(--on-surface)' }}>{row.p}</td>
                      <td className="stats-md" style={{ padding: '24px', textAlign: 'center', color: 'var(--on-surface)' }}>{row.w}</td>
                      <td className="stats-md" style={{ padding: '24px', textAlign: 'center', color: 'var(--on-surface)' }}>{row.l}</td>
                      <td className="stats-md" style={{ padding: '24px', textAlign: 'center', color: row.gd > 0 ? 'var(--secondary)' : 'var(--error)' }}>{row.gd > 0 ? `+${row.gd}` : row.gd}</td>
                      <td className="stats-xl" style={{ padding: '24px', textAlign: 'center', color: isTop ? 'var(--primary)' : 'var(--on-surface)', fontSize: '32px' }}>{row.pts}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="bento-col-4" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Top Scorer Card */}
          <div style={{ background: 'var(--surface-container)', border: '1px solid rgba(255,255,255,0.1)', padding: '32px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, padding: '16px', opacity: 0.1 }}>
              <span className="material-symbols-outlined" style={{ fontSize: '80px' }}>sports_soccer</span>
            </div>
            <h3 className="label-caps" style={{ color: 'var(--on-surface-variant)', marginBottom: '24px' }}>Top Scorer</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span className="headline-md" style={{ color: 'var(--tertiary)', textTransform: 'uppercase' }}>M. VANDELAY</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <p className="body-sm" style={{ color: 'var(--on-surface-variant)' }}>Iron Vanguard</p>
                  <p className="stats-xl" style={{ color: 'var(--primary)' }}>14 <span className="body-lg" style={{ color: 'var(--on-surface)', textTransform: 'uppercase' }}>Goals</span></p>
                </div>
                <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '36px' }}>trending_up</span>
              </div>
            </div>
          </div>

          {/* Next High-Impact Match */}
          <div style={{ background: 'var(--surface-container-highest)', borderLeft: '8px solid var(--secondary)', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '300px', position: 'relative' }}>
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBB-pV8pgkznFxJl6zBnR3wBWabyDfna3yaQR_GGJe2-05eDEFZQvUAtwRjsos9PD5T99eiHW7RxIk1MEVJAnCiYJVwLHnZssXL-t7ScbRJrBgmVmmGRION8QdUuvyfmcoSdc1ypKgsz-wkqVFgis6GqhKPtstDhdW-RSP8msxVV-BlDcreO-fqd0H8cmTyI_IihI5s7IkvI3l3k-Unb6oSbqo1YM7XQRs-ZCrmNVrff_wfCPzVdxJXURpPM9tiS9A6p6iOPi2nst4" 
              alt="Match Background" 
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.1 }}
            />
            <div style={{ position: 'relative', zIndex: 10 }}>
              <h3 className="label-caps" style={{ color: 'var(--secondary)', marginBottom: '8px' }}>Upcoming Match</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                <span className="headline-md" style={{ fontSize: '24px', textTransform: 'uppercase', color: 'var(--on-surface)' }}>Iron Vanguard</span>
                <span className="stats-md" style={{ color: 'var(--on-surface-variant)' }}>VS</span>
                <span className="headline-md" style={{ fontSize: '24px', textTransform: 'uppercase', color: 'var(--on-surface)' }}>Apex Falcons</span>
              </div>
            </div>
            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span className="label-caps" style={{ color: 'var(--on-surface-variant)' }}>Tournament Final</span>
                <span className="stats-md" style={{ color: 'var(--on-surface)' }}>SAT, 20:00</span>
              </div>
              <button style={{ width: '100%', background: 'var(--secondary)', color: 'var(--on-secondary)', padding: '12px', border: 'none', cursor: 'pointer', letterSpacing: '0.1em' }} className="label-caps">
                GET TICKETS
              </button>
            </div>
          </div>

          {/* League Statistics Quick View */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: 'var(--surface-container)', padding: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="label-caps" style={{ color: 'var(--on-surface-variant)', marginBottom: '8px' }}>Total Goals</p>
              <p className="stats-xl" style={{ color: 'var(--on-surface)' }}>142</p>
            </div>
            <div style={{ background: 'var(--surface-container)', padding: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="label-caps" style={{ color: 'var(--on-surface-variant)', marginBottom: '8px' }}>Matches Played</p>
              <p className="stats-xl" style={{ color: 'var(--on-surface)' }}>48</p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
