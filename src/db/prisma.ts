/**
 * Use a single PrismaClient instance
 * https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
 */
import { PrismaClient } from '@prisma/client'
import { isProduction } from '@/lib/utils'

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (!isProduction()) {
	globalForPrisma.prisma = prisma
}
