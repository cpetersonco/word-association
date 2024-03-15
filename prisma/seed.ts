import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  for (let i = 0; i < 100; i++) {
    await prisma.association.create({
      data: {
        words: [
          faker.word.noun({
            length: { min: 3, max: 10 },
            strategy: "any-length",
          }),
        ],
      },
    });
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
