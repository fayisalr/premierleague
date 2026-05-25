"use client";

import React, { useState } from 'react';
import { useTournament, Team, Player, Standing, Match } from '@/components/TournamentContext';

export default function AdminDashboard() {
  const { isAdmin } = useTournament();
  const [activeTab, setActiveTab] = useState<'teams' | 'players' | 'standings' | 'fixtures' | 'gallery' | 'settings'>('teams');
  
  if (!isAdmin) {
    return (
      <main className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '64px', color: 'var(--error)', marginBottom: '16px' }}>lock</span>
          <h1 className="headline-md" style={{ color: 'var(--on-surface)' }}>Access Denied</h1>
          <p className="body-lg" style={{ color: 'var(--on-surface-variant)', marginTop: '8px' }}>Please login to access the Admin Dashboard.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container" style={{ minHeight: '100vh', paddingBottom: '96px', paddingTop: '48px' }}>
      <header style={{ marginBottom: '48px' }}>
        <h1 className="display-lg" style={{ color: 'var(--primary)', textTransform: 'uppercase' }}>Admin Dashboard</h1>
        <p className="body-lg" style={{ color: 'var(--on-surface-variant)' }}>Manage all tournament data from this control panel.</p>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
        {(['teams', 'players', 'standings', 'fixtures', 'gallery', 'settings'] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? 'var(--surface-container-highest)' : 'transparent',
              color: activeTab === tab ? 'var(--on-surface)' : 'var(--on-surface-variant)',
              border: 'none',
              padding: '12px 24px',
              cursor: 'pointer',
              borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent',
              textTransform: 'uppercase'
            }}
            className="label-caps"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ background: 'var(--surface-container)', border: '1px solid var(--outline-variant)', padding: '32px' }}>
        {activeTab === 'teams' && <TeamsEditor />}
        {activeTab === 'players' && <PlayersEditor />}
        {activeTab === 'standings' && <StandingsEditor />}
        {activeTab === 'fixtures' && <FixturesEditor />}
        {activeTab === 'gallery' && <GalleryEditor />}
        {activeTab === 'settings' && <SettingsEditor />}
      </div>

    </main>
  );
}

