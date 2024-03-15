import type { Association } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Association } from "@prisma/client";

export async function getRandomAssociation(): Promise<Association> {
  const associations: Association[] = await prisma.$queryRawUnsafe(
    // DO NOT pass in or accept user input here
    `SELECT * FROM "Association" ORDER BY RANDOM() LIMIT 1;`
  );
  return associations[0];
}

interface AddWordToAssociationType {
  id: string;
  word: string;
}

export function addWordToAssociation({ id, word }: AddWordToAssociationType) {
  return prisma.association.update({
    where: { id: id },
    data: { words: { push: word } },
  });
}
