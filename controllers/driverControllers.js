const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all drivers along with their assigned bus
const getDriverIndex = async (req, res) => {
  try {
    const drivers = await prisma.driver.findMany({
      include: {
        bus: true, // Include the associated bus for each driver
      },
    });
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching drivers" });
  }
};

// Create a new driver with an optional bus assignment
const createDriver = async (req, res) => {
  const { firstName, middleName, lastName, phone, status, bus } = req.body;

  try {
    const newDriver = await prisma.driver.create({
      data: {
        firstName,
        middleName,
        lastName,
        phone,
        status,
        bus,
      },
    });
    res.status(201).json(newDriver);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the driver" });
  }
};

// Get a driver by ID along with their assigned bus
const getDriverById = async (req, res) => {
  const { id } = req.params;

  try {
    const driver = await prisma.driver.findUnique({
      where: { id },
      include: {
        bus: true, // Include the associated bus
      },
    });

    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    res.status(200).json(driver);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the driver" });
  }
};

// Update a driver with optional bus assignment
const updateDriver = async (req, res) => {
  const { id, firstName, middleName, lastName, phone, status, bus } = req.body;
   console.log(req.body)
  try {
    const updatedDriver = await prisma.driver.update({
      where: { id },
      data: {
        firstName,
        middleName,
        lastName,
        phone,
        status,
        bus
      },
    });
    res.status(200).json(updatedDriver);
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ error: "An error occurred while updating the driver", error });
  }
};

// Delete a driver
const deleteDriver = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.driver.delete({
      where: { id },
    });
    res.status(204).send(); // No content to send back
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the driver" });
  }
};

module.exports = {
  getDriverIndex,
  createDriver,
  getDriverById,
  updateDriver,
  deleteDriver,
};
