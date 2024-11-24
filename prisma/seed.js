const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const route = await prisma.route.create({
    data: {
      id: '25c84571-5a33-465f-b44e-b59c8f266edb',
      routeName: 'Grande Roxas',
      routeColor: 'blue',
      coordinates: {
        create: [
          {
            "pointOrder": 0,
            "latitude": 7.095973938069168,
            "longitude": 125.513573884964
          },
          {
            "pointOrder": 1,
            "latitude": 7.094440816499801,
            "longitude": 125.5135202407837
          },
          {
            "pointOrder": 2,
            "latitude": 7.09435564292956,
            "longitude": 125.5159986019135
          },
          {
            "pointOrder": 3,
            "latitude": 7.09435564292956,
            "longitude": 125.51788687706
          },
          {
            "pointOrder": 4,
            "latitude": 7.094291762741553,
            "longitude": 125.5199038982391
          },
          {
            "pointOrder": 5,
            "latitude": 7.094164002338922,
            "longitude": 125.5213952064514
          },
          {
            "pointOrder": 6,
            "latitude": 7.094110768827362,
            "longitude": 125.5219531059265
          },
          {
            "pointOrder": 7,
            "latitude": 7.094046888605361,
            "longitude": 125.5223822593689
          },
          {
            "pointOrder": 8,
            "latitude": 7.094281116042688,
            "longitude": 125.5238950252533
          },
          {
            "pointOrder": 9,
            "latitude": 7.092098537577065,
            "longitude": 125.5243134498596
          },
          {
            "pointOrder": 10,
            "latitude": 7.090852866206207,
            "longitude": 125.5245065689087
          },
          {
            "pointOrder": 11,
            "latitude": 7.090096944330083,
            "longitude": 125.5253326892853
          },
          {
            "pointOrder": 12,
            "latitude": 7.08864897783612,
            "longitude": 125.5267381668091
          },
          {
            "pointOrder": 13,
            "latitude": 7.086839013319615,
            "longitude": 125.5284440517426
          },
          {
            "pointOrder": 14,
            "latitude": 7.086104378634711,
            "longitude": 125.5295276641846
          },
          {
            "pointOrder": 15,
            "latitude": 7.08579561877996,
            "longitude": 125.5299997329712
          },
          {
            "pointOrder": 16,
            "latitude": 7.085444271107471,
            "longitude": 125.5314910411835
          },
          {
            "pointOrder": 17,
            "latitude": 7.085039688607397,
            "longitude": 125.5330789089203
          },
          {
            "pointOrder": 18,
            "latitude": 7.084486048821357,
            "longitude": 125.5349349975586
          },
          {
            "pointOrder": 19,
            "latitude": 7.083921761432182,
            "longitude": 125.5364155769348
          },
          {
            "pointOrder": 20,
            "latitude": 7.083123240361693,
            "longitude": 125.5383574962616
          },
          {
            "pointOrder": 21,
            "latitude": 7.082473775537955,
            "longitude": 125.5398273468018
          },
          {
            "pointOrder": 22,
            "latitude": 7.081685898950157,
            "longitude": 125.5416083335877
          },
          {
            "pointOrder": 23,
            "latitude": 7.080866079990716,
            "longitude": 125.5435073375702
          },
          {
            "pointOrder": 24,
            "latitude": 7.080259200082154,
            "longitude": 125.5445051193237
          },
          {
            "pointOrder": 25,
            "latitude": 7.079407437460336,
            "longitude": 125.5448269844055
          },
          {
            "pointOrder": 26,
            "latitude": 7.078204320077705,
            "longitude": 125.5452990531922
          },
          {
            "pointOrder": 27,
            "latitude": 7.077341906572253,
            "longitude": 125.5456852912903
          },
          {
            "pointOrder": 28,
            "latitude": 7.075947135640196,
            "longitude": 125.5460500717163
          },
          {
            "pointOrder": 29,
            "latitude": 7.074658832027292,
            "longitude": 125.546704530716
          },
          {
            "pointOrder": 30,
            "latitude": 7.072667810281652,
            "longitude": 125.5475091934204
          },
          {
            "pointOrder": 31,
            "latitude": 7.071304966918428,
            "longitude": 125.5481421947479
          },
          {
            "pointOrder": 32,
            "latitude": 7.070144417446723,
            "longitude": 125.5490434169769
          },
          {
            "pointOrder": 33,
            "latitude": 7.069122279717451,
            "longitude": 125.5497515201569
          },
          {
            "pointOrder": 34,
            "latitude": 7.068142728938338,
            "longitude": 125.5507814884186
          },
          {
            "pointOrder": 35,
            "latitude": 7.06748259572032,
            "longitude": 125.5516719818115
          },
          {
            "pointOrder": 36,
            "latitude": 7.067386769852243,
            "longitude": 125.5518329143524
          },
          {
            "pointOrder": 37,
            "latitude": 7.06763165814231,
            "longitude": 125.5533456802368
          },
          {
            "pointOrder": 38,
            "latitude": 7.067461301084681,
            "longitude": 125.5540215969086
          },
          {
            "pointOrder": 39,
            "latitude": 7.06677987222625,
            "longitude": 125.554450750351
          },
          {
            "pointOrder": 40,
            "latitude": 7.065598016667662,
            "longitude": 125.5546438694
          },
          {
            "pointOrder": 41,
            "latitude": 7.064810111283212,
            "longitude": 125.5549335479736
          },
          {
            "pointOrder": 42,
            "latitude": 7.063766666950662,
            "longitude": 125.5550837516785
          },
          {
            "pointOrder": 43,
            "latitude": 7.063308828387981,
            "longitude": 125.5551373958588
          },
          {
            "pointOrder": 44,
            "latitude": 7.062978758445311,
            "longitude": 125.554815530777
          },
          {
            "pointOrder": 45,
            "latitude": 7.062648688267065,
            "longitude": 125.5548584461212
          },
          {
            "pointOrder": 46,
            "latitude": 7.061860777856918,
            "longitude": 125.554450750351
          },
          {
            "pointOrder": 47,
            "latitude": 7.060529845061495,
            "longitude": 125.5546867847443
          },
          {
            "pointOrder": 48,
            "latitude": 7.061647828867007,
            "longitude": 125.5614674091339
          },
          {
            "pointOrder": 49,
            "latitude": 7.061690418672821,
            "longitude": 125.5619180202484
          },
          {
            "pointOrder": 50,
            "latitude": 7.061211283131169,
            "longitude": 125.5631625652313
          },
          {
            "pointOrder": 51,
            "latitude": 7.058634590152162,
            "longitude": 125.569052696228
          },
          {
            "pointOrder": 52,
            "latitude": 7.056515728563076,
            "longitude": 125.5738270282746
          },
          {
            "pointOrder": 53,
            "latitude": 7.05561068422427,
            "longitude": 125.5763375759125
          },
          {
            "pointOrder": 54,
            "latitude": 7.0558662263345,
            "longitude": 125.5771315097809
          },
          {
            "pointOrder": 55,
            "latitude": 7.055876873919366,
            "longitude": 125.5774426460266
          },
          {
            "pointOrder": 56,
            "latitude": 7.055621331815012,
            "longitude": 125.5778396129608
          },
          {
            "pointOrder": 57,
            "latitude": 7.053321446528487,
            "longitude": 125.5799746513367
          },
          {
            "pointOrder": 58,
            "latitude": 7.050542403234246,
            "longitude": 125.5825281143189
          },
          {
            "pointOrder": 59,
            "latitude": 7.049999369838667,
            "longitude": 125.5831718444824
          },
          {
            "pointOrder": 60,
            "latitude": 7.049743824491089,
            "longitude": 125.5842018127442
          },
          {
            "pointOrder": 61,
            "latitude": 7.04994613123621,
            "longitude": 125.5853390693665
          },
          {
            "pointOrder": 62,
            "latitude": 7.05043592614803,
            "longitude": 125.5867660045624
          },
          {
            "pointOrder": 63,
            "latitude": 7.051521991279155,
            "longitude": 125.5894804000855
          },
          {
            "pointOrder": 64,
            "latitude": 7.051777535645812,
            "longitude": 125.5903172492981
          },
          {
            "pointOrder": 65,
            "latitude": 7.052565463222138,
            "longitude": 125.5935251712799
          },
          {
            "pointOrder": 66,
            "latitude": 7.053470513513657,
            "longitude": 125.5972695350647
          },
          {
            "pointOrder": 67,
            "latitude": 7.053821885503102,
            "longitude": 125.5987501144409
          },
          {
            "pointOrder": 68,
            "latitude": 7.054450095365186,
            "longitude": 125.5992114543915
          },
          {
            "pointOrder": 69,
            "latitude": 7.056994868967197,
            "longitude": 125.6006813049317
          },
          {
            "pointOrder": 70,
            "latitude": 7.057505951518186,
            "longitude": 125.6017649173737
          },
          {
            "pointOrder": 71,
            "latitude": 7.057804082745641,
            "longitude": 125.6036639213562
          },
          {
            "pointOrder": 72,
            "latitude": 7.058006385969162,
            "longitude": 125.6055414676666
          },
          {
            "pointOrder": 73,
            "latitude": 7.058347106987813,
            "longitude": 125.6066679954529
          },
          {
            "pointOrder": 74,
            "latitude": 7.059518333575948,
            "longitude": 125.6082558631897
          },
          {
            "pointOrder": 75,
            "latitude": 7.061019628775536,
            "longitude": 125.6096720695496
          },
          {
            "pointOrder": 76,
            "latitude": 7.06292552133573,
            "longitude": 125.6111204624176
          },
          {
            "pointOrder": 77,
            "latitude": 7.064256447236753,
            "longitude": 125.6138241291046
          },
          {
            "pointOrder": 78,
            "latitude": 7.065779021768996,
            "longitude": 125.6157445907593
          },
          {
            "pointOrder": 79,
            "latitude": 7.06677987222625,
            "longitude": 125.6167852878571
          },
          {
            "pointOrder": 80,
            "latitude": 7.068355674936529,
            "longitude": 125.6153798103333
          },
          {
            "pointOrder": 81,
            "latitude": 7.072284510992245,
            "longitude": 125.6121611595154
          },
          {
            "pointOrder": 82,
            "latitude": 7.073562174053024,
            "longitude": 125.6110990047455
          },
          {
            "pointOrder": 83,
            "latitude": 7.073604762760847,
            "longitude": 125.6109488010407
          },
          {
            "pointOrder": 84,
            "latitude": 7.071720208681651,
            "longitude": 125.6104874610901
          },
          {
            "pointOrder": 85,
            "latitude": 7.069207457947929,
            "longitude": 125.6098330020905
          },
          {
            "pointOrder": 86,
            "latitude": 7.068121434333118,
            "longitude": 125.6094360351563
          },
          {
            "pointOrder": 87,
            "latitude": 7.068898686787731,
            "longitude": 125.607225894928
          },
          {
            "pointOrder": 88,
            "latitude": 7.067163176082755,
            "longitude": 125.6056916713715
          },
          {
            "pointOrder": 89,
            "latitude": 7.068930628641466,
            "longitude": 125.603449344635
          },
          {
            "pointOrder": 90,
            "latitude": 7.067823309757055,
            "longitude": 125.6022584438324
          },
          {
            "pointOrder": 91,
            "latitude": 7.065906790033143,
            "longitude": 125.6016576290131
          },
          {
            "pointOrder": 92,
            "latitude": 7.064277742020033,
            "longitude": 125.6013035774231
          },
          {
            "pointOrder": 93,
            "latitude": 7.063873140970022,
            "longitude": 125.6009709835052
          },
          {
            "pointOrder": 94,
            "latitude": 7.063340770628,
            "longitude": 125.5991792678833
          },
          {
            "pointOrder": 95,
            "latitude": 7.062744515117271,
            "longitude": 125.5966579914093
          },
          {
            "pointOrder": 96,
            "latitude": 7.061945957425429,
            "longitude": 125.5934393405914
          },
          {
            "pointOrder": 97,
            "latitude": 7.061264520438097,
            "longitude": 125.5904245376587
          },
          {
            "pointOrder": 98,
            "latitude": 7.060657614776026,
            "longitude": 125.5877959728241
          },
          {
            "pointOrder": 99,
            "latitude": 7.059688693559966,
            "longitude": 125.583992600441
          },
          {
            "pointOrder": 100,
            "latitude": 7.059481067321085,
            "longitude": 125.5820667743683
          },
          {
            "pointOrder": 101,
            "latitude": 7.058804950461577,
            "longitude": 125.5807793140412
          },
          {
            "pointOrder": 102,
            "latitude": 7.057463361327169,
            "longitude": 125.5790305137634
          },
          {
            "pointOrder": 103,
            "latitude": 7.05583428357843,
            "longitude": 125.5768632888794
          },
          {
            "pointOrder": 104,
            "latitude": 7.055674569765062,
            "longitude": 125.5764877796173
          }
        ],
      },
      routeChannel: {
        create: {
          id: 'f2a4025d-611e-43be-a445-830f9ffd284f',
          apiKey: '7ZAYDH5679M44TMK',
          channelId: '2629277',
          fieldNumber: '2',
        }
      },
      sections: {
        create: [
          {
            "sectionName": "Bangkal",
            "apiKey": null,
            "channelId": "2629303",
            "fieldNumber": "2"
          },
          {
            "sectionName": "Boulevard",
            "apiKey": null,
            "channelId": "2629303",
            "fieldNumber": "5"
          },
          {
            "sectionName": "Catalunan Grande",
            "apiKey": null,
            "channelId": "2629303",
            "fieldNumber": "1"
          },
          {
            "sectionName": "Ecoland",
            "apiKey": null,
            "channelId": "2629303",
            "fieldNumber": "4"
          },
          {
            "sectionName": "Matina",
            "apiKey": null,
            "channelId": "2629303",
            "fieldNumber": "3"
          },
          {
            "sectionName": "Ponciano-Illustre",
            "apiKey": null,
            "channelId": "2629303",
            "fieldNumber": "7"
          },
          {
            "sectionName": "Quirino",
            "apiKey": null,
            "channelId": "2629303",
            "fieldNumber": "8"
          },
          {
            "sectionName": "Roxas",
            "apiKey": null,
            "channelId": "2629303",
            "fieldNumber": "6"
          }
        ],
      }
    }
  });
  
  console.log('Route created:', route);

  const users = [
    {
      id: "017de651-a436-469d-a205-03a5f26d8292",
      name: "PAOLO LUIS RAMIREZ",
      email: "paolrramirez@addu.edu.ph",
      role: "user",
    },
    {
      id: "3d527097-9483-48a3-be4c-bb47fafe1680",
      name: "Sean Elijah Chavez",
      email: "sevchavez@addu.edu.ph",
      role: "admin",
    },
    {
      id: "4dd18380-5bfc-48fb-bb62-eeb00990438b",
      name: "MARK EMMANUEL ASILUM",
      email: "mecasilum@addu.edu.ph",
      role: "admin",
    },
    {
      id: "63e02d33-a74e-4d97-b8e1-2263a6b607d7",
      name: "Shunin Desu",
      email: "shunindesu08@gmail.com",
      role: "user",
    },
    {
      id: "6fe7a2e0-9641-4979-ace3-d6f6fd56d110",
      name: "Jazz Rae Chavez",
      email: "jazzraechavez@gmail.com",
      role: "user",
    },
    {
      id: "8e87adfa-0a26-43ef-a05d-f9e2e06f732b",
      name: "Miguel Espera",
      email: "miguelespera5@gmail.com",
      role: "driver",
    },
    {
      id: "b0c5e296-d6c3-4c61-bd34-adcdf5451f32",
      name: "Paolo Luis Ramirez",
      email: "paololuisramirez@gmail.com",
      role: "admin",
    },
    {
      id: "dda1fed9-e0a8-4cd7-8167-d86cca838240",
      name: "Mark",
      email: "markasilum13@gmail.com",
      role: "driver",
    },
    {
      id: "ed7bb3cf-9295-4930-a5e6-5dca94f4640c",
      name: "Ylai Vallejo",
      email: "seann.chvz@gmail.com",
      role: "driver",
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    });
  }
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
