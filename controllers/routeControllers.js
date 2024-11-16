const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getRouteIndex = async (req, res) => {
  try {
    const routes = await prisma.route.findMany({
      orderBy: {
        routeName: "asc",
      },
      include: {
        buses: true,
      },
    });
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching buses" },error);
  }
};

const getRouteSections = async (req, res) => {
  const { id } = req.params;

  try {
    const routes = await prisma.routeSection.findMany({
      where: {
        routeId: id,
      },
      orderBy: {
        sectionName: "asc",
      },
    });

    const url = `https://api.thingspeak.com/channels/${routes[0].channelId}/feeds.json`;

    const response = await fetch(url);
    if (!response.ok) {
      // If error occurs, return the route data with 'unavailable' for passCount
      const allSectionData = routes.map((route) => ({
        ...route,
        passCount: 'unavailable', // Set passCount to 'unavailable' on error
      }));

      return res.status(200).json(allSectionData);
    }

    const data = await response.json();

    const feeds = data.feeds;

    // Create an object to store the most recent non-null data for each field
    const latestFieldData = {
      field1: null,
      field2: null,
      field3: null,
      field4: null,
      field5: null,
      field6: null,
      field7: null,
      field8: null,
    };

    // // Iterate through feeds to populate the latest non-null data for each field
    feeds.forEach((feed) => {
      if (feed.field1 !== null) latestFieldData.field1 = feed.field1;
      if (feed.field2 !== null) latestFieldData.field2 = feed.field2;
      if (feed.field3 !== null) latestFieldData.field3 = feed.field3;
      if (feed.field4 !== null) latestFieldData.field4 = feed.field4;
      if (feed.field5 !== null) latestFieldData.field5 = feed.field5;
      if (feed.field6 !== null) latestFieldData.field6 = feed.field6;
      if (feed.field7 !== null) latestFieldData.field7 = feed.field7;
      if (feed.field8 !== null) latestFieldData.field8 = feed.field8;
    });

    const allSectionData = routes.map((route) => {
      const fieldNumber = `field${route.fieldNumber}`;
      const passCount = latestFieldData[fieldNumber];
      return { ...route, passCount }; // Add the last non-null passenger count
    });

    res.status(200).json(allSectionData);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching buses" });
  }
};

//index of coordinates
const getRoutesCoordinates = async (req, res) => {
  try {
    const routes = await prisma.route.findMany({
      include: {
        coordinates: {
          orderBy: {
            pointOrder: "asc",
          },
          select: {
            pointOrder: true,
            latitude: true,
            longitude: true,
          },
        },
      },
    });
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching buses" });
  }
};

//index of coordinates
const getRoute = async (req, res) => {
  const { id } = req.params;
  try {
    const routes = await prisma.route.findUnique({
      where: {
        id: id,
      },
      include: {
        coordinates: {
          orderBy: {
            pointOrder: "asc",
          },
          select: {
            pointOrder: true,
            latitude: true,
            longitude: true,
          },
        },
        sections: {
          orderBy: {
            sectionName: "asc", // Sort sections by sectionName alphabetically
          },
          select:{
            sectionName: true,
            apiKey: true,
            channelId: true,
            fieldNumber: true
          }
        },
        routeChannel: true
      },
    });
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching buses" });
  }
};

const getSection = async (req, res) => {
  const { id } = req.params;
  try {
    const routes = await prisma.routeSection.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching buses" });
  }
};

const createRoute = async (req, res) => {
  const { routeName, routeColor, coordinates,channelId,fieldNumber,apiKey, sections } = req.body;

  try {
    // Create a new route
    const newRoute = await prisma.route.create({
      data: {
        routeName,
        routeColor,
        coordinates: {
          create: coordinates, // `coordinates` should be an array of objects
        },
        routeChannel:{
          create:{
            apiKey,
            channelId,
            fieldNumber
          }
        },
        sections: {
          create: sections
        }
      },
    });

    res.status(201).json(newRoute);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the route" }, error);
  }
};

const updateRoute = async (req, res) => {
  const { id, routeName, routeColor, coordinates,channelId,fieldNumber,apiKey, sections } = req.body;

  console.log(req.body)
  try {
    // Create a new route
    const updateRoute = await prisma.route.update({
      where: {
        id: id,
      },
      data: {
        routeName,
        routeColor,
        routeChannel:{
          upsert:{
            create:{
              apiKey: apiKey,
              channelId: channelId,
              fieldNumber: fieldNumber
            },
            update:{
              apiKey: apiKey,
              channelId: channelId,
              fieldNumber: fieldNumber
            }
          }
        },
        coordinates: {
          deleteMany: {},
          create: coordinates,
        },
        sections:{
          deleteMany:{},
          create: sections
        }
      },
    });
    // ...(busPassengerChannel && {
    //   busChannel: {
    //     upsert: {
    //       create: {
    //         channelId: busPassengerChannel,
    //         fieldNumber,
    //       },
    //       update: {
    //         channelId: busPassengerChannel,
    //         fieldNumber,
    //       },
    //     },
    //   },
    // }),

    res.status(201).json(updateRoute);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the route" });
  }
};

module.exports = {
  getRouteIndex,
  getRoutesCoordinates,
  getRoute,
  createRoute,
  updateRoute,
  getRouteSections,
  getSection,
};
