import { Worker, isMainThread } from "node:worker_threads";
import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";

if (isMainThread) {
  // Run 10x workers. The crash is noticeable with lower amounts too.
  for (const _ of Array(10).fill()) {
    new Worker(resolve("./index.mjs"));
  }
} else {
  const prisma = new PrismaClient();
  await prisma.$connect();
  await Promise.all([
    prisma.user.count({ where: { id: 1 } }),
    Promise.reject(new Error("Oh no!")),
    prisma.user.count({ where: { id: 1 } }),
  ]);
  // Catching the error does not matter
  // .catch(() => {});

  // Disconnection does not matter
  // await prisma.$disconnect();
}
