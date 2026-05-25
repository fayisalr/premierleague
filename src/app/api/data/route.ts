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
      nextFixtureTime
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
