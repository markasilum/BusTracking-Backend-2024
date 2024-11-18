const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const route = await prisma.route.create({
    data: {
      id: '5818ff54-c42f-4ac0-85db-f6e3b09aa749',
      routeName: 'Roxas Lanang',
      routeColor: 'red',
      coordinates: {
        create: [
          {
              "pointOrder": 0,
              "latitude": 7.070985549923472,
              "longitude": 125.6131868363082
          },
          {
              "pointOrder": 1,
              "latitude": 7.072199333329165,
              "longitude": 125.6121246815383
          },
          {
              "pointOrder": 2,
              "latitude": 7.074179709931779,
              "longitude": 125.6126847267478
          },
          {
              "pointOrder": 3,
              "latitude": 7.076633874526638,
              "longitude": 125.6133284569114
          },
          {
              "pointOrder": 4,
              "latitude": 7.076793581097959,
              "longitude": 125.616675853762
          },
          {
              "pointOrder": 5,
              "latitude": 7.076958611163606,
              "longitude": 125.6175169946073
          },
          {
              "pointOrder": 6,
              "latitude": 7.07729931820924,
              "longitude": 125.6174740792631
          },
          {
              "pointOrder": 7,
              "latitude": 7.080770256900344,
              "longitude": 125.6214437486051
          },
          {
              "pointOrder": 8,
              "latitude": 7.083155181231071,
              "longitude": 125.624490738046
          },
          {
              "pointOrder": 9,
              "latitude": 7.08952201700225,
              "longitude": 125.631872177255
          },
          {
              "pointOrder": 10,
              "latitude": 7.093610373517845,
              "longitude": 125.6354985238431
          },
          {
              "pointOrder": 11,
              "latitude": 7.097059896091082,
              "longitude": 125.6384167672513
          },
          {
              "pointOrder": 12,
              "latitude": 7.103958863654413,
              "longitude": 125.6438455582975
          },
          {
              "pointOrder": 13,
              "latitude": 7.103043265890517,
              "longitude": 125.6387600900052
          },
          {
              "pointOrder": 14,
              "latitude": 7.101254651045766,
              "longitude": 125.6326446534513
          },
          {
              "pointOrder": 15,
              "latitude": 7.099466029245051,
              "longitude": 125.626464843881
          },
          {
              "pointOrder": 16,
              "latitude": 7.097719986969823,
              "longitude": 125.6206283570646
          },
          {
              "pointOrder": 17,
              "latitude": 7.09699601627838,
              "longitude": 125.6180534364103
          },
          {
              "pointOrder": 18,
              "latitude": 7.095718418162211,
              "longitude": 125.6161222459196
          },
          {
              "pointOrder": 19,
              "latitude": 7.093503906360556,
              "longitude": 125.6125817300199
          },
          {
              "pointOrder": 20,
              "latitude": 7.09197077656588,
              "longitude": 125.6104574204801
          },
          {
              "pointOrder": 21,
              "latitude": 7.090948687200504,
              "longitude": 125.610071182382
          },
          {
              "pointOrder": 22,
              "latitude": 7.089756246740937,
              "longitude": 125.6099638940214
          },
          {
              "pointOrder": 23,
              "latitude": 7.087137125611357,
              "longitude": 125.6103501321195
          },
          {
              "pointOrder": 24,
              "latitude": 7.084837397224203,
              "longitude": 125.6116805077909
          },
          {
              "pointOrder": 25,
              "latitude": 7.083581059277923,
              "longitude": 125.6123886109708
          },
          {
              "pointOrder": 26,
              "latitude": 7.076703080714331,
              "longitude": 125.6133756638883
          }
      ],
      },
      routeChannel: {
        create: {
          id: "06f23486-324b-41eb-b903-dd706c892806",
          apiKey: "7ZAYDH5679M44TMK",
          channelId: "2629277",
          fieldNumber: "1",
        }
      },
      sections: {
        create: [
          {
              "sectionName": "Bajada",
              "apiKey": "",
              "channelId": "2629303",
              "fieldNumber": "4"
          },
          {
              "sectionName": "Lanang",
              "apiKey": "",
              "channelId": "2629303",
              "fieldNumber": "3"
          },
          {
              "sectionName": "R. Castillo",
              "apiKey": "",
              "channelId": "2629303",
              "fieldNumber": "2"
          },
          {
              "sectionName": "Roxas",
              "apiKey": "",
              "channelId": "2629303",
              "fieldNumber": "6"
          },
          {
              "sectionName": "Sta Ana",
              "apiKey": "",
              "channelId": "2629303",
              "fieldNumber": "1"
          }
      ],
      }
    }
  });
  
  console.log('Route created:', route);
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
