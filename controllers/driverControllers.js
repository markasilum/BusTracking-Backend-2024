const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all drivers along with their assigned bus
const getDriverIndex = async (req, res) => {
  try {
    const drivers = await prisma.user.findMany({
      where:{
        role: "driver"
      },
      include:{
        driver:{
          include:{
            bus:{
              include:{
                route: true
              }
            }
          }
        }
      }
    });
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching drivers" });
  }
};

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
    const driver = await prisma.user.findUnique({
      where: { 
        id: id
       },
       include:{
        driver:{
          include:{
            bus: true
          }
        }
       }
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

const updateDriver = async (req, res) => {
  const { id, busId } = req.body; // User ID and Bus ID from request body
  console.log(req.body);

  try {
    const updatedDriver = await prisma.driver.upsert({
      where: {
        userId: id, // Assuming userId is unique
      },
      update: {
        bus: {
          connect: { id: busId }, // Connect to existing bus
        },
      },
      create: {
        user: {
          connect: { id: id }, // Connect to existing user
        },
        bus: {
          connect: { id: busId }, // Connect to existing bus
        },
      },
    });
    
    res.status(200).json(updatedDriver);
  } catch (error) {
    console.error("Error updating driver:", error.message);
    res.status(500).json({ error: "An error occurred while updating the driver", details: error.message });
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
