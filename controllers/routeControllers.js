const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getRouteIndex = async(req, res) => {
    try {
        const routes = await prisma.route.findMany();
        res.status(200).json(routes);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching buses' });
      }
    
}

//index of coordinates
const getRoutesCoordinates = async(req, res) => {
  try {
      const routes = await prisma.route.findMany({
        include:{
          coordinates: {
            orderBy:{
              pointOrder:"asc"
            },
            select: {
              pointOrder: true,
              latitude: true,
              longitude: true
            },
            
          }
        }
      });
      res.status(200).json(routes);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching buses' });
    }
  
}
module.exports = {
    getRouteIndex,
    getRoutesCoordinates
}