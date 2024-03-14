import type { Association } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Association } from "@prisma/client";

export async function getRandomAssociation() {
  return await prisma.association.findRandom({
    select: {
      id: true,
      words: true,
    },
  });
}

export function addWordToAssociation({ word, associationId }) {
  return prisma.association.update({
    where: { id: associationId },
    data: { words: { push: word } },
  });
}
