/*
  Warnings:

  - You are about to drop the `RouteCoordinate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `RouteCoordinate` DROP FOREIGN KEY `RouteCoordinate_routeId_fkey`;

-- DropTable
DROP TABLE `RouteCoordinate`;

-- CreateTable
CREATE TABLE `RouteCoordinates` (
    `id` VARCHAR(191) NOT NULL,
    `routeId` VARCHAR(191) NOT NULL,
    `pointOrder` INTEGER NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RouteCoordinates` ADD CONSTRAINT `RouteCoordinates_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `Route`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
