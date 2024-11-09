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
        res.json(newUser);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
  };

  const userIndex = async (req, res) => {
    try {
        const user = await prisma.user.findMany({});
        res.json(user);
    } catch (error) {   
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateRole = async (req, res) => {
    const { id, role } = req.body;
    
    try {
        // Update user role
        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                role
            }
        });

        // If role is "driver", create an associated Driver entry
        if (role === "driver") {
            await prisma.driver.create({
                data: {
                    user: { connect: { id: id } },
                }
            });
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
    updateRole
}