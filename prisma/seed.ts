import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  await prisma.association.create({
    data: {
      words: ["elephant"],
    },
  });

  await prisma.association.create({
    data: {
      words: ["graphite"],
    },
  });
  await prisma.association.create({
    data: {
      words: ["desk"],
    },
  });

  await prisma.association.create({
    data: {
      words: ["cookie"],
    },
  });

  await prisma.association.create({
    data: {
      words: ["phone"],
    },
  });

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
