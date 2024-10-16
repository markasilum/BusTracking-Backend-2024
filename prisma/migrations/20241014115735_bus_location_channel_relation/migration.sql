/*
  Warnings:

  - A unique constraint covering the columns `[busId]` on the table `BusLocationChannel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `busId` to the `BusLocationChannel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BusLocationChannel` ADD COLUMN `busId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `BusLocationChannel_busId_key` ON `BusLocationChannel`(`busId`);

-- AddForeignKey
ALTER TABLE `BusLocationChannel` ADD CONSTRAINT `BusLocationChannel_busId_fkey` FOREIGN KEY (`busId`) REFERENCES `Bus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
