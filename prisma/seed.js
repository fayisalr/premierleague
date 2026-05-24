const { PrismaClient } = require('@prisma/client')
const { PrismaSqlite } = require('prisma-adapter-sqlite')

const adapter = new PrismaSqlite({ url: 'dev.db' })
const prisma = new PrismaClient({ adapter })

const defaultTeams = [
  {
    id: "team-1",
    name: "Iron Vanguard",
    rank: "01",
    winRate: "88%",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCGMnAjSO4ppz8vQc04oEPyhqCD0ZdmiW874xL5giLpvirQzNaDqhUj4tD_GLjxQJtYVM002aXHz8Hdh6_ZiIkcby4XQJuqLRkOuWAC5tB20-2cuKiXJD6w4XEC37cjr14kuND5uRwmEzpmr6d3zuVaoO_CQ1rbhbJsimGI8FXeskB6-6nYKNXXgPTPWoKmzXi4x36jFlkra0xhAXlKkp11Fu6yPzySmS-QlUvV1bOWz8Z3CBBdUK82bKwNVActFW1VUpIo2vzxro",
    color: "var(--primary)"
  },
  {
    id: "team-2",
    name: "Neon Strikers",
    rank: "03",
    winRate: "74%",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDz7hl4ORoEQx7NKc14F9bzc5QKuBIFdjoTXKpv6igsClhD3UwNXNK1X1VGWgNykxVUF_Bg5eV5Sc4yviUt_dUKhihG5bFpLXrAJP_KQ505i8phHUbPE_3SwY2ff2j5uI_MoUbR4bkIehU83cD3AzKwepX0ggx3ld6StH9D73f3CwSHCJqTtrDzCUKlJYtJBdH9a3ImAyf1M0dD1B_AFEuW4v5ZJY1TG-EOp_7Wf0_brRskHQTjg5jupnsDbVd8pEzrfcpRiXkchFI",
    color: "var(--tertiary)"
  },
  {
    id: "team-3",
    name: "Apex Falcons",
    rank: "02",
    winRate: "81%",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVx4HQaakmWwsLw99aim8eSCqFJFVqV36AsUun2wHuc1SgFIgltjG7cQvYoPCiCfvwu31P13t-ZCGDluv32s5WBTCRQcUpgCV4Mmxv-SgPKaHzyr5kuKYE--iBjKAKCr7FL_yK2MEQcy7kZGZACGW6sGH4BCNYcWVcHb2abj3fJvJZ9U6T7Uu6Alb866l-zGXV5jggoHnFMzhnd3pe5fnPhctib_ofRlpGps6H_4RUlGuVMlOtPs92ToIrTJuAao8Jz3QrAdIHNHM",
    color: "var(--primary)"
  },
  {
    id: "team-4",
    name: "Titan FC",
    rank: "05",
    winRate: "62%",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqtT9IkoLLKZBCLBpbgzc2B6Dm6gQI2WvseLY__CnZXw8RKYEoZ26m_nvtHB8zm2-Kq5Eyw82xt39ZaKCy54lbkpBGytvDArbtNis_eTUS1LPE93Fq1LsOZgJKWbDDUBkgLkHhShnJN4dBwOeHFLnPCQWrzVVhTBe7aLoJFlVrC0Fe65rVh3W1nsRLHheW8iouuqtCPiZEsedlQ__v0a59iaX-ArzGSAFWdTayxfzfDsTOBsyxFbwOvY56gu6_qVndcY0-UOTkIAM",
    color: "var(--tertiary)"
  },
  {
    id: "team-5",
    name: "Zenith United",
    rank: "04",
    winRate: "69%",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDm7zI7V7RaLfB382fLA5GsmO7FTHoRApwS8Reg_CEnNLG9KmsvXkOx3MwlVtZhPHPYftRvNRc7DfB7UEhmq977pfI0f_O1wfmLx9MP7lSF7veG5SNMnmICRgwUjoSfz0PxNrw_68oEUk7uIxspU1Eh-ja2M_ckmnx5oy3ePUp5IYFh82XuAOpOVLhJhkNluImiFc0ubI4YtU5_CcJBgGCGrQgcGIma9utKYTo01x_N4QmokxrW97ANO0JigBwGYkZ3ERoNde2O6sM",
    color: "var(--primary)"
  }
];

