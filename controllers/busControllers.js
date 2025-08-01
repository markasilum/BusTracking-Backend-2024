const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all buses with passenger count
const getBusIndex = async (req, res) => {
  try {
    const buses = await prisma.bus.findMany({
      include: {
        route: true,
        driver: true,
        _count: {
          select: { passengers: true }, // Count the number of passengers
        },
      },
    });
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching buses" });
  }
};

const getBusIndexOfRoute = async (req, res) => {
  const { id } = req.params;
  try {
    const buses = await prisma.bus.findMany({
      where: {
        routeId: id,
      },
      include: {
        route: true, // Include related route data if needed
        driver: true, // Include related driver data if needed
        busChannel: true,
      },
    });
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching buses" });
  }
};

// Create a new bus
const createBus = async (req, res) => {
  const {
    busName,
    busNumber,
    capacity,
    status,
    driverId,
    routeId,
    busPassengerChannel,
    fieldNumber,
    busLocationChannel,
    latFieldNumber,
    longFieldNumber,
  } = req.body;

  try {
    const parsedCapacity = parseInt(capacity);
    if (isNaN(parsedCapacity)) {
      return res
        .status(400)
        .json({ error: "Capacity must be a valid integer" });
    }

    const newBus = await prisma.bus.create({
      data: {
        busName,
        busNumber,
        capacity: parsedCapacity,
        status,
        ...(driverId && {
          driver: {
            connect: {
              id: driverId,
            },
          },
        }),
        ...(routeId && {
          route: {
            connect: {
              id: routeId,
            },
          },
        }),
        // Creating busLocationChannel entry
        busLocation: {
          create: {
            channelId: busLocationChannel,
            latFieldNumber,
            longFieldNumber,
          },
        },
        busChannel: {
          create: {
            channelId: busPassengerChannel,
            fieldNumber: fieldNumber,
          },
        },
      },
    });
    res.status(201).json(newBus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while creating the bus" });
  }
};

// Get a bus by ID
const getBusById = async (req, res) => {
  const { id } = req.params;

  try {
    const bus = await prisma.bus.findUnique({
      where: { id },
      include: {
        route: true,
        driver: true,
      },
    });

    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }

    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the bus" });
  }
};

const getBusLocChannel = async (req, res) => {
  const { id } = req.params;

  try {
    const bus = await prisma.busLocationChannel.findUnique({
      where: {
        busId: id,
      },
    });

    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }

    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the bus" });
  }
};

const getBusPassChannel = async (req, res) => {
  const { id } = req.params;

  try {
    const bus = await prisma.busChannel.findUnique({
      where: {
        busId: id,
      },
    });

    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }

    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the bus" });
  }
};

// Update a bus
const updateBus = async (req, res) => {
  const {
    id,
    busName,
    busNumber,
    capacity,
    status,
    userId,
    routeId,
    busPassengerChannel,
    fieldNumber,
    busLocationChannel,
    latFieldNumber,
    longFieldNumber,
  } = req.body;

  console.log(req.body);

  try {
    const parsedCapacity = parseInt(capacity);
    if (isNaN(parsedCapacity)) {
      return res
        .status(400)
        .json({ error: "Capacity must be a valid integer" });
    }

    const updatedBus = await prisma.bus.update({
      where: { id },
      data: {
        busName,
        busNumber,
        capacity: parsedCapacity,
        status,
        ...(routeId && {
          route: {
            connect: {
              id: routeId,
            },
          },
        }),
        ...(userId && {
          driver: {
            connect: {
              userId: userId,
            },
          },
        }),
        ...(busPassengerChannel && {
          busChannel: {
            upsert: {
              create: {
                channelId: busPassengerChannel,
                fieldNumber,
              },
              update: {
                channelId: busPassengerChannel,
                fieldNumber,
              },
            },
          },
        }),
        ...(busLocationChannel && {
          busLocation: {
            upsert: {
              create: {
                channelId: busLocationChannel,
                latFieldNumber,
                longFieldNumber,
              },
              update: {
                channelId: busLocationChannel,
                latFieldNumber,
                longFieldNumber,
              },
            },
          },
        }),
      },
    });

    res.status(200).json(updatedBus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the bus" });
  }
};

// Delete a bus
const deleteBus = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.bus.delete({
      where: { id },
    });
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the bus" });
  }
};

//get all location for ESP32
const getAllBusChannels = async (req, res) => {
  const { id } = req.params;

  try {
    const channels = await prisma.bus.findUnique({
      where: {
        id: id,
      },
      include: {
        busChannel: true,
        busLocation: true,
        route: {
          include: {
            routeChannel: true,
            sections: true,
          },
        },
      },
    });
    res.send(channels);
  } catch (error) {}
};

const getBusOfDriver = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const bus = await prisma.bus.findFirst({
      where: {
        driver:{
          userId: id
        },
      },
    });
    res.send(bus);
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
  getBusIndex,
  createBus,
  getBusById,
  updateBus,
  deleteBus,
  getBusIndexOfRoute,
  getBusLocChannel,
  getBusPassChannel,
  getAllBusChannels,
  getBusOfDriver
};
