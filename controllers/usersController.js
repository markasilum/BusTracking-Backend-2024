const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUser = async (req, res) => {
  const { email } = req.body; // Corrected from req.bodu to req.body
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
};

const createUser = async (req, res) => {
  const { email, name, role } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        role,
      },
    });
    // Automatically create a driver if the role is 'driver'
    if (role === "driver") {
      await prisma.driver.create({
        data: {
          userId: newUser.id, // Set the userId to the new user's ID
          status: "active", // Set the initial status as needed
          bus: null, // Set bus reference if needed, or leave as null
        },
      });
    }
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const userIndex = async (req, res) => {
  try {
    const user = await prisma.user.findMany({
      include: {
        drivers: true, // Include associated drivers for each user
      },
    });
    res.json(user);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateRole = async (req, res) => {
  const { id, role } = req.body;

  try {
    // Update the user's role
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        role,
      },
    });

    // Automatically create a driver if the role is now 'driver'
    if (role === "driver") {
      const existingDriver = await prisma.driver.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (!existingDriver) {
        await prisma.driver.create({
          data: {
            userId: user.id,
            status: "active", // Set the initial status as needed
            bus: null, // Set bus reference if needed, or leave as null
          },
        });
      }
    }

    res.json(user);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getUser,
  createUser,
  userIndex,
  updateRole,
};
