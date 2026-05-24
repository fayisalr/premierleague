import { PrismaClient } from '@prisma/client'
import { PrismaSqlite } from 'prisma-adapter-sqlite'

const adapter = new PrismaSqlite({ url: 'dev.db' })

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
