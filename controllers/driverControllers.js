// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// // Get all drivers along with their assigned bus
// const getDriverIndex = async (req, res) => {
//   try {
//     const drivers = await prisma.driver.findMany({
//       include: {
//         bus: true, // Include the associated bus for each driver
//       },
//     });
//     res.status(200).json(drivers);
//   } catch (error) {
//     res.status(500).json({ error: "An error occurred while fetching drivers" });
//   }
// };

// // Create a new driver with an optional bus assignment
// const createDriver = async (req, res) => {
//   const { name, phone, status, busId } = req.body;

//   try {
//     const newDriver = await prisma.driver.create({
//       data: {
//         name,
//         phone,
//         status,
//         busId,
//       },
//     });
//     res.status(201).json(newDriver);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while creating the driver" });
//   }
// };

// // Get a driver by ID along with their assigned bus
// const getDriverById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const driver = await prisma.driver.findUnique({
//       where: { id },
//       include: {
//         bus: true, // Include the associated bus
//       },
//     });

//     if (!driver) {
//       return res.status(404).json({ error: "Driver not found" });
//     }

//     res.status(200).json(driver);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching the driver" });
//   }
// };

// // Update a driver with optional bus assignment
// const updateDriver = async (req, res) => {
//   const { id } = req.params;
//   const { name, phone, status, busId } = req.body;

//   try {
//     const updatedDriver = await prisma.driver.update({
//       where: { id },
//       data: {
//         name,
//         phone,
//         status,
//         busId,
//       },
//     });
//     res.status(200).json(updatedDriver);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while updating the driver" });
//   }
// };

// // Delete a driver
// const deleteDriver = async (req, res) => {
//   const { id } = req.params;

//   try {
//     await prisma.driver.delete({
//       where: { id },
//     });
//     res.status(204).send(); // No content to send back
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "An error occurred while deleting the driver" });
//   }
// };

// module.exports = {
//   getDriverIndex,
//   createDriver,
//   getDriverById,
//   updateDriver,
//   deleteDriver,
// };
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all drivers along with their assigned bus
const getDriverIndex = async (req, res) => {
  try {
    const drivers = await prisma.driver.findMany({
      include: {
        bus: true,
      },
    });
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching drivers" });
  }
};

// Create a new driver with email, role, and optional bus assignment
const createDriver = async (req, res) => {
  const { name, phone, status, email, role, busId } = req.body;

  try {
    // Check if email already exists
    const existingDriver = await prisma.driver.findUnique({
      where: { email },
    });

    if (existingDriver) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const newDriver = await prisma.driver.create({
      data: {
        name,
        phone,
        status,
        email,
        role: role || "driver", // Default role is "driver"
        busId,
      },
    });

    res.status(201).json(newDriver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while creating the driver" });
  }
};

// Get a driver by ID along with their assigned bus
const getDriverById = async (req, res) => {
  const { id } = req.params;

  try {
    const driver = await prisma.driver.findUnique({
      where: { id: Number(id) },
      include: {
        bus: true,
      },
    });

    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the driver" });
  }
};

// Update a driver with optional bus assignment
const updateDriver = async (req, res) => {
  const { id } = req.params;
  const { name, phone, status, email, role, busId } = req.body;

  try {
    const updatedDriver = await prisma.driver.update({
      where: { id: Number(id) },
      data: {
        name,
        phone,
        status,
        email,
        role,
        busId,
      },
    });

    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the driver" });
  }
};

// Delete a driver
const deleteDriver = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.driver.delete({
      where: { id: Number(id) },
    });
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the driver" });
  }
};

module.exports = {
  getDriverIndex,
  createDriver,
  getDriverById,
  updateDriver,
  deleteDriver,
};
