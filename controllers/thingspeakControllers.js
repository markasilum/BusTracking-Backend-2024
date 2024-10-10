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
            const url = `https://api.thingspeak.com/channels/${channelId}/fields/${fieldNumber}.json?results=10`;
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

    // Iterate through each route and send the total
    for (const route of routeChannel) {
      const total = summedValues[route.routeId] ? summedValues[route.routeId][0] : 0; // Get total for the current route
      await sendTotalToThingSpeak(route, total);
      await delay(15000); // Wait for 15 seconds before the next iteration
    }

    // Send the total as the response
    res.status(200).json( summedValues );
  
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching buses" });
    }
  };
  
  
  

module.exports = {
 getRouteChannel,
 getRoutePassengers
}