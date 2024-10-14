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

  
  const getRoutePassengers = async (req, res) => {
    try {
      // Fetch busesChannels data from Prisma
      const busesChannels = await prisma.route.findMany({
        include: {
          buses: {
            select:{
              busChannel: true
            }
          },
        },
      });

      const generateUrlsByRouteId = (busesChannels) => {
        let urlsByRouteId = {};
      
        busesChannels.forEach(channel => {
          const routeId = channel.id;  // Use routeId instead of routeName
      
          // Initialize an empty array for the routeId if it doesn't exist
          if (!urlsByRouteId[routeId]) {
            urlsByRouteId[routeId] = [];
          }
      
          // Generate URLs for each bus and push them to the corresponding routeId
          channel.buses.forEach(bus => {
            const { channelId, fieldNumber } = bus.busChannel;
            const url = `https://api.thingspeak.com/channels/${channelId}/fields/${fieldNumber}.json`;
            urlsByRouteId[routeId].push(url);
          });
        });
      
        return urlsByRouteId;
      };
      
      // Generate the URLs
      const urls = generateUrlsByRouteId(busesChannels);

      const fetchUrls = async (urlObject) => {
        const results = {};
      
        for (const [key, urls] of Object.entries(urlObject)) {
          results[key] = [];
      
          if (urls.length > 0) {
            const requests = urls.map(url => 
              fetch(url)
                .then(response => {
                  if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                  }
                  return response.json();
                })
                .catch(err => null) // Handle errors by returning null
            );
      
            const responses = await Promise.all(requests);
            results[key] = responses.filter(response => response !== null); // Filter out failed requests
          }
        }
      
        return results;
      };

      const data = await fetchUrls(urls);

      // Initialize an object to hold the last non-null values for each URL
      const lastNonNullValues = {};

      // Function to extract last non-null values from feeds
      const extractLastNonNullValues = (channels) => {
          return channels.reduce((acc, channel) => {
              const feeds = channel.feeds;
              feeds.forEach(feed => {
                  Object.entries(feed).forEach(([key, value]) => {
                      if (key !== 'created_at' && key !== 'entry_id' && value !== null) {
                          acc[key] = value;  // Update only if value is non-null
                      }
                  });
              });
              return acc;
          }, {});
      };

      // Process each URL in the data object
      for (const [url, channels] of Object.entries(data)) {
          lastNonNullValues[url] = extractLastNonNullValues(channels);
      }

      const summedValues = {};

      // Function to sum numeric values in an object
      const sumValues = (fields) => {
          return Object.values(fields).reduce((sum, value) => {
              const numericValue = parseFloat(value);
              return !isNaN(numericValue) ? sum + numericValue : sum;
          }, 0);
      };

      // Calculate summed values for each URL
      for (const [url, fields] of Object.entries(lastNonNullValues)) {
          const sum = sumValues(fields);
          summedValues[url] = sum > 0 ? [sum] : {};
      }

      const routeChannel = await prisma.routeChannel.findMany({});  
  
      const sendTotalToThingSpeak = async (route, total) => {
        // console.log(route, total)
        const thingspeakURL = `https://api.thingspeak.com/update?api_key=${route.apiKey}&field${route.fieldNumber}=${total}`;
        try {
            const response = await fetch(thingspeakURL, { method: 'GET' });
            if (response.ok) {
                console.log(thingspeakURL);
            } else {
                console.log(`Failed to send total to ThingSpeak for route ${route.routeId}.`);
            }
        } catch (error) {
            console.error(`Error while sending data to ThingSpeak for route ${route.routeId}:`, error);
        }
    };
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // // Iterate through each route and send the total
    for (const route of routeChannel) {
      const total = summedValues[route.routeId] ? summedValues[route.routeId][0] : 0; // Get total for the current route
      await sendTotalToThingSpeak(route, total);
      await delay(15000); // Wait for 15 seconds before the next iteration
    }

    // console.log("sent route passengers")

    // Send the total as the response
    // res.status(200).json( summedValues );
  
    } catch (error) {
      // res.status(500).json({ error: "An error occurred while fetching buses" });
      console.log(error)
    }
  };

  const getBusPassCountPerRoute = async (req, res) =>{
    const {id} = req.params;

    try {

      const buses = await prisma.bus.findMany({
        where:{
          routeId: id
        },
        include: {
          busChannel: true
          },
      });

      // Fetch data from each URL and return the result
    const fetchDataForBuses = async () => {
      const busDataPromises = buses.map(async (bus) => {
          const { busChannel } = bus; // Destructure busChannel from the bus object
          const url = `https://api.thingspeak.com/channels/${busChannel.channelId}/fields/${busChannel.fieldNumber}.json?results=300`; // Construct the URL based on busChannel


      try {
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error(`Failed to fetch data for bus ID ${bus.id}`);
          }
          const data = await response.json();
          const feed = data.feeds;  // Extract the 'feeds' from the response

          // Find the last non-null value in the feed for dynamic field
          let lastNonNullValue = null;
          const fieldName = `field${busChannel.fieldNumber}`;  // Construct the dynamic field name

          // Iterate over the feed entries in reverse order to find the last non-null value
          for (let i = feed.length - 1; i >= 0; i--) {
              const entry = feed[i];
              const value = entry[fieldName]; // Use dynamic field name

              if (value !== null) {
                  lastNonNullValue = value; // Update last non-null value
                  break; // Exit the loop once the last non-null value is found
              }
          }


          // Return bus data without busChannel and include the last non-null value
          const { busChannel: _, ...busData } = bus; // Omit busChannel from bus data
          return { ...busData, passCount: lastNonNullValue };  // Return the bus data along with the last non-null value
          } catch (error) {
              console.error(`Error fetching data for bus ID ${bus.id}:`, error);
              return { id: bus.id, error: error.message };  // Return error if any
          }
      });

      // Wait for all fetch requests to complete and return the result
      const allBusData = await Promise.all(busDataPromises);
      return allBusData;
    };
          const data = await fetchDataForBuses();

      res.send(data)
      // console.log(buses)
      
    } catch (error) {
      res.send(error)
    }

  }

  const getBusLocation = async (req, res) =>{

    try {

      const buses = await prisma.bus.findMany({
        include: {
          route: true,
          busLocation: true
          },
      });

    // Fetch data from each URL and return the result
const fetchDataForBuses = async () => {
  const busDataPromises = buses.map(async (bus) => {
      const { busLocation } = bus; // Destructure busLocation from the bus object

      // Proceed only if busLocation is not null
      if (busLocation) {
          const latUrl = `https://api.thingspeak.com/channels/${busLocation.channelId}/fields/${busLocation.latFieldNumber}.json`; // URL for latitude
          const longUrl = `https://api.thingspeak.com/channels/${busLocation.channelId}/fields/${busLocation.longFieldNumber}.json`; // URL for longitude

          try {
              const [latResponse, longResponse] = await Promise.all([
                  fetch(latUrl),
                  fetch(longUrl),
              ]);

              // Check if responses are okay
              if (!latResponse.ok) {
                  throw new Error(`Failed to fetch latitude data for bus ID ${bus.id}`);
              }
              if (!longResponse.ok) {
                  throw new Error(`Failed to fetch longitude data for bus ID ${bus.id}`);
              }

              const latData = await latResponse.json();
              const longData = await longResponse.json();
              
              const latFeed = latData.feeds;
              const longFeed = longData.feeds;

              // Find the last non-null value for latitude
              let lastLatValue = null;
              for (let i = latFeed.length - 1; i >= 0; i--) {
                  const entry = latFeed[i];
                  const latValue = entry[`field${busLocation.latFieldNumber}`]; // Use dynamic field name

                  if (latValue !== null) {
                      lastLatValue = latValue; // Update last latitude value
                      break; // Exit loop once last non-null value is found
                  }
              }

              // Find the last non-null value for longitude
              let lastLongValue = null;
              for (let i = longFeed.length - 1; i >= 0; i--) {
                  const entry = longFeed[i];
                  const longValue = entry[`field${busLocation.longFieldNumber}`]; // Use dynamic field name

                  if (longValue !== null) {
                      lastLongValue = longValue; // Update last longitude value
                      break; // Exit loop once last non-null value is found
                  }
              }

              // Return bus data without busLocation and include lat/long values
              const { busLocation: _, ...busData } = bus; // Omit busLocation from bus data
              return { ...busData, latitude: lastLatValue, longitude: lastLongValue }; // Return bus data with lat/long values
          } catch (error) {
              console.error(`Error fetching data for bus ID ${bus.id}:`, error);
              return { id: bus.id, error: error.message }; // Return error if any
          }
      } else {
          // If busLocation is null, return bus data with null lat/long
          const { busLocation: _, ...busData } = bus; // Omit busLocation from bus data
          return { ...busData, latitude: null, longitude: null };
      }
  });

  // Wait for all fetch requests to complete and return the result
  const allBusData = await Promise.all(busDataPromises);
  return allBusData;
};

const data = await fetchDataForBuses();
res.send(data);

      
    } catch (error) {
      res.send(error)
      console.log(error)
    }
  }

  
  
  

module.exports = {
 getRouteChannel,
 getRoutePassengers,
 getBusPassCountPerRoute,
 getBusLocation
}