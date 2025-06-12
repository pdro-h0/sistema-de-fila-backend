import { PrismaClient } from "@prisma/client";
import { env } from "../env";


declare global {
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({
      log: env.NODE_ENV === "development" ? ["query"] : [],
    });
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;