const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const route1Coordinates = [
  [7.072187137517925, 125.61209243969645],
  [7.073549978277775, 125.61256450848305],
  [7.073677744392796, 125.6138305111381],
  [7.074227733288257, 125.6246701886994],
  [7.073929612653335, 125.62456290033882],
  [7.071289107199196, 125.62112967279974],
  [7.070352150022119, 125.62027136591499],
  [7.069542958203471, 125.61979929712835],
  [7.068882826985882, 125.61932722834175],
  [7.06688113301226, 125.61679522303169],
  [7.07118263488843, 125.61304013041084],
  [7.072204768058619, 125.61209599283758],
];

const route2Coordinates = [
  [7.076446627339295, 125.61305348448514],
  [7.0755948576800165, 125.61155144743682],
  [7.075360620748149, 125.61054293684722],
  [7.075041206558606, 125.60979191832305],
  [7.074551437705427, 125.6092769341922],
  [7.073678370200249, 125.60901944212677],
  [7.0727201234771835, 125.60796801619293],
  [7.0683334575406445, 125.6026679711795],
  [7.064372645724255, 125.60698096327545],
  [7.06305236757743, 125.60938422255279],
  [7.0632440210907, 125.60959879927398],
  [7.065692920100864, 125.61032836012603],
  [7.069366705688552, 125.61137350585341],
  [7.072390521652789, 125.61222108390213],
  [7.074189895700473, 125.61273606803299],
  [7.0761489695297835, 125.6133690693605],
  [7.076447088731435, 125.6130793907869],
];

async function main() {
  // Create the first route with its coordinates
  const route1 = await prisma.route.create({
    data: {
      routeName: "Route 1",
      routeColor: "blue",
      coordinates: {
        create: route1Coordinates.map(([latitude, longitude], index) => ({
          pointOrder: index,
          latitude,
          longitude,
        })),
      },
    },
  });

  console.log("Route 1 created:", route1);

  // Create the second route with its coordinates
  const route2 = await prisma.route.create({
    data: {
      routeName: "Route 2",
      routeColor: "red",
      coordinates: {
        create: route2Coordinates.map(([latitude, longitude], index) => ({
          pointOrder: index,
          latitude,
          longitude,
        })),
      },
    },
  });

  console.log("Route 2 created:", route2);

  // Create admin users
  const adminUsers = [
    {
      email: "paololuisramirez@gmail.com",
      name: "Paolo Luis Ramirez",
      role: "admin",
    },
    {
      email: "mecasilum@addu.edu.ph",
      name: "Mark Asilum",
      role: "admin",
    },
    {
      email: "sevchavez@addu.edu.ph",
      name: "Sean Chavez",
      role: "admin",
    },
    {
      email: "seann.chvz@gmail.com",
      name: "Ylai (Driver)",
      role: "driver",
    },
  ];

  for (const user of adminUsers) {
    const createdUser = await prisma.user.create({
      data: user,
    });
    console.log("Admin user created:", createdUser);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
