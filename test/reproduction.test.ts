import { PrismaClient } from "@prisma/client";
import { it } from "vitest";

export const prisma = new PrismaClient();

it("likely crashes", async () => {
  // This error seems to only occur if a connection has been established before the promise rejection below.
  // Removing this line will still reproduce the issue, but it might be more intermittent (maybe, I didn't test this thoroughly)
  await prisma.$connect();

  await Promise.all([
    // The exact query used doesn't seem to matter. I chose count because it seems more trivial.
    prisma.user.count({ where: { id: 1 } }),

    // The issue seems related to a rejected promise happening while a query is running.
    Promise.reject(new Error("Oh no!")),

    // This line seems to make it more likely to crash, but it still does crash without it.
    prisma.user.count({ where: { id: 1 } }),
  ]);
});
