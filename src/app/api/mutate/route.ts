import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { action, payload } = await req.json();

    switch (action) {
      case 'updateTeam':
        await prisma.team.update({ where: { id: payload.id }, data: payload.updates });
        break;
      case 'addPlayer':
        await prisma.player.create({ data: payload });
        break;
      case 'removePlayer':
        await prisma.player.delete({ where: { id: payload.id } });
        break;
      case 'updatePlayer':
        await prisma.player.update({ where: { id: payload.id }, data: payload.updates });
        break;
      case 'updateStanding':
        await prisma.standing.update({ where: { teamId: payload.teamId }, data: payload.updates });
        break;
      case 'addMatch':
        const { stats, ...matchData } = payload;
        await prisma.match.create({
          data: {
            ...matchData,
            ...stats
          }
        });
        break;
      case 'updateMatch':
        const { stats: updatedStats, ...updatedMatchData } = payload.updates;
        await prisma.match.update({
          where: { id: payload.id },
          data: {
            ...updatedMatchData,
            ...updatedStats
          }
        });
        break;
      case 'removeMatch':
        await prisma.match.delete({ where: { id: payload.id } });
        break;
      case 'addPhoto':
        await prisma.photo.create({ data: payload });
        break;
      case 'removePhoto':
        await prisma.photo.delete({ where: { id: payload.id } });
        break;
      case 'updateSetting':
        await prisma.setting.upsert({
          where: { key: payload.key },
          update: { value: payload.value },
          create: { key: payload.key, value: payload.value }
        });
        break;
      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to mutate data' }, { status: 500 });
  }
}
