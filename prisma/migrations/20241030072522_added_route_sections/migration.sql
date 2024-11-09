-- CreateTable
CREATE TABLE `RouteSection` (
    `id` VARCHAR(191) NOT NULL,
    `routeId` VARCHAR(191) NOT NULL,
    `sectionName` VARCHAR(191) NOT NULL,
    `channelId` VARCHAR(191) NOT NULL,
    `fieldNumber` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RouteSection` ADD CONSTRAINT `RouteSection_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `Route`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
