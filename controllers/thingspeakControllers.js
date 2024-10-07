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
      const busesChannels = await prisma.bus.findMany({
        where: {
          routeId: id,
        },
        include: {
          busChannel: true,
        },
      });

      const baseURL = 'https://api.thingspeak.com/channels/';
  
      function generateURLs(busesChannels) {
        return busesChannels.map(bus => {
          const channelId = bus.busChannel.channelId;
          const fieldNumber = bus.busChannel.fieldNumber;
          return `${baseURL}${channelId}/fields/${fieldNumber}.json?results=2`;
        });
      }
  
      // Function to get the last non-null value from the 'feeds' array for a specific fieldNumber
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
      const urls = generateURLs(busesChannels);
  
      // Fetch data from the URLs and get the total of last non-null values for each fieldNumber
      const fetchDataFromURLs = async (urls, busesChannels) => {
        const fetchPromises = urls.map(async (url, index) => {
          try {
            const response = await fetch(url);
            const data = await response.json();
            
            // Get the field number dynamically for the current bus channel
            const fieldNumber = busesChannels[index].busChannel.fieldNumber;
  
            // Check if 'feeds' exists in the data and get the last non-null feed for the specific fieldNumber
            if (data.feeds && Array.isArray(data.feeds)) {
              const lastNonNullFeed = getLastNonNullFeed(data.feeds, fieldNumber);
              return lastNonNullFeed ? parseFloat(lastNonNullFeed) : 0; // Return parsed float or 0 if null
            } else {
              return 0; // Return 0 if no feeds found
            }
          } catch (error) {
            return 0; // Return 0 on error
          }
        });
  
        // Wait for all fetch requests to complete
        const results = await Promise.all(fetchPromises);
  
        // Sum the results
        const total = results.reduce((acc, value) => acc + value, 0);
  
        return total;
      };
  
      // Fetch data for all the generated URLs and calculate the total
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