const defaultPlayers = [
  { id: "p1", name: "Marcus Vandelay", imageUrl: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=200&auto=format&fit=crop", position: "Striker", teamId: "team-4", number: "9" },
  { id: "p2", name: "Jaxon Reed", imageUrl: "https://images.unsplash.com/photo-1512719994953-eabf50895df7?q=80&w=200&auto=format&fit=crop", position: "Midfielder", teamId: "team-1", number: "10" }
];

const defaultStandings = [
  { teamId: 'team-1', p: 12, w: 10, l: 2, gd: 18, pts: 30 },
  { teamId: 'team-3', p: 12, w: 8, l: 4, gd: 12, pts: 24 },
  { teamId: 'team-2', p: 11, w: 6, l: 5, gd: 4, pts: 18 },
  { teamId: 'team-5', p: 12, w: 4, l: 8, gd: -6, pts: 12 },
  { teamId: 'team-4', p: 11, w: 1, l: 10, gd: -28, pts: 3 },
];

const defaultMatches = [
  {
    id: "m1",
    homeTeamId: "team-4", 
    awayTeamId: "team-1", 
    homeScore: 3,
    awayScore: 1,
    status: 'LIVE',
    date: 'OCT 15',
    time: "74'",
    venue: "WEMBLEY ELITE ARENA",
    possessionHome: 54,
    possessionAway: 46,
    shotsHome: 8,
    shotsAway: 5,
    foulsHome: 3,
    foulsAway: 7
  },
  {
    id: "m2",
    homeTeamId: "team-3", 
    awayTeamId: "team-2", 
    status: 'UPCOMING',
    date: 'OCT 15',
    time: "20:45",
    venue: "METRO DOME"
  },
  {
    id: "m3",
    homeTeamId: "team-5", 
    awayTeamId: "team-2", 
    homeScore: 2,
    awayScore: 0,
    status: 'FT',
    date: 'OCT 14',
    time: "FT",
    venue: "STADIUM A"
  },
  {
    id: "m4",
    homeTeamId: "team-1", 
    awayTeamId: "team-4", 
    homeScore: 1,
    awayScore: 1,
    status: 'FT',
    date: 'OCT 14',
    time: "FT",
    venue: "STADIUM B"
  }
];

const defaultPhotos = [
  { id: 'photo-1', url: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=800&auto=format&fit=crop', caption: 'Championship celebration' },
  { id: 'photo-2', url: 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?q=80&w=800&auto=format&fit=crop', caption: 'Midfield battle' },
  { id: 'photo-3', url: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=800&auto=format&fit=crop', caption: 'Goalkeeper saves' },
  { id: 'photo-4', url: 'https://images.unsplash.com/photo-1518091043644-c1d44570d247?q=80&w=800&auto=format&fit=crop', caption: 'Corner kick' },
];

async function main() {
  console.log('Clearing database...')
  await prisma.photo.deleteMany()
  await prisma.match.deleteMany()
  await prisma.standing.deleteMany()
  await prisma.player.deleteMany()
  await prisma.team.deleteMany()
  await prisma.setting.deleteMany()

  console.log('Seeding Teams...')
  for (const team of defaultTeams) {
    await prisma.team.create({ data: team })
  }

  console.log('Seeding Players...')
  for (const player of defaultPlayers) {
    await prisma.player.create({ data: player })
  }

  console.log('Seeding Standings...')
  for (const std of defaultStandings) {
    await prisma.standing.create({ data: std })
  }

  console.log('Seeding Matches...')
  for (const match of defaultMatches) {
    await prisma.match.create({ data: match })
  }

  console.log('Seeding Photos...')
  for (const photo of defaultPhotos) {
    await prisma.photo.create({ data: photo })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
