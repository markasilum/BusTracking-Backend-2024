const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getRouteIndex = async(req, res) => {
  console.log("get all routes")
    try {
        const routes = await prisma.route.findMany({
          orderBy:{
            routeName:"asc"
          },
        });
        res.status(200).json(routes);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching routes' });
      }
    
}

//index of coordinates
const getRoutesCoordinates = async(req, res) => {
  try {
      const routes = await prisma.route.findMany({
        include:{
          paths:{
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
          }
        }
      });
      res.status(200).json(routes);
      console.log(routes)
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching buses' });
    }
  
}

const createRoute = async (req,res) => {
  const { routeName, routeColor, paths } = req.body;

  // console.log("Received paths:", JSON.stringify(paths, null, 2));
  try {
    // // Create a new route
    const newRoute = await prisma.route.create({
      data: {
        routeName,
        routeColor,
        paths: {
          create: paths.map((path) => ({
            coordinates: {
              create: path.coordinates.map((coordinate) => ({
                pointOrder: coordinate.pointOrder,
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
              })),
            },
          })),
        },
      },
    });

    res.status(201).json(newRoute);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the route' });
  }
}


module.exports = {
    getRouteIndex,
    getRoutesCoordinates,
    createRoute
}