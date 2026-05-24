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
  login: (password: string) => boolean;
  logout: () => void;
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

  useEffect(() => {
    const loadData = async () => {
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
    };
    loadData();
  }, [supabase]);

  // Settings
  const updateLiveLink = async (url: string) => {
    setLiveLink(url);
    await supabase.from('Setting').upsert({ key: 'liveLink', value: url });
  };
  const updateHighlightsLink = async (url: string) => {
    setHighlightsLink(url);
    await supabase.from('Setting').upsert({ key: 'highlightsLink', value: url });
  };

  // Teams
  const updateTeam = async (id: string, updates: Partial<Team>) => {
    setTeams(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    await supabase.from('Team').update(updates).eq('id', id);
  };

  // Players
  const addPlayer = async (playerInfo: Omit<Player, 'id'>) => {
    const newPlayer = { ...playerInfo, id: `p-${Date.now()}` };
    setPlayers(prev => [...prev, newPlayer]);
    await supabase.from('Player').insert(newPlayer);
  };
  const removePlayer = async (id: string) => {
    setPlayers(prev => prev.filter(p => p.id !== id));
    await supabase.from('Player').delete().eq('id', id);
  };
  const updatePlayer = async (id: string, updates: Partial<Player>) => {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    await supabase.from('Player').update(updates).eq('id', id);
  };

  // Standings
  const updateStanding = async (teamId: string, updates: Partial<Standing>) => {
    setStandings(prev => prev.map(s => s.teamId === teamId ? { ...s, ...updates } : s));
    await supabase.from('Standing').update(updates).eq('teamId', teamId);
  };

  // Matches
  const addMatch = async (matchInfo: Omit<Match, 'id'>) => {
    const newMatch = { ...matchInfo, id: `m-${Date.now()}` };
    setMatches(prev => [...prev, newMatch]);
    const { stats, ...matchData } = newMatch;
    await supabase.from('Match').insert({ ...matchData, ...stats });
  };
  const updateMatch = async (id: string, updates: Partial<Match>) => {
    setMatches(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    const { stats, ...matchData } = updates;
    await supabase.from('Match').update({ ...matchData, ...stats }).eq('id', id);
  };
  const removeMatch = async (id: string) => {
    setMatches(prev => prev.filter(m => m.id !== id));
    await supabase.from('Match').delete().eq('id', id);
  };

  // Photos
  const addPhoto = async (photoInfo: Omit<Photo, 'id'>) => {
    const newPhoto = { ...photoInfo, id: `photo-${Date.now()}` };
    setPhotos(prev => [...prev, newPhoto]);
    await supabase.from('Photo').insert(newPhoto);
  };
  const removePhoto = async (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
    await supabase.from('Photo').delete().eq('id', id);
  };

  // Auth
  const login = (password: string) => {
    if (password === 'admin') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };
  const logout = () => setIsAdmin(false);

  return (
    <TournamentContext.Provider value={{ 
      teams, players, standings, matches, photos,
      updateTeam, 
      addPlayer, removePlayer, updatePlayer,
      updateStanding,
      addMatch, updateMatch, removeMatch,
      addPhoto, removePhoto,
      isAdmin, login, logout,
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
