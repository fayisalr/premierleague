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

    const matches = rawMatches.map(m => {
      const { possessionHome, possessionAway, shotsHome, shotsAway, foulsHome, foulsAway, ...rest } = m;
      const stats = (possessionHome !== null) ? {
        possessionHome, possessionAway, shotsHome, shotsAway, foulsHome, foulsAway
      } : undefined;
      return { ...rest, stats };
    });

    const liveLink = settings.find(s => s.key === 'liveLink')?.value || '';
    const highlightsLink = settings.find(s => s.key === 'highlightsLink')?.value || '';

    return NextResponse.json({
      teams,
      players,
      standings,
      matches,
      photos,
      liveLink,
      highlightsLink
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
