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

  const getBusLocation = async (req, res) => {
    try {
      const buses = await prisma.bus.findMany({
        include: {
          route: true,
          busLocation: true,
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
                throw new Error(
                  `Failed to fetch latitude data for bus ID ${bus.id}`
                );
              }
              if (!longResponse.ok) {
                throw new Error(
                  `Failed to fetch longitude data for bus ID ${bus.id}`
                );
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
              return {
                ...busData,
                latitude: lastLatValue,
                longitude: lastLongValue,
              }; // Return bus data with lat/long values
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
      res.send(error);
      console.log(error);
    }
  };

  const getBusPassenger = async (req, res) => {
    const {id} = req.params
    try {
      const bus = await prisma.bus.findUnique({
        where:{
          id: id
        },
        include:{
          route: true,
          busChannel: true 
        }
      });
      console.log(id) 

      const fetchBusData = async (bus) => {
        const url = `https://api.thingspeak.com/channels/${bus.busChannel.channelId}/fields/${bus.busChannel.fieldNumber}.json?results=300`; // Construct the URL based on busChannel
      
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to fetch data for bus ID ${bus.id}`);
          }
          const data = await response.json();
          const feed = data.feeds; // Extract the 'feeds' from the response
      
          // Find the last non-null value in the feed for the dynamic field
          let lastNonNullValue = null;
          const fieldName = `field${bus.busChannel.fieldNumber}`; // Construct the dynamic field name
      
          // Iterate over the feed entries in reverse order to find the last non-null value
          for (let i = feed.length - 1; i >= 0; i--) {
            const entry = feed[i];
            const value = entry[fieldName]; // Use dynamic field name
      
            if (value !== null) {
              lastNonNullValue = value; // Update last non-null value
              break; // Exit the loop once the last non-null value is found
            }
          }
      
          // Return bus data with busChannel and the last non-null value
          return { ...bus, passCount: lastNonNullValue }; // Return the bus data along with busChannel and last non-null value
        } catch (error) {
          console.error(`Error fetching data for bus ID ${bus.id}:`, error);
          return { id: bus.id, error: error.message }; // Return error if any
        }
      };
      
      // Example usage:
      const data = await fetchBusData(bus); // Assuming 'bus' is a single bus object
      
  
        res.send(data)

      
    } catch (error) {
      console.log(error)
    }
  }

//SCRIPT
const coordinates = [
  [7.073613468294189, 125.60901226754606],
  [7.074039195325124, 125.60862603165367],
  [7.0744862082851325, 125.60823979576128],
  [7.074975793411408, 125.60787501741848],
  [7.075444091741986, 125.60746732397652],
  [7.07584853082698, 125.60712400318329],
  [7.076338114508343, 125.60675922484046],
  [7.0767638390265635, 125.60641590404722],
  [7.077104418358373, 125.60615841345229],
  [7.0775088559884685, 125.60581509265906],
  [7.077936333365436, 125.60612352551136],
  [7.078244982611398, 125.60646684630458],
  [7.078511059381829, 125.60681016709782],
  [7.078787779060322, 125.60718567421544],
  [7.079043212462426, 125.6074968086843],
  [7.0792560735227985, 125.60775429927924],
  [7.079447648393163, 125.60801178987414],
  [7.0797243675099075, 125.6083443818926],
  [7.079990443427174, 125.60867697391109],
  [7.080320377351463, 125.60907393857826],
  [7.080543880843514, 125.60935288672276],
  [7.080788670258176, 125.60962110609248],
  [7.081012173523302, 125.60988932546219],
  [7.0812143906698815, 125.61014681605712],
  [7.081469822728315, 125.61037212032768],
  [7.081799755594395, 125.61081200009401],
  [7.0819700434329125, 125.61104803313935],
  [7.082140331208569, 125.61130552373429],
  [7.082342547860483, 125.61153082800485],
  [7.0825234784739, 125.61175613227542],
  [7.082683123073831, 125.61198143654597],
  [7.082810838713958, 125.61224965591572],
  [7.08283212465055, 125.61252860406022],
  [7.082299975941142, 125.61258224793417],
  [7.0819700434329125, 125.61260370548375],
  [7.0816507536840865, 125.61264662058291],
  [7.08136339272114, 125.61268953568205],
  [7.081129246618979, 125.61271099323164],
  [7.080958958470002, 125.61273245078121],
  [7.080735455179076, 125.61277536588037],
  [7.080362949453534, 125.6128397385291],
  [7.080054301624508, 125.61287192485347],
  [7.07970308142991, 125.61290411117784],
  [7.079415719253633, 125.61295775505178],
  [7.079160286057769, 125.61300067015091],
  [7.078872923543411, 125.61305431402486],
  [7.078628133112218, 125.61309722912404],
  [7.078393985621746, 125.61310795789882],
  [7.078085336475475, 125.61314014422317],
  [7.077712828610208, 125.61322597442148],
  [7.077393535914929, 125.61326888952064],
  [7.077127458500118, 125.61327961829542],
  [7.07686138093189, 125.61330107584502],
  [7.076680448097873, 125.61332253339458],
  [7.076552730760564, 125.61304358525008],
  [7.07641437027193, 125.61278609465515],
  [7.076286652860985, 125.61257151915939],
  [7.076222794142269, 125.61241058753755],
  [7.07600993168272, 125.61214236816785],
  [7.075754496601716, 125.6118526912485],
  [7.075616135873791, 125.6116595733023],
  [7.075467131966589, 125.61142354025698],
  [7.075413916273795, 125.61119823598641],
  [7.07540327313448, 125.61080127131922],
  [7.075339414293554, 125.61049013685036],
  [7.075243626015587, 125.61022191748063],
  [7.075030763104527, 125.60994296933613],
  [7.07464760961723, 125.60956746221854],
  [7.0743496011295175, 125.60935288672276],
  [7.0739983765934245, 125.6092134126505],
  [7.073583292706358, 125.60905248102868]
];


const sendCoordinates = async (latitude, longitude) => {
  const url = `https://api.thingspeak.com/update?api_key=6RA7HGL30BKCD1CQ&field1=${latitude}&field2=${longitude}`;

  try {
    const response = await fetch(url);
    const data = await response.text();
    console.log(`Sent: lat = ${latitude}, lon = ${longitude} - Response: ${data}`);
  } catch (error) {
    console.error(`Error sending lat = ${latitude}, lon = ${longitude}:`, error);
  }
};

const sendCoordinatesWithDelay = async () => {
  while (true) { // Infinite loop to keep sending coordinates
    for (let i = 0; i < coordinates.length; i++) {
      const [latitude, longitude] = coordinates[i];

      await sendCoordinates(latitude, longitude);

      if (i < coordinates.length - 1) {
        console.log('Waiting for 15 seconds...');
        await new Promise(resolve => setTimeout(resolve, 15000)); // 15 seconds delay
      }
    }
    console.log("Looping back to the first coordinate...");
  }
};

const busDataScript = async () => {
  await sendCoordinatesWithDelay();
  console.log("All coordinates sent to ThingSpeak with a 15-second delay!");
};

  

module.exports = {
 getRouteChannel,
 getRoutePassengers,
 getBusPassCountPerRoute,
 getBusLocation,
 getBusPassenger,
 busDataScript
}