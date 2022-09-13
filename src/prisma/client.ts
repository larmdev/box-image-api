import { PrismaClient } from '../../prisma/generated/prisma-client/index.js'

export const writeClient = new PrismaClient({
    datasources: {
        db: {
            url: `${process.env.DATABASE_URL}`
        }
    }
});

export const readClient = new PrismaClient({
    datasources: {
        db: {
            url: `${process.env.DATABASE_URL}`
        }
    }
});