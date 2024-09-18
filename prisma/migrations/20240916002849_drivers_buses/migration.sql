/*
  Warnings:

  - You are about to drop the column `driverId` on the `bus` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `bus` DROP FOREIGN KEY `Bus_driverId_fkey`;

-- AlterTable
ALTER TABLE `bus` DROP COLUMN `driverId`;

-- AlterTable
ALTER TABLE `driver` ADD COLUMN `busId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Driver` ADD CONSTRAINT `Driver_busId_fkey` FOREIGN KEY (`busId`) REFERENCES `Bus`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
