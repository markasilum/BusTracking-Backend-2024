const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Seed some routes
  const route1 = await prisma.route.create({
    data: {
      routeName: 'Route A',
      buses: {
        create: [
          {
            busNumber: 'Bus 101',
            capacity: '50',
            status: 'Active',
          },
          {
            busNumber: 'Bus 102',
            capacity: '45',
            status: 'Inactive',
          },
        ],
      },
    },
  });

  const route2 = await prisma.route.create({
    data: {
      routeName: 'Route B',
      buses: {
        create: [
          {
            busNumber: 'Bus 201',
            capacity: '60',
            status: 'Active',
          },
        ],
      },
    },
  });

  console.log({ route1, route2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
