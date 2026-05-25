"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export interface Player {
  id: string;
  name: string;
  imageUrl: string;
  position: string;
  teamId: string;
  number: string;
}

export interface Photo {
  id: string;
  url: string;
  caption: string | null;
}

export interface Team {
  id: string;
  name: string;
  rank: string;
  winRate: string;
  img: string;
  color: string;
}

export interface Standing {
  teamId: string;
  p: number;
  w: number;
  l: number;
  gd: number;
  pts: number;
}

export interface MatchStats {
  possessionHome: number;
  possessionAway: number;
  shotsHome: number;
  shotsAway: number;
  foulsHome: number;
  foulsAway: number;
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number | null;
  awayScore: number | null;
  status: 'LIVE' | 'UPCOMING' | 'FT';
  date: string;
  time: string;
  venue: string;
  stats?: MatchStats;
}

interface TournamentContextType {
  teams: Team[];
  players: Player[];
  standings: Standing[];
  matches: Match[];
  photos: Photo[];
  
  updateTeam: (id: string, updates: Partial<Team>) => void;
  addPlayer: (player: Omit<Player, 'id'>) => void;
  removePlayer: (id: string) => void;
  updatePlayer: (id: string, player: Partial<Player>) => void;
  updateStanding: (teamId: string, updates: Partial<Standing>) => void;
  addMatch: (match: Omit<Match, 'id'>) => void;
  updateMatch: (id: string, updates: Partial<Match>) => void;
  removeMatch: (id: string) => void;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  liveLink: string;
  updateLiveLink: (url: string) => void;
  highlightsLink: string;
  updateHighlightsLink: (url: string) => void;
  addPhoto: (photo: Omit<Photo, 'id'>) => void;
  removePhoto: (id: string) => void;
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

export function TournamentProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [standings, setStandings] = useState<Standing[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [liveLink, setLiveLink] = useState('');
  const [highlightsLink, setHighlightsLink] = useState('');

  const supabase = createClient();

  const mutateLocal = async (action: string, payload: any) => {
    try {
      const res = await fetch('/api/mutate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, payload })
      });
      return await res.json();
    } catch (e) {
      console.error(`Mutation ${action} failed:`, e);
      return { error: e };
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (supabase) {
        try {
          const [{ data: dbTeams }, { data: dbPlayers }, { data: dbStandings }, { data: dbRawMatches }, { data: dbPhotos }, { data: dbSettings }] = await Promise.all([
            supabase.from('Team').select('*'),
            supabase.from('Player').select('*'),
            supabase.from('Standing').select('*'),
            supabase.from('Match').select('*'),
            supabase.from('Photo').select('*'),
            supabase.from('Setting').select('*')
          ]);

          if (dbTeams) setTeams(dbTeams as Team[]);
          if (dbPlayers) setPlayers(dbPlayers as Player[]);
          if (dbStandings) setStandings(dbStandings as Standing[]);
          if (dbRawMatches) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const parsedMatches = dbRawMatches.map((m: any) => {
              const { possessionHome, possessionAway, shotsHome, shotsAway, foulsHome, foulsAway, ...rest } = m;
              const stats = possessionHome !== null ? { possessionHome, possessionAway, shotsHome, shotsAway, foulsHome, foulsAway } : undefined;
              return { ...rest, stats } as Match;
            });
            setMatches(parsedMatches);
          }
          if (dbPhotos) setPhotos(dbPhotos as Photo[]);
          if (dbSettings) {
            const live = dbSettings.find(s => s.key === 'liveLink')?.value || '';
            const high = dbSettings.find(s => s.key === 'highlightsLink')?.value || '';
            setLiveLink(live);
            setHighlightsLink(high);
          }
        } catch (error) {
          console.error("Supabase load failed:", error);
        }
      } else {
        try {
          const res = await fetch('/api/data');
          const data = await res.json();
          if (data.error) {
            console.error(data.error);
            return;
          }
          if (data.teams) setTeams(data.teams);
          if (data.players) setPlayers(data.players);
          if (data.standings) setStandings(data.standings);
          if (data.matches) setMatches(data.matches);
          if (data.photos) setPhotos(data.photos);
          if (data.liveLink) setLiveLink(data.liveLink);
          if (data.highlightsLink) setHighlightsLink(data.highlightsLink);
        } catch (error) {
          console.error("Local SQLite load failed:", error);
        }
      }
    };
    loadData();
  }, [supabase]);

  useEffect(() => {
    if (!supabase) {
      const localAdminSession = typeof window !== 'undefined' && localStorage.getItem('local_admin_session') === 'true';
      setIsAdmin(!!localAdminSession);
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session);
    });
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Settings
  const updateLiveLink = async (url: string) => {
    setLiveLink(url);
    if (supabase) {
      await supabase.from('Setting').upsert({ key: 'liveLink', value: url });
    } else {
      await mutateLocal('updateSetting', { key: 'liveLink', value: url });
    }
  };
  const updateHighlightsLink = async (url: string) => {
    setHighlightsLink(url);
    if (supabase) {
      await supabase.from('Setting').upsert({ key: 'highlightsLink', value: url });
    } else {
      await mutateLocal('updateSetting', { key: 'highlightsLink', value: url });
    }
  };

  // Teams
  const updateTeam = async (id: string, updates: Partial<Team>) => {
    setTeams(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    if (supabase) {
      await supabase.from('Team').update(updates).eq('id', id);
    } else {
      await mutateLocal('updateTeam', { id, updates });
    }
  };

  // Players
  const addPlayer = async (playerInfo: Omit<Player, 'id'>) => {
    const newPlayer = { ...playerInfo, id: `p-${Date.now()}` };
    setPlayers(prev => [...prev, newPlayer]);
    if (supabase) {
      await supabase.from('Player').insert(newPlayer);
    } else {
      await mutateLocal('addPlayer', newPlayer);
    }
  };
  const removePlayer = async (id: string) => {
    setPlayers(prev => prev.filter(p => p.id !== id));
    if (supabase) {
      await supabase.from('Player').delete().eq('id', id);
    } else {
      await mutateLocal('removePlayer', { id });
    }
  };
  const updatePlayer = async (id: string, updates: Partial<Player>) => {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    if (supabase) {
      await supabase.from('Player').update(updates).eq('id', id);
    } else {
      await mutateLocal('updatePlayer', { id, updates });
    }
  };

  // Standings
  const updateStanding = async (teamId: string, updates: Partial<Standing>) => {
    setStandings(prev => prev.map(s => s.teamId === teamId ? { ...s, ...updates } : s));
    if (supabase) {
      await supabase.from('Standing').update(updates).eq('teamId', teamId);
    } else {
      await mutateLocal('updateStanding', { teamId, updates });
    }
  };

  // Matches
  const addMatch = async (matchInfo: Omit<Match, 'id'>) => {
    const newMatch = { ...matchInfo, id: `m-${Date.now()}` };
    setMatches(prev => [...prev, newMatch]);
    if (supabase) {
      const { stats, ...matchData } = newMatch;
      await supabase.from('Match').insert({ ...matchData, ...stats });
    } else {
      await mutateLocal('addMatch', newMatch);
    }
  };
  const updateMatch = async (id: string, updates: Partial<Match>) => {
    setMatches(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    if (supabase) {
      const { stats, ...matchData } = updates;
      await supabase.from('Match').update({ ...matchData, ...stats }).eq('id', id);
    } else {
      await mutateLocal('updateMatch', { id, updates });
    }
  };
  const removeMatch = async (id: string) => {
    setMatches(prev => prev.filter(m => m.id !== id));
    if (supabase) {
      await supabase.from('Match').delete().eq('id', id);
    } else {
      await mutateLocal('removeMatch', { id });
    }
  };

  // Photos
  const addPhoto = async (photoInfo: Omit<Photo, 'id'>) => {
    const newPhoto = { ...photoInfo, id: `photo-${Date.now()}` };
    setPhotos(prev => [...prev, newPhoto]);
    if (supabase) {
      await supabase.from('Photo').insert(newPhoto);
    } else {
      await mutateLocal('addPhoto', newPhoto);
    }
  };
  const removePhoto = async (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
    if (supabase) {
      await supabase.from('Photo').delete().eq('id', id);
    } else {
      await mutateLocal('removePhoto', { id });
    }
  };

  // Auth
  const login = async (email: string, password: string) => {
    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } else {
      setIsAdmin(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('local_admin_session', 'true');
      }
      return { success: true };
    }
  };

  const signup = async (email: string, password: string) => {
    if (supabase) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } else {
      setIsAdmin(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('local_admin_session', 'true');
      }
      return { success: true };
    }
  };

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    } else {
      setIsAdmin(false);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('local_admin_session');
      }
    }
  };

  return (
    <TournamentContext.Provider value={{ 
      teams, players, standings, matches, photos,
      updateTeam, 
      addPlayer, removePlayer, updatePlayer,
      updateStanding,
      addMatch, updateMatch, removeMatch,
      addPhoto, removePhoto,
      isAdmin, login, signup, logout,
      liveLink, updateLiveLink,
      highlightsLink, updateHighlightsLink
    }}>
      {children}
    </TournamentContext.Provider>
  );
}

export function useTournament() {
  const context = useContext(TournamentContext);
  if (context === undefined) {
    throw new Error('useTournament must be used within a TournamentProvider');
  }
  return context;
}
