const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.handleRFIDScan = async (req, res) => {
    const { rfidUID } = req.body;

    if (typeof rfidUID !== 'string') {
        return res.status(400).json({ error: 'Invalid RFID UID format.' });
    }

    try {
        // Check if the passenger with the same RFID already exists
        const existingPassenger = await prisma.passenger.findFirst({
            where: { rfidUID: rfidUID },
        });

        if (existingPassenger) {
            // If the passenger already exists, remove them
            await prisma.passenger.delete({
                where: { id: existingPassenger.id },
            });
            console.log(`Passenger removed: ${rfidUID}`);
            return res.json({ message: 'Passenger removed.' });
        } else {
            // If the passenger doesn't exist, add them
            await prisma.passenger.create({
                data: { rfidUID: rfidUID },
            });
            console.log(`Passenger added: ${rfidUID}`);
            return res.json({ message: 'Passenger added.' });
        }
    } catch (error) {
        console.error('Error processing RFID data:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};
