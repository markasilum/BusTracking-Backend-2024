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
    const { id } = req.params;
    
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
      
  
      // // Function to get the last non-null value from the 'feeds' array for a specific fieldNumber
      function getLastNonNullFeed(feeds, fieldNumber) {
        const fieldKey = `field${fieldNumber}`; // Dynamically generate the field key (field1, field2, etc.)
        for (let i = feeds.length - 1; i >= 0; i--) {
          if (feeds[i][fieldKey] !== null) {
            return feeds[i][fieldKey]; // Return the last non-null value for the specific field
          }
        }
        return null; // Return null if no non-null value is found
      }
  
      // Generate the URLs
      const urls = generateUrlsByRouteId(busesChannels);
  
      // Fetch data from the URLs and get the total of last non-null values for each fieldNumber
      const fetchDataFromURLs = async (urlsByRoute, busesChannels) => {
        let totalByRoute = {};
      
        // Iterate over each route and its corresponding URLs
        const routePromises = Object.keys(urlsByRoute).map(async (routeId) => {
          const urls = urlsByRoute[routeId];

          // Fetch data for each URL in the current route
          const fetchPromises = urls.map(async (url) => {
            try {
              const response = await fetch(url);
              const data = await response.json();
        
              // Find the matching busChannel for the current URL
              let fieldNumber;

              busesChannels.forEach((channel) => {
                if (channel.id === routeId) { // Check if it's the correct route
                  channel.buses.forEach((bus) => {
                    const currentChannelId = url.split('/')[4]; // Extract channelId from URL

                    if (bus.busChannel && bus.busChannel.channelId === currentChannelId) {
                      fieldNumber = bus.busChannel.fieldNumber; // Correct fieldNumber for this bus

                    }
                  });
                }
              });
              console.log(fieldNumber) 


        
              // Check if 'feeds' exists in the data and get the last non-null feed for the specific fieldNumber
              if (data.feeds && Array.isArray(data.feeds)) {
                const lastNonNullFeed = getLastNonNullFeed(data.feeds, fieldNumber);
                return lastNonNullFeed ? parseInt(lastNonNullFeed, 10) : 0; // Return parsed integer or 0 if null
              } else {
                return 0; // Return 0 if no feeds found
              }
            } catch (error) {
              console.error(`Error fetching data for URL ${url}:`, error);
              return 0; // Return 0 on error
            }
          });
      
          // Wait for all fetch requests to complete for this route
          const results = await Promise.all(fetchPromises);
      
          // Sum the results for this specific route
          const totalForRoute = results.reduce((acc, value) => acc + value, 0);
      
          // Store the total for the current route
          totalByRoute[routeId] = totalForRoute;
        });
      
        // Wait for all route fetches to complete
        await Promise.all(routePromises);
      
        return totalByRoute; // Return the totals grouped by routeId
      };
      
      
      
  
      // // Fetch data for all the generated URLs and calculate the total
      const totalPassengers = await fetchDataFromURLs(urls, busesChannels);

      // const routeChannel = await prisma.routeChannel.findUnique({
      //   where: {
      //     routeId: id,
      //   }, 
      // });  
  
      // Send total to ThingSpeak channel
    // const sendTotalToThingSpeak = async (total) => {
    //   const thingspeakURL = `https://api.thingspeak.com/update?api_key=${routeChannel.apiKey}&field${routeChannel.fieldNumber}=${total}`;
    //   try {
    //     const response = await fetch(thingspeakURL, { method: 'POST' });
    //     if (response.ok) {
    //       console.log(`Total sent to ThingSpeak: ${total}`);
    //     } else {
    //       console.log('Failed to send total to ThingSpeak.');
    //     }
    //   } catch (error) {
    //     console.error('Error while sending data to ThingSpeak:', error);
    //   }
    // };

    // // Send the total to ThingSpeak
    // await sendTotalToThingSpeak(totalPassengers);

    // Send the total as the response
    res.status(200).json({ totalPassengers });
  
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching buses" });
    }
  };
  
  
  

module.exports = {
 getRouteChannel,
 getRoutePassengers
}