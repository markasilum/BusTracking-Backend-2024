const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.handleRFIDScan = async (req, res) => {
    const { passengers, busId } = req.body;

    if (!Array.isArray(passengers) || passengers.length === 0) {
        return res.status(400).json({ error: 'No passengers data provided.' });
    }

    try {
        // Check if the busId exists in the Bus table
        const busExists = await prisma.bus.findUnique({
            where: { id: busId },
        });

        if (!busExists) {
            return res.status(400).json({ error: `Bus with id ${busId} does not exist.` });
        }

        for (const rfidUID of passengers) {
            if (typeof rfidUID !== 'string') {
                return res.status(400).json({ error: 'Invalid RFID UID format.' });
            }

            // Check if the passenger with the same RFID already exists
            const existingPassenger = await prisma.passenger.findFirst({
                where: { rfidUID: rfidUID },
            });

            if (existingPassenger) {
                // If the passenger already exists, remove them (sign out)
                await prisma.passenger.delete({
                    where: { id: existingPassenger.id },
                });
                console.log(`Passenger Removed: ${rfidUID}`);
            } else {
                // If the passenger doesn't exist, add them (sign in)
                await prisma.passenger.create({
                    data: { 
                        rfidUID: rfidUID,
                        busId: busId, // Link to bus
                    },
                });
                console.log(`Passenger Added: ${rfidUID}`);
            }
        }

        return res.json({ message: 'Passengers processed successfully.' });
    } catch (error) {
        console.error('Error processing RFID data:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};
