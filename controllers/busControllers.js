const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getBusIndex = async(req, res) => {
    try {
        const buses = await prisma.bus.findMany();
        res.status(200).json(buses);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching buses' });
      }
    
}
module.exports = {
    getBusIndex
}
