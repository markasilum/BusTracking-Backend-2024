-- CreateTable
CREATE TABLE `StatisticsChannel` (
    `id` VARCHAR(191) NOT NULL,
    `statName` VARCHAR(191) NOT NULL,
    `apiKey` VARCHAR(191) NULL,
    `channelId` VARCHAR(191) NOT NULL,
    `fieldNumber` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