function TeamsEditor() {
  const { teams, updateTeam } = useTournament();
  
  return (
    <div>
      <h2 className="headline-md" style={{ marginBottom: '24px' }}>Edit Teams</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {teams.map(team => (
          <div key={team.id} style={{ display: 'flex', gap: '16px', background: 'var(--surface-container-high)', padding: '16px', alignItems: 'center' }}>
            <img src={team.img} alt={team.name} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
            <input 
              value={team.name} 
              onChange={e => updateTeam(team.id, { name: e.target.value })}
              style={{ background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '8px', flex: 1 }}
            />
            <input 
              value={team.rank} 
              onChange={e => updateTeam(team.id, { rank: e.target.value })}
              style={{ background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '8px', width: '80px' }}
              placeholder="Rank"
            />
            <input 
              value={team.winRate} 
              onChange={e => updateTeam(team.id, { winRate: e.target.value })}
              style={{ background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '8px', width: '100px' }}
              placeholder="Win Rate"
            />
            <input 
              value={team.color} 
              onChange={e => updateTeam(team.id, { color: e.target.value })}
              style={{ background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '8px', width: '150px' }}
              placeholder="Color"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function PlayersEditor() {
  const { players, teams, addPlayer, updatePlayer, removePlayer } = useTournament();

  const [newPlayer, setNewPlayer] = useState<Omit<Player, 'id'>>({
    name: '',
    imageUrl: '',
    position: 'Forward',
    teamId: teams[0]?.id || '',
    number: ''
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayer.name || !newPlayer.teamId) return;
    
    addPlayer({
      ...newPlayer,
      imageUrl: newPlayer.imageUrl || 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=200&auto=format&fit=crop'
    });
    
    setNewPlayer({
      name: '',
      imageUrl: '',
      position: 'Forward',
      teamId: teams[0]?.id || '',
      number: ''
    });
  };

  return (
    <div>
      <h2 className="headline-md" style={{ marginBottom: '24px' }}>Manage Players</h2>
      
      {/* Add New Player Form */}
      <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', background: 'var(--surface-container-high)', padding: '16px', marginBottom: '32px', border: '1px solid var(--primary)' }}>
        <input 
          type="text" 
          value={newPlayer.name} 
          onChange={e => setNewPlayer({...newPlayer, name: e.target.value})}
          placeholder="New Player Name"
          required
          style={{ background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '8px', flex: 1, minWidth: '150px' }}
        />
        <input 
          type="text" 
          value={newPlayer.imageUrl} 
          onChange={e => setNewPlayer({...newPlayer, imageUrl: e.target.value})}
          placeholder="Photo URL (Optional)"
          style={{ background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '8px', flex: 1, minWidth: '150px' }}
        />
        <select 
          value={newPlayer.teamId} 
          onChange={e => setNewPlayer({...newPlayer, teamId: e.target.value})}
          required
          style={{ background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '8px' }}
        >
          {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <select 
          value={newPlayer.position} 
          onChange={e => setNewPlayer({...newPlayer, position: e.target.value})}
          style={{ background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '8px' }}
        >
          <option>Forward</option>
          <option>Midfielder</option>
          <option>Defender</option>
          <option>Goalkeeper</option>
        </select>
        <input 
          type="number" 
          value={newPlayer.number} 
          onChange={e => setNewPlayer({...newPlayer, number: e.target.value})}
          placeholder="Kit #"
          style={{ background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '8px', width: '80px' }}
        />
        <button 
          type="submit"
          style={{ background: 'var(--primary)', color: 'var(--on-primary)', border: 'none', padding: '8px 16px', cursor: 'pointer' }}
          className="label-caps"
        >
          Add
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {players.map(player => (
          <div key={player.id} style={{ display: 'flex', gap: '16px', background: 'var(--surface-container-high)', padding: '16px', alignItems: 'center' }}>
            <img src={player.imageUrl} alt={player.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '50%' }} />
            <input 
              value={player.name} 
              onChange={e => updatePlayer(player.id, { name: e.target.value })}
              style={{ background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '8px', flex: 1 }}
            />
            <select 
              value={player.teamId} 
              onChange={e => updatePlayer(player.id, { teamId: e.target.value })}
              style={{ background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '8px' }}
            >
              {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <input 
              value={player.number} 
              onChange={e => updatePlayer(player.id, { number: e.target.value })}
              style={{ background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '8px', width: '80px' }}
            />
            <button 
              onClick={() => removePlayer(player.id)}
              style={{ background: 'var(--error)', color: 'var(--on-error)', border: 'none', padding: '8px 16px', cursor: 'pointer' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function StandingsEditor() {
  const { standings, teams, updateStanding } = useTournament();

  return (
    <div>
      <h2 className="headline-md" style={{ marginBottom: '24px' }}>Edit Standings</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '16px', padding: '0 16px', color: 'var(--on-surface-variant)' }} className="label-caps">
          <span style={{ flex: 1 }}>Team</span>
          <span style={{ width: '60px', textAlign: 'center' }}>P</span>
          <span style={{ width: '60px', textAlign: 'center' }}>W</span>
          <span style={{ width: '60px', textAlign: 'center' }}>L</span>
          <span style={{ width: '60px', textAlign: 'center' }}>GD</span>
          <span style={{ width: '60px', textAlign: 'center' }}>Pts</span>
        </div>
        {standings.map(standing => {
          const team = teams.find(t => t.id === standing.teamId);
          return (
            <div key={standing.teamId} style={{ display: 'flex', gap: '16px', background: 'var(--surface-container-high)', padding: '16px', alignItems: 'center' }}>
              <span style={{ flex: 1, color: 'var(--on-surface)', fontWeight: 'bold' }}>{team?.name}</span>
              <input 
                type="number" value={standing.p} 
                onChange={e => updateStanding(standing.teamId, { p: parseInt(e.target.value) || 0 })}
                style={{ width: '60px', background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '8px', textAlign: 'center' }}
              />
              <input 
                type="number" value={standing.w} 
                onChange={e => updateStanding(standing.teamId, { w: parseInt(e.target.value) || 0 })}
                style={{ width: '60px', background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '8px', textAlign: 'center' }}
              />
              <input 
                type="number" value={standing.l} 
                onChange={e => updateStanding(standing.teamId, { l: parseInt(e.target.value) || 0 })}
                style={{ width: '60px', background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '8px', textAlign: 'center' }}
              />
              <input 
                type="number" value={standing.gd} 
                onChange={e => updateStanding(standing.teamId, { gd: parseInt(e.target.value) || 0 })}
                style={{ width: '60px', background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '8px', textAlign: 'center' }}
              />
              <input 
                type="number" value={standing.pts} 
                onChange={e => updateStanding(standing.teamId, { pts: parseInt(e.target.value) || 0 })}
                style={{ width: '60px', background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--primary)', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FixturesEditor() {
  const { matches, teams, updateMatch } = useTournament();

  return (
    <div>
      <h2 className="headline-md" style={{ marginBottom: '24px' }}>Edit Fixtures</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {matches.map(match => {
          const homeTeam = teams.find(t => t.id === match.homeTeamId);
          const awayTeam = teams.find(t => t.id === match.awayTeamId);

          return (
            <div key={match.id} style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--surface-container-high)', padding: '24px', border: '1px solid var(--outline-variant)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="label-caps" style={{ color: 'var(--on-surface-variant)' }}>ID: {match.id}</span>
                <select 
                  value={match.status} 
                  onChange={e => updateMatch(match.id, { status: e.target.value as any })}
                  style={{ background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '8px' }}
                >
                  <option value="UPCOMING">Upcoming</option>
                  <option value="LIVE">Live</option>
                  <option value="FT">Full Time</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img src={homeTeam?.img} style={{ width: '32px', height: '32px' }} />
                  <span className="headline-md" style={{ fontSize: '20px' }}>{homeTeam?.name}</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input 
                    type="number" value={match.homeScore ?? ''} 
                    onChange={e => updateMatch(match.id, { homeScore: e.target.value ? parseInt(e.target.value) : null })}
                    style={{ width: '60px', background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--primary)', padding: '12px', textAlign: 'center', fontSize: '24px' }}
                    placeholder="-"
                  />
                  <span className="stats-md" style={{ color: 'var(--on-surface-variant)' }}>—</span>
                  <input 
                    type="number" value={match.awayScore ?? ''} 
                    onChange={e => updateMatch(match.id, { awayScore: e.target.value ? parseInt(e.target.value) : null })}
                    style={{ width: '60px', background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--primary)', padding: '12px', textAlign: 'center', fontSize: '24px' }}
                    placeholder="-"
                  />
                </div>

                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'flex-end' }}>
                  <span className="headline-md" style={{ fontSize: '20px' }}>{awayTeam?.name}</span>
                  <img src={awayTeam?.img} style={{ width: '32px', height: '32px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <input 
                  value={match.time} 
                  onChange={e => updateMatch(match.id, { time: e.target.value })}
                  style={{ flex: 1, background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '8px' }}
                  placeholder="Time (e.g. 20:45 or 74')"
                />
                <input 
                  value={match.venue} 
                  onChange={e => updateMatch(match.id, { venue: e.target.value })}
                  style={{ flex: 2, background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '8px' }}
                  placeholder="Venue"
                />
              </div>

              {match.status === 'LIVE' && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--outline-variant)' }}>
                  <h4 className="label-caps" style={{ color: 'var(--secondary)', marginBottom: '16px' }}>Live Stats (Home - Away)</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    
                    {/* Possession */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface-container)', padding: '12px', border: '1px solid var(--outline-variant)' }}>
                      <span className="body-sm" style={{ color: 'var(--on-surface-variant)' }}>Possession %</span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input type="number" placeholder="H" value={match.stats?.possessionHome ?? ''} onChange={e => updateMatch(match.id, { stats: { ...match.stats, possessionHome: parseInt(e.target.value) || 0 } as any })} style={{ width: '50px', padding: '8px', background: 'var(--surface-container-highest)', color: 'var(--on-surface)', border: '1px solid var(--outline-variant)', textAlign: 'center' }} />
                        <input type="number" placeholder="A" value={match.stats?.possessionAway ?? ''} onChange={e => updateMatch(match.id, { stats: { ...match.stats, possessionAway: parseInt(e.target.value) || 0 } as any })} style={{ width: '50px', padding: '8px', background: 'var(--surface-container-highest)', color: 'var(--on-surface)', border: '1px solid var(--outline-variant)', textAlign: 'center' }} />
                      </div>
                    </div>

                    {/* Shots on Target */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface-container)', padding: '12px', border: '1px solid var(--outline-variant)' }}>
                      <span className="body-sm" style={{ color: 'var(--on-surface-variant)' }}>Shots Target</span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input type="number" placeholder="H" value={match.stats?.shotsHome ?? ''} onChange={e => updateMatch(match.id, { stats: { ...match.stats, shotsHome: parseInt(e.target.value) || 0 } as any })} style={{ width: '50px', padding: '8px', background: 'var(--surface-container-highest)', color: 'var(--on-surface)', border: '1px solid var(--outline-variant)', textAlign: 'center' }} />
                        <input type="number" placeholder="A" value={match.stats?.shotsAway ?? ''} onChange={e => updateMatch(match.id, { stats: { ...match.stats, shotsAway: parseInt(e.target.value) || 0 } as any })} style={{ width: '50px', padding: '8px', background: 'var(--surface-container-highest)', color: 'var(--on-surface)', border: '1px solid var(--outline-variant)', textAlign: 'center' }} />
                      </div>
                    </div>

                    {/* Fouls */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface-container)', padding: '12px', border: '1px solid var(--outline-variant)' }}>
                      <span className="body-sm" style={{ color: 'var(--on-surface-variant)' }}>Fouls</span>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input type="number" placeholder="H" value={match.stats?.foulsHome ?? ''} onChange={e => updateMatch(match.id, { stats: { ...match.stats, foulsHome: parseInt(e.target.value) || 0 } as any })} style={{ width: '50px', padding: '8px', background: 'var(--surface-container-highest)', color: 'var(--on-surface)', border: '1px solid var(--outline-variant)', textAlign: 'center' }} />
                        <input type="number" placeholder="A" value={match.stats?.foulsAway ?? ''} onChange={e => updateMatch(match.id, { stats: { ...match.stats, foulsAway: parseInt(e.target.value) || 0 } as any })} style={{ width: '50px', padding: '8px', background: 'var(--surface-container-highest)', color: 'var(--on-surface)', border: '1px solid var(--outline-variant)', textAlign: 'center' }} />
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GalleryEditor() {
  const { photos, addPhoto, removePhoto } = useTournament();
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    addPhoto({ url: newUrl, caption: newCaption });
    setNewUrl('');
    setNewCaption('');
  };

  return (
    <div>
      <h2 className="headline-md" style={{ marginBottom: '24px' }}>Manage Gallery</h2>
      
      <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', background: 'var(--surface-container-high)', padding: '16px', marginBottom: '32px', border: '1px solid var(--primary)' }}>
        <input 
          type="url" 
          value={newUrl} 
          onChange={e => setNewUrl(e.target.value)}
          placeholder="Image URL (e.g. https://...)"
          required
          style={{ background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '8px', flex: 2, minWidth: '200px' }}
        />
        <input 
          type="text" 
          value={newCaption} 
          onChange={e => setNewCaption(e.target.value)}
          placeholder="Caption (Optional)"
          style={{ background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '8px', flex: 1, minWidth: '150px' }}
        />
        <button 
          type="submit"
          style={{ background: 'var(--primary)', color: 'var(--on-primary)', border: 'none', padding: '8px 16px', cursor: 'pointer' }}
          className="label-caps"
        >
          Add Photo
        </button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
        {photos.map(photo => (
          <div key={photo.id} style={{ display: 'flex', flexDirection: 'column', background: 'var(--surface-container-high)', border: '1px solid var(--outline-variant)' }}>
            <img src={photo.url} alt={photo.caption || undefined} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, justifyContent: 'space-between' }}>
              <span className="body-md" style={{ color: 'var(--on-surface)' }}>{photo.caption || 'No caption'}</span>
              <button 
                onClick={() => removePhoto(photo.id)}
                style={{ background: 'var(--error)', color: 'var(--on-error)', border: 'none', padding: '8px 16px', cursor: 'pointer', alignSelf: 'flex-start' }}
                className="label-caps"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsEditor() {
  const { 
    liveLink, updateLiveLink, 
    highlightsLink, updateHighlightsLink,
    teams,
    nextFixtureHomeTeamId, updateNextFixtureHomeTeamId,
    nextFixtureAwayTeamId, updateNextFixtureAwayTeamId,
    nextFixtureTime, updateNextFixtureTime,
    highlightsImage, updateHighlightsImage,
    highlightsTitle, updateHighlightsTitle,
    highlightsTime, updateHighlightsTime
  } = useTournament();

  const [localLiveLink, setLocalLiveLink] = useState(liveLink);
  const [localHighlightsLink, setLocalHighlightsLink] = useState(highlightsLink);
  const [localHomeTeamId, setLocalHomeTeamId] = useState(nextFixtureHomeTeamId);
  const [localAwayTeamId, setLocalAwayTeamId] = useState(nextFixtureAwayTeamId);
  const [localTime, setLocalTime] = useState(nextFixtureTime);
  const [localHighlightsImage, setLocalHighlightsImage] = useState(highlightsImage);
  const [localHighlightsTitle, setLocalHighlightsTitle] = useState(highlightsTitle);
  const [localHighlightsTime, setLocalHighlightsTime] = useState(highlightsTime);
  
  const [liveSaved, setLiveSaved] = useState(false);
  const [highlightsSaved, setHighlightsSaved] = useState(false);
  const [fixtureSaved, setFixtureSaved] = useState(false);

  // Sync state when context values load
  React.useEffect(() => {
    setLocalLiveLink(liveLink);
  }, [liveLink]);

  React.useEffect(() => {
    setLocalHighlightsLink(highlightsLink);
  }, [highlightsLink]);

  React.useEffect(() => {
    setLocalHomeTeamId(nextFixtureHomeTeamId);
  }, [nextFixtureHomeTeamId]);

  React.useEffect(() => {
    setLocalAwayTeamId(nextFixtureAwayTeamId);
  }, [nextFixtureAwayTeamId]);

  React.useEffect(() => {
    setLocalTime(nextFixtureTime);
  }, [nextFixtureTime]);

  React.useEffect(() => {
    setLocalHighlightsImage(highlightsImage);
  }, [highlightsImage]);

  React.useEffect(() => {
    setLocalHighlightsTitle(highlightsTitle);
  }, [highlightsTitle]);

  React.useEffect(() => {
    setLocalHighlightsTime(highlightsTime);
  }, [highlightsTime]);

  const handleSaveLive = (e: React.FormEvent) => {
    e.preventDefault();
    updateLiveLink(localLiveLink);
    setLiveSaved(true);
    setTimeout(() => setLiveSaved(false), 3000);
  };

  const handleSaveHighlights = (e: React.FormEvent) => {
    e.preventDefault();
    updateHighlightsLink(localHighlightsLink);
    updateHighlightsImage(localHighlightsImage);
    updateHighlightsTitle(localHighlightsTitle);
    updateHighlightsTime(localHighlightsTime);
    setHighlightsSaved(true);
    setTimeout(() => setHighlightsSaved(false), 3000);
  };

  const handleSaveFixture = (e: React.FormEvent) => {
    e.preventDefault();
    updateNextFixtureHomeTeamId(localHomeTeamId);
    updateNextFixtureAwayTeamId(localAwayTeamId);
    updateNextFixtureTime(localTime);
    setFixtureSaved(true);
    setTimeout(() => setFixtureSaved(false), 3000);
  };

  return (
    <div>
      <h2 className="headline-md" style={{ marginBottom: '24px' }}>System Settings</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Next Fixture Settings */}
        <div style={{ background: 'var(--surface-container-high)', padding: '24px', border: '1px solid var(--outline-variant)' }}>
          <h3 className="label-caps" style={{ color: 'var(--on-surface-variant)', marginBottom: '16px' }}>Next Fixture Settings</h3>
          <form onSubmit={handleSaveFixture} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              
              {/* Home Team Select */}
              <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="label-caps" style={{ color: 'var(--on-surface-variant)', fontSize: '10px' }}>Home Team</label>
                <select 
                  value={localHomeTeamId}
                  onChange={e => { setLocalHomeTeamId(e.target.value); setFixtureSaved(false); }}
                  style={{ width: '100%', background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '12px' }}
                >
                  {teams.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              {/* Away Team Select */}
              <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="label-caps" style={{ color: 'var(--on-surface-variant)', fontSize: '10px' }}>Away Team</label>
                <select 
                  value={localAwayTeamId}
                  onChange={e => { setLocalAwayTeamId(e.target.value); setFixtureSaved(false); }}
                  style={{ width: '100%', background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '12px' }}
                >
                  {teams.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              {/* Match Time Input */}
              <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="label-caps" style={{ color: 'var(--on-surface-variant)', fontSize: '10px' }}>Match Time / Details</label>
                <input 
                  type="text"
                  value={localTime}
                  onChange={e => { setLocalTime(e.target.value); setFixtureSaved(false); }}
                  placeholder="e.g. 20:00 GMT or SUN, 18:00"
                  style={{ width: '100%', background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '12px' }}
                />
              </div>

            </div>

            <button 
              type="submit"
              className="label-caps"
              style={{ alignSelf: 'flex-start', background: fixtureSaved ? 'var(--tertiary)' : 'var(--on-tertiary)', color: fixtureSaved ? 'var(--on-tertiary)' : 'var(--on-primary)', border: 'none', padding: '12px 24px', cursor: 'pointer', whiteSpace: 'nowrap', marginTop: '8px' }}
            >
              {fixtureSaved ? 'Saved ✓' : 'Save Fixture Settings'}
            </button>
          </form>
          <p className="body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: '8px' }}>
            Sets the Home Team, Away Team, and Time displayed on the "NEXT FIXTURE" banner on the main page.
          </p>
        </div>

        {/* Match Highlights Settings */}
        <div style={{ background: 'var(--surface-container-high)', padding: '24px', border: '1px solid var(--outline-variant)' }}>
          <h3 className="label-caps" style={{ color: 'var(--on-surface-variant)', marginBottom: '16px' }}>Match Highlights Settings</h3>
          <form onSubmit={handleSaveHighlights} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {/* Highlights Video Link */}
              <div style={{ flex: 1, minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="label-caps" style={{ color: 'var(--on-surface-variant)', fontSize: '10px' }}>Highlights Video URL</label>
                <input 
                  type="url"
                  value={localHighlightsLink}
                  onChange={e => { setLocalHighlightsLink(e.target.value); setHighlightsSaved(false); }}
                  placeholder="e.g. https://youtube.com/watch?v=..."
                  style={{ width: '100%', background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '12px' }}
                />
              </div>

              {/* Cover Photo Image URL */}
              <div style={{ flex: 1, minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="label-caps" style={{ color: 'var(--on-surface-variant)', fontSize: '10px' }}>Cover Photo URL</label>
                <input 
                  type="url"
                  value={localHighlightsImage}
                  onChange={e => { setLocalHighlightsImage(e.target.value); setHighlightsSaved(false); }}
                  placeholder="e.g. https://images.unsplash.com/..."
                  style={{ width: '100%', background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '12px' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {/* Title / Headline */}
              <div style={{ flex: 2, minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="label-caps" style={{ color: 'var(--on-surface-variant)', fontSize: '10px' }}>Headline / Title</label>
                <input 
                  type="text"
                  value={localHighlightsTitle}
                  onChange={e => { setLocalHighlightsTitle(e.target.value); setHighlightsSaved(false); }}
                  placeholder="e.g. RAPTORS CRUSH DEFENSE IN 5-0 SWEEP"
                  style={{ width: '100%', background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '12px' }}
                />
              </div>

              {/* Time Stamp / Elapsed Time */}
              <div style={{ flex: 1, minWidth: '150px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="label-caps" style={{ color: 'var(--on-surface-variant)', fontSize: '10px' }}>Elapsed Time / Badge</label>
                <input 
                  type="text"
                  value={localHighlightsTime}
                  onChange={e => { setLocalHighlightsTime(e.target.value); setHighlightsSaved(false); }}
                  placeholder="e.g. 2 HOURS AGO"
                  style={{ width: '100%', background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '12px' }}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="label-caps"
              style={{ alignSelf: 'flex-start', background: highlightsSaved ? 'var(--tertiary)' : 'var(--on-tertiary)', color: highlightsSaved ? 'var(--on-tertiary)' : 'var(--on-primary)', border: 'none', padding: '12px 24px', cursor: 'pointer', whiteSpace: 'nowrap', marginTop: '8px' }}
            >
              {highlightsSaved ? 'Saved ✓' : 'Save Highlights Settings'}
            </button>
          </form>
          <p className="body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: '8px' }}>
            Sets the background photo, video link, header title, and elapsed time label on the homepage highlights card.
          </p>
        </div>

        {/* Live Stream URL */}
        <div style={{ background: 'var(--surface-container-high)', padding: '24px', border: '1px solid var(--outline-variant)' }}>
          <h3 className="label-caps" style={{ color: 'var(--on-surface-variant)', marginBottom: '16px' }}>Live Stream URL</h3>
          <form onSubmit={handleSaveLive} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <input 
              type="url"
              value={localLiveLink}
              onChange={e => { setLocalLiveLink(e.target.value); setLiveSaved(false); }}
              placeholder="e.g. https://facebook.com/live/..."
              style={{ flex: 1, background: 'var(--surface-container-highest)', border: '1px solid var(--outline-variant)', color: 'var(--on-surface)', padding: '12px' }}
            />
            <button 
              type="submit"
              className="label-caps"
              style={{ background: liveSaved ? 'var(--tertiary)' : 'var(--primary)', color: liveSaved ? 'var(--on-tertiary)' : 'var(--on-primary)', border: 'none', padding: '12px 24px', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              {liveSaved ? 'Saved ✓' : 'Save Link'}
            </button>
          </form>
          <p className="body-sm" style={{ color: 'var(--on-surface-variant)', marginTop: '8px' }}>
            When this URL is set, the "WATCH LIVE NOW" button on the home page will direct users to this link.
          </p>
        </div>

      </div>
    </div>
  );
}
