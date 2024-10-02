const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getRouteIndex = async(req, res) => {
    try {
        const routes = await prisma.route.findMany({
          orderBy:{
            routeName:"asc"
          },
          include:{
            buses: true
          }
        });
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

//index of coordinates
const getRoute = async(req, res) => {
  const{id} = req.params
  try {
      const routes = await prisma.route.findUnique({
        where:{
          id: id
        },
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

const createRoute = async (req,res) => {
  const { routeName, routeColor, coordinates } = req.body;

  try {
    // Create a new route
    const newRoute = await prisma.route.create({
      data: {
        routeName,
        routeColor,
        coordinates: {
          create: coordinates, // `coordinates` should be an array of objects
        },
      },
    });

    res.status(201).json(newRoute);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the route' });
  }
}

const updateRoute = async (req,res) => {
  const { id, routeName, routeColor, coordinates } = req.body;
  try {
    // Create a new route
    const updateRoute = await prisma.route.update({
      where:{
        id: id
      },
      data: {
        routeName,
        routeColor,
        coordinates: {
          deleteMany:{},
          create: coordinates// `coordinates` should be an array of objects
        },
      },
    });

    res.status(201).json(updateRoute);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the route' });
  }
}


module.exports = {
    getRouteIndex,
    getRoutesCoordinates,
    getRoute,
    createRoute,
    updateRoute
}