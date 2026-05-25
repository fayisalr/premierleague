import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const teams = await prisma.team.findMany();
    const players = await prisma.player.findMany();
    const standings = await prisma.standing.findMany();
    const rawMatches = await prisma.match.findMany();
    const photos = await prisma.photo.findMany();
    const settings = await prisma.setting.findMany();

    const matches = rawMatches.map((m: any) => {
      const { possessionHome, possessionAway, shotsHome, shotsAway, foulsHome, foulsAway, ...rest } = m;
      const stats = (possessionHome !== null) ? {
        possessionHome, possessionAway, shotsHome, shotsAway, foulsHome, foulsAway
      } : undefined;
      return { ...rest, stats };
    });

    const liveLink = settings.find((s: any) => s.key === 'liveLink')?.value || '';
    const highlightsLink = settings.find((s: any) => s.key === 'highlightsLink')?.value || '';
    const nextFixtureHomeTeamId = settings.find((s: any) => s.key === 'nextFixtureHomeTeamId')?.value || 'team-3';
    const nextFixtureAwayTeamId = settings.find((s: any) => s.key === 'nextFixtureAwayTeamId')?.value || 'team-2';
    const nextFixtureTime = settings.find((s: any) => s.key === 'nextFixtureTime')?.value || '20:00 GMT';
    const highlightsImage = settings.find((s: any) => s.key === 'highlightsImage')?.value || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMZ-K6cadPRa3uq-9tTAOYG_Uqr6xxdPOGda23evycGTXThFB0qO4HOLt2dFnpbAzer1Om-Un1XmLNGskJTxXcowaM2MDZHamjRvhwMwPcvRFQYClIpiDLfBJGy19xPA4YXw0HqdbDPKkidOS0T2lcNZ2vUKjBjTew5Ymi6vJ1IG0d7Fv8NCGqedUsvve296pwNvQSwKFroGucm2T-YrsHBK0BiJ6yD-4Ffml6uOUkF5gJBXwm9pzsU7nWWogizL6IaAMtxhLA_Sg';
    const highlightsTitle = settings.find((s: any) => s.key === 'highlightsTitle')?.value || 'RAPTORS CRUSH DEFENSE IN 5-0 SWEEP';
    const highlightsTime = settings.find((s: any) => s.key === 'highlightsTime')?.value || '2 HOURS AGO';

    return NextResponse.json({
      teams,
      players,
      standings,
      matches,
      photos,
      liveLink,
      highlightsLink,
      nextFixtureHomeTeamId,
      nextFixtureAwayTeamId,
      nextFixtureTime,
      highlightsImage,
      highlightsTitle,
      highlightsTime
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
