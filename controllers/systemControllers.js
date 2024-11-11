const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getStatChannel = async (req, res) => {
    const { id } = req.params;

    try {
        const stats = await prisma.statisticsChannel.findMany();
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching stats", error });
    }

}

const getSystemSetting = async (req, res) => {
    try {
        const stats = await prisma.systemSetting.findMany();
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching stats", error });
    }

}

module.exports = {
    getStatChannel,
    getSystemSetting
}