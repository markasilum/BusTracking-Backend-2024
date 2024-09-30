/*
  Warnings:

  - A unique constraint covering the columns `[busId]` on the table `BusChannel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[routeId]` on the table `RouteChannel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `busId` to the `BusChannel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fieldNumber` to the `BusChannel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fieldNumber` to the `BusLocationChannel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fieldNumber` to the `RouteChannel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `routeId` to the `RouteChannel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BusChannel` ADD COLUMN `busId` VARCHAR(191) NOT NULL,
    ADD COLUMN `fieldNumber` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `BusLocationChannel` ADD COLUMN `fieldNumber` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `RouteChannel` ADD COLUMN `fieldNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `routeId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `BusChannel_busId_key` ON `BusChannel`(`busId`);

-- CreateIndex
CREATE UNIQUE INDEX `RouteChannel_routeId_key` ON `RouteChannel`(`routeId`);

-- AddForeignKey
ALTER TABLE `RouteChannel` ADD CONSTRAINT `RouteChannel_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `Route`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BusChannel` ADD CONSTRAINT `BusChannel_busId_fkey` FOREIGN KEY (`busId`) REFERENCES `Bus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
