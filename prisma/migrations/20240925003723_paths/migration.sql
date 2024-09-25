/*
  Warnings:

  - You are about to drop the column `routeId` on the `RouteCoordinates` table. All the data in the column will be lost.
  - Added the required column `pathId` to the `RouteCoordinates` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `RouteCoordinates` DROP FOREIGN KEY `RouteCoordinates_routeId_fkey`;

-- AlterTable
ALTER TABLE `RouteCoordinates` DROP COLUMN `routeId`,
    ADD COLUMN `pathId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `RoutePath` (
    `id` VARCHAR(191) NOT NULL,
    `routeId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RoutePath` ADD CONSTRAINT `RoutePath_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `Route`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RouteCoordinates` ADD CONSTRAINT `RouteCoordinates_pathId_fkey` FOREIGN KEY (`pathId`) REFERENCES `RoutePath`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
