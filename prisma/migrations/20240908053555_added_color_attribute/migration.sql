/*
  Warnings:

  - You are about to drop the column `coordinates` on the `Route` table. All the data in the column will be lost.
  - Added the required column `routeColor` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Route` DROP COLUMN `coordinates`,
    ADD COLUMN `routeColor` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `RouteCoordinate` (
    `id` VARCHAR(191) NOT NULL,
    `routeId` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RouteCoordinate` ADD CONSTRAINT `RouteCoordinate_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `Route`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
