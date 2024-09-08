const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create Route with associated coordinates
  const route = await prisma.route.create({
    data: {
      routeName: "Route 2",
      routeColor: "lightgreen",
      coordinates: {
        create: [
          { latitude: 7.076660492292351, longitude: 125.61314821243288 },
    { latitude: 7.076170725157257, longitude: 125.61228990554811 },
    { latitude: 7.075638368986195, longitude: 125.6116032600403 },
    { latitude: 7.0754467206143055, longitude: 125.61108827590944 },
    { latitude: 7.07536154353459, longitude: 125.61044454574586 },
    { latitude: 7.07516989504778, longitude: 125.61005830764772 },
    { latitude: 7.074765303536546, longitude: 125.60941457748415 },
    { latitude: 7.074254240068172, longitude: 125.60917854309083 },
    { latitude: 7.073700587339056, longitude: 125.60898542404176 },
    { latitude: 7.073359877637289, longitude: 125.60883522033693 },
    { latitude: 7.068334380341131, longitude: 125.60267686843873 },
    { latitude: 7.066715988219274, longitude: 125.60439348220827 },
    { latitude: 7.064416158087434, longitude: 125.60688257217409 },
    { latitude: 7.063457892155841, longitude: 125.60864210128786 },
    { latitude: 7.062989405866505, longitude: 125.60932874679567 },
    { latitude: 7.062904226490175, longitude: 125.6095862388611 },
    { latitude: 7.063031995548773, longitude: 125.6096935272217 },
    { latitude: 7.063287533560083, longitude: 125.60960769653322 },
    { latitude: 7.069654643400308, longitude: 125.61143159866334 },
    { latitude: 7.073615409937176, longitude: 125.61256885528566 },
    { latitude: 7.076404961678019, longitude: 125.61344861984254 },
    { latitude: 7.076703080714331, longitude: 125.61321258544923 }
        ]
      }
    },
  });

  console.log('Route and coordinates seeded:', route);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });