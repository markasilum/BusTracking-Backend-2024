const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getRouteChannel = async (req, res) => {
    const { id } = req.params;
    try {
      const buses = await prisma.routeChannel.findUnique({
        where:{
          routeId: id
        },
      });
      res.status(200).json(buses);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching buses" });
    }
  };

module.exports = {
 getRouteChannel
